#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const defaultNotesRoot = "content/notes";
const markdownExtensions = new Set([".md", ".mdx"]);
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const ignoredDirectoryNames = new Set([
  ".git",
  ".obsidian",
  "node_modules",
  ".next",
  ".output",
  ".vercel",
  ".wrangler",
  "dist",
]);

export async function main(argv = process.argv.slice(2), env = process.env) {
  const options = parseArgs(argv, env);

  if (options.ifConfigured && (!options.siteUrl || !options.apiToken)) {
    console.log("Obsidian sync skipped: CMS_PUBLIC_SITE_URL and CMS_API_TOKEN are not configured.");
    return;
  }

  if (!options.siteUrl && !options.dryRun) {
    throw new Error("Set CMS_PUBLIC_SITE_URL, VITE_BASE_URL, or pass --site <url>.");
  }

  if (!options.apiToken && !options.dryRun) {
    throw new Error("Set CMS_API_TOKEN or pass --token <token>.");
  }

  const notesRoot = path.resolve(options.cwd, options.notesRoot);
  const rootStat = await stat(notesRoot).catch(() => null);

  if (!rootStat?.isDirectory()) {
    if (options.ifConfigured) {
      console.log(`Obsidian sync skipped: ${options.notesRoot} does not exist.`);
      return;
    }

    throw new Error(`Obsidian notes directory not found: ${options.notesRoot}`);
  }

  const result = await buildObsidianSyncPayload({
    apiToken: options.apiToken,
    dryRun: options.dryRun,
    notesRoot,
    siteUrl: options.siteUrl,
  });

  if (options.dryRun) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          entries: result.entries.map((entry) => ({
            path: entry.path,
            slug: entry.post.slug,
            title: entry.post.title,
            tags: entry.post.tags,
          })),
          scannedFiles: result.scannedFiles,
          skippedFiles: result.skippedFiles,
        },
        null,
        2,
      ),
    );
    return;
  }

  if (!result.scannedFiles) {
    console.log("Obsidian sync skipped: no Markdown or MDX files were found.");
    return;
  }

  if (!result.entries.length) {
    console.log("Obsidian sync skipped: no published Markdown or MDX notes were found.");
    return;
  }

  const response = await fetch(new URL("/api/sync/obsidian", options.siteUrl), {
    method: "POST",
    headers: {
      authorization: `Bearer ${options.apiToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      deleteMissing: options.deleteMissing,
      entries: result.entries,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      `Obsidian sync failed (${response.status}): ${payload.error ?? response.statusText}`,
    );
  }

  console.log(
    JSON.stringify(
      {
        ...payload.data,
        scannedFiles: result.scannedFiles,
        skippedFiles: result.skippedFiles,
      },
      null,
      2,
    ),
  );
}

export function parseArgs(argv, env = process.env) {
  const options = {
    apiToken: env.CMS_API_TOKEN ?? env.BLOG_STARTER_API_TOKEN ?? "",
    cwd: process.cwd(),
    deleteMissing: false,
    dryRun: env.OBSIDIAN_DRY_RUN === "true",
    ifConfigured: false,
    notesRoot: env.OBSIDIAN_NOTES_DIR ?? defaultNotesRoot,
    siteUrl: env.CMS_PUBLIC_SITE_URL ?? env.VITE_BASE_URL ?? env.BLOG_STARTER_URL ?? "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--if-configured") {
      options.ifConfigured = true;
      continue;
    }

    if (arg === "--delete-missing") {
      options.deleteMissing = true;
      continue;
    }

    if (arg === "--keep-missing") {
      options.deleteMissing = false;
      continue;
    }

    if ((arg === "--root" || arg === "--notes-root") && next) {
      options.notesRoot = next;
      index += 1;
      continue;
    }

    if (arg === "--site" && next) {
      options.siteUrl = next;
      index += 1;
      continue;
    }

    if (arg === "--token" && next) {
      options.apiToken = next;
      index += 1;
    }
  }

  options.siteUrl = normalizeSiteUrl(options.siteUrl);

  return options;
}

export async function buildObsidianSyncPayload({ apiToken, dryRun, notesRoot, siteUrl }) {
  const allFiles = await walkFiles(notesRoot);
  const noteFiles = allFiles.filter((file) =>
    markdownExtensions.has(path.extname(file).toLowerCase()),
  );
  const assetFiles = allFiles.filter((file) =>
    imageExtensions.has(path.extname(file).toLowerCase()),
  );
  const assetIndex = createAssetIndex(notesRoot, assetFiles);
  const scannedNotes = await Promise.all(noteFiles.map((file) => readNoteDraft(notesRoot, file)));
  const publishedNotes = scannedNotes.filter((note) => note.publish);
  const noteLinkIndex = createNoteLinkIndex(publishedNotes);
  const uploadCache = new Map();
  const entries = [];

  for (const note of publishedNotes) {
    const resolvedAssets = [];
    const rewrittenMarkdown = await rewriteObsidianMarkdown(note.content, {
      assetIndex,
      dryRun,
      note,
      noteLinkIndex,
      resolvedAssets,
      siteUrl,
      token: apiToken,
      uploadCache,
    });
    const assetHash = resolvedAssets
      .map((asset) => asset.hash)
      .sort((left, right) => left.localeCompare(right))
      .join("\n");
    const contentHash = sha256(`${note.raw}\n${assetHash}`);
    const coverImage =
      metadataString(note.metadata, ["coverImage", "cover_image", "image", "ogImage"]) ??
      firstUploadedImageUrl(rewrittenMarkdown);
    const tags = normalizeTags([
      ...metadataTags(note.metadata),
      ...inlineTags(note.content),
    ]).filter((tag) => tag !== "publish");

    entries.push({
      path: note.relativePath,
      hash: contentHash,
      post: {
        title: note.title,
        slug:
          metadataString(note.metadata, ["slug"]) ??
          slugify(path.basename(note.relativePath, path.extname(note.relativePath))),
        excerpt:
          metadataString(note.metadata, ["excerpt", "description"]) ??
          markdownExcerpt(rewrittenMarkdown),
        coverImage,
        contentMarkdown: rewrittenMarkdown,
        status: "published",
        commentsEnabled:
          metadataBoolean(note.metadata, ["commentsEnabled", "comments_enabled"]) ?? true,
        seoTitle: metadataString(note.metadata, ["seoTitle", "seo_title"]) ?? note.title,
        seoDescription:
          metadataString(note.metadata, ["seoDescription", "seo_description"]) ??
          metadataString(note.metadata, ["excerpt", "description"]) ??
          markdownExcerpt(rewrittenMarkdown),
        tags,
        publishedAt:
          metadataString(note.metadata, ["publishedAt", "published_at", "date"]) ??
          gitFirstCommitDate(note.absolutePath),
      },
    });
  }

  return {
    entries,
    scannedFiles: noteFiles.length,
    skippedFiles: noteFiles.length - publishedNotes.length,
  };
}

export async function readNoteDraft(notesRoot, absolutePath) {
  const raw = await readFile(absolutePath, "utf8");
  const parsed = parseFrontmatter(raw);
  const relativePath = normalizePath(path.relative(notesRoot, absolutePath));
  const title =
    metadataString(parsed.metadata, ["title"]) ??
    firstMarkdownHeading(parsed.content) ??
    titleFromFilename(relativePath);

  return {
    absolutePath,
    content: parsed.content,
    metadata: parsed.metadata,
    notesRoot,
    publish: isPublishedNote(parsed.metadata, parsed.content),
    raw,
    relativePath,
    title,
  };
}

export function parseFrontmatter(markdown) {
  const normalized = markdown.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    return { metadata: {}, content: normalized };
  }

  const end = normalized.indexOf("\n---\n", 4);

  if (end === -1) {
    return { metadata: {}, content: normalized };
  }

  return {
    metadata: parseSimpleYaml(normalized.slice(4, end)),
    content: normalized.slice(end + 5).trimStart(),
  };
}

export function parseSimpleYaml(input) {
  const metadata = {};
  let currentListKey = null;

  for (const rawLine of input.split("\n")) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const listItem = /^-\s+(.+)$/.exec(line);

    if (listItem && currentListKey) {
      metadata[currentListKey] = [
        ...(Array.isArray(metadata[currentListKey]) ? metadata[currentListKey] : []),
        cleanYamlValue(listItem[1]),
      ];
      continue;
    }

    const pair = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);

    if (!pair) {
      currentListKey = null;
      continue;
    }

    const [, key, value] = pair;

    if (!value) {
      metadata[key] = [];
      currentListKey = key;
      continue;
    }

    currentListKey = null;
    metadata[key] = parseYamlValue(value);
  }

  return metadata;
}

export function isPublishedNote(metadata, content = "") {
  const publish = metadataBoolean(metadata, ["publish", "published"]);

  if (publish !== undefined) {
    return publish;
  }

  return normalizeTags([...metadataTags(metadata), ...inlineTags(content)]).includes("publish");
}

export async function rewriteObsidianMarkdown(markdown, context) {
  let output = normalizeCallouts(markdown);

  output = await replaceAsync(output, /!\[\[([^\]]+)]]/g, async (match, target) => {
    const asset = resolveAssetReference(context.note, target, context.assetIndex);

    if (!asset) {
      return match;
    }

    const uploaded = await uploadResolvedAsset(asset, context);
    const alt = obsidianDisplayText(target) || path.basename(asset.path, path.extname(asset.path));
    return `![${alt}](${uploaded.url})`;
  });

  output = await replaceAsync(output, /!\[([^\]]*)]\(([^)]+)\)/g, async (match, alt, href) => {
    const asset = resolveAssetReference(context.note, href, context.assetIndex);

    if (!asset) {
      return match;
    }

    const uploaded = await uploadResolvedAsset(asset, context);
    return `![${alt}](${uploaded.url})`;
  });

  output = output.replace(/\[\[([^\]]+)]]/g, (match, target) => {
    const link = resolveNoteLink(target, context.noteLinkIndex);

    if (!link) {
      return obsidianDisplayText(target) || match;
    }

    return `[${link.label}](/blog/${link.slug})`;
  });

  output = output.replace(/(?<!!)\[([^\]]+)]\(([^)]+\.mdx?)(#[^)]+)?\)/gi, (match, label, href) => {
    const link = resolveNoteLink(href, context.noteLinkIndex);
    return link ? `[${label}](/blog/${link.slug})` : match;
  });

  return output.trim();
}

function normalizeCallouts(markdown) {
  return markdown.replace(/^>\s*\[!([A-Za-z]+)]\s*(.*)$/gm, (_match, kind, title) => {
    const label = title?.trim()
      ? `${title.trim()}`
      : `${kind.slice(0, 1).toUpperCase()}${kind.slice(1).toLowerCase()}`;
    return `> **${label}**`;
  });
}

function resolveAssetReference(note, rawTarget, assetIndex) {
  const target = normalizeLinkTarget(rawTarget);

  if (!target || /^(https?:|data:|#|\/)/i.test(target)) {
    return null;
  }

  const noteDir = path.dirname(note.absolutePath);
  const exactCandidates = [
    path.resolve(noteDir, target),
    path.resolve(note.notesRoot, target),
    path.resolve(path.dirname(note.absolutePath), decodeURIComponent(target)),
  ].map(normalizePath);

  for (const candidate of exactCandidates) {
    const asset = assetIndex.byAbsolutePath.get(candidate);

    if (asset) {
      return asset;
    }
  }

  const filename = path.basename(target).toLowerCase();
  const byFilename = assetIndex.byFilename.get(filename);

  return byFilename?.length === 1 ? byFilename[0] : null;
}

function resolveNoteLink(rawTarget, noteLinkIndex) {
  const target = normalizeLinkTarget(rawTarget);
  const label = obsidianDisplayText(rawTarget) || titleFromFilename(target);
  const lookupKeys = [
    stripExtension(target).toLowerCase(),
    path.basename(stripExtension(target)).toLowerCase(),
  ];

  for (const key of lookupKeys) {
    const slug = noteLinkIndex.get(key);

    if (slug) {
      return { label, slug };
    }
  }

  return null;
}

async function uploadResolvedAsset(asset, context) {
  const cached = context.uploadCache.get(asset.path);

  if (cached) {
    context.resolvedAssets.push({ path: asset.path, hash: cached.hash });
    return cached;
  }

  const bytes = await readFile(asset.path);
  const hash = sha256(bytes);
  const url = context.dryRun
    ? `/uploads/dry-run/${path.basename(asset.path)}`
    : await uploadAsset({
        bytes,
        filename: path.basename(asset.path),
        siteUrl: context.siteUrl,
        token: context.token,
      });
  const uploaded = { hash, url };

  context.uploadCache.set(asset.path, uploaded);
  context.resolvedAssets.push({ path: asset.path, hash });

  return uploaded;
}

async function uploadAsset({ bytes, filename, siteUrl, token }) {
  const response = await fetch(new URL("/api/assets", siteUrl), {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      filename,
      contentType: contentTypeForPath(filename),
      contentBase64: Buffer.from(bytes).toString("base64"),
    }),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Asset upload failed for ${filename}: ${payload.error ?? response.statusText}`);
  }

  return payload.data.url;
}

function createAssetIndex(notesRoot, assetFiles) {
  const byAbsolutePath = new Map();
  const byFilename = new Map();

  for (const file of assetFiles) {
    const asset = {
      path: normalizePath(file),
      relativePath: normalizePath(path.relative(notesRoot, file)),
    };
    const filename = path.basename(file).toLowerCase();
    byAbsolutePath.set(asset.path, asset);
    byFilename.set(filename, [...(byFilename.get(filename) ?? []), asset]);
  }

  return { byAbsolutePath, byFilename };
}

function createNoteLinkIndex(notes) {
  const index = new Map();

  for (const note of notes) {
    const slug =
      metadataString(note.metadata, ["slug"]) ??
      slugify(path.basename(note.relativePath, path.extname(note.relativePath)));
    const keys = [
      stripExtension(note.relativePath).toLowerCase(),
      path.basename(stripExtension(note.relativePath)).toLowerCase(),
      note.title.toLowerCase(),
    ];

    for (const key of keys) {
      if (!index.has(key)) {
        index.set(key, slug);
      }
    }
  }

  return index;
}

async function walkFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoredDirectoryNames.has(entry.name) || entry.name.startsWith(".")) {
      continue;
    }

    const absolutePath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkFiles(absolutePath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

function metadataString(metadata, keys) {
  for (const key of keys) {
    const value = metadata[key];

    if (Array.isArray(value)) {
      const first = value.find((item) => String(item).trim());
      return first ? String(first).trim() : undefined;
    }

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    if (typeof value === "boolean") {
      return String(value);
    }
  }

  return undefined;
}

function metadataBoolean(metadata, keys) {
  for (const key of keys) {
    const value = metadata[key];

    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "string" && /^(true|false)$/i.test(value)) {
      return value.toLowerCase() === "true";
    }
  }

  return undefined;
}

function metadataTags(metadata) {
  const value = metadata.tags ?? metadata.tag;

  if (Array.isArray(value)) {
    return value.map((tag) => String(tag));
  }

  if (typeof value === "string") {
    return value.split(/[, ]+/);
  }

  return [];
}

function inlineTags(content) {
  const tags = [];
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const pattern = /(^|\s)#([\p{L}\p{N}_/-]+)/gu;
  let match;

  while ((match = pattern.exec(withoutCode))) {
    tags.push(match[2]);
  }

  return tags;
}

function normalizeTags(tags) {
  return Array.from(
    new Set(
      tags
        .map((tag) => tag.replace(/^#/, "").trim())
        .filter(Boolean)
        .map((tag) => tag.toLowerCase()),
    ),
  );
}

function parseYamlValue(value) {
  const trimmed = value.trim();

  if (/^(true|false)$/i.test(trimmed)) {
    return trimmed.toLowerCase() === "true";
  }

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => cleanYamlValue(item))
      .filter(Boolean);
  }

  return cleanYamlValue(trimmed);
}

function cleanYamlValue(value) {
  return value.trim().replace(/^["']|["']$/g, "");
}

function normalizeLinkTarget(rawTarget) {
  return rawTarget.split("|")[0].split("#")[0].trim().replace(/^<|>$/g, "");
}

function obsidianDisplayText(rawTarget) {
  const [, display] = rawTarget.split("|");
  return display?.trim();
}

function firstMarkdownHeading(markdown) {
  return markdown
    .split("\n")
    .find((line) => line.startsWith("# "))
    ?.replace(/^#\s+/, "")
    .trim();
}

function titleFromFilename(filename) {
  return (
    path.basename(filename, path.extname(filename)).replace(/[-_]+/g, " ").trim() || "Imported post"
  );
}

function markdownExcerpt(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

function firstUploadedImageUrl(markdown) {
  return /!\[[^\]]*]\((\/uploads\/[^)]+)\)/.exec(markdown)?.[1];
}

function stripExtension(value) {
  return normalizePath(value).replace(/\.[^.]+$/, "");
}

function slugify(value) {
  const slug = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "untitled-post";
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function gitFirstCommitDate(filePath) {
  try {
    const gitPath = normalizePath(path.relative(process.cwd(), filePath));
    const output = execFileSync("git", ["log", "--follow", "--format=%aI", "--", gitPath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .trim()
      .split("\n")
      .filter(Boolean);

    return output.at(-1);
  } catch {
    return undefined;
  }
}

function normalizeSiteUrl(value) {
  if (!value) {
    return "";
  }

  return value.endsWith("/") ? value : `${value}/`;
}

function normalizePath(value) {
  return value.replace(/\\/g, "/");
}

function contentTypeForPath(filename) {
  const extension = path.extname(filename).toLowerCase();

  if (extension === ".avif") return "image/avif";
  if (extension === ".gif") return "image/gif";
  if (extension === ".jpeg" || extension === ".jpg") return "image/jpeg";
  if (extension === ".png") return "image/png";
  if (extension === ".svg") return "image/svg+xml";
  if (extension === ".webp") return "image/webp";

  return "application/octet-stream";
}

async function replaceAsync(value, pattern, replacer) {
  const matches = [];

  value.replace(pattern, (...args) => {
    matches.push(args);
    return "";
  });

  const replacements = await Promise.all(matches.map((args) => replacer(...args)));
  let index = 0;

  return value.replace(pattern, () => replacements[index++]);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
