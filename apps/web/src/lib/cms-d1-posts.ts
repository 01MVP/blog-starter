import "@tanstack/react-start/server-only";
import {
  htmlToText,
  markdownToText,
  renderMarkdownToHtml,
  sanitizeHtml,
  type Post,
  type Tag,
  normalizeDateInput,
  slugify,
} from "@repo/core";
import * as schema from "@repo/db/schema/cms";
import { eq, and, or, like, desc, asc, inArray, sql } from "drizzle-orm";

import { cachedGet, invalidateCache } from "./cms-cache";
import { hasSeriesInput, resolveD1SeriesId } from "./cms-d1-series";
import { getD1SiteSettings } from "./cms-d1-settings";
import {
  MAX_EXCERPT_LENGTH,
  MAX_SEO_DESCRIPTION_LENGTH,
  type PostInput,
  type ListPostsOptions,
  drizzleRowToPost,
  drizzleRowToPostExternalSource,
  drizzleRowToSeries,
  postVisibilityFilter,
} from "./cms-d1-shared";
import { replaceD1PostTags } from "./cms-d1-tags";
import { getCmsDb } from "./cms-db";

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function listD1Posts({
  featured,
  includeUnpublished = false,
  limit,
  offset,
  query = "",
  seriesSlug,
  tagSlug,
}: ListPostsOptions = {}) {
  const normalizedLimit = normalizeListLimit(limit);
  const normalizedOffset = normalizeListOffset(offset);

  // Cache the common case: published posts, no search query
  if (
    !includeUnpublished &&
    featured === undefined &&
    !query &&
    !seriesSlug &&
    !tagSlug &&
    normalizedLimit === undefined &&
    normalizedOffset === 0
  ) {
    return cachedGet("posts:published", () =>
      listD1PostsFromDb({ includeUnpublished: false, query: "" }),
    );
  }

  return listD1PostsFromDb({
    includeUnpublished,
    featured,
    limit: normalizedLimit,
    offset: normalizedOffset,
    query,
    seriesSlug,
    tagSlug,
  });
}

export async function countD1Posts({
  featured,
  includeUnpublished = false,
  query = "",
  seriesSlug,
  tagSlug,
}: ListPostsOptions = {}) {
  const db = getCmsDb();
  const conditions = await buildD1PostConditions({
    includeUnpublished,
    featured,
    query,
    seriesSlug,
    tagSlug,
  });

  if (!conditions) {
    return 0;
  }

  const [row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.posts)
    .where(and(...conditions));

  return Number(row?.count ?? 0);
}

async function listD1PostsFromDb({
  featured,
  includeUnpublished = false,
  limit,
  offset,
  query = "",
  seriesSlug,
  tagSlug,
}: ListPostsOptions = {}) {
  const db = getCmsDb();
  const normalizedLimit = normalizeListLimit(limit);
  const normalizedOffset = normalizeListOffset(offset);
  const conditions = await buildD1PostConditions({
    includeUnpublished,
    featured,
    query,
    seriesSlug,
    tagSlug,
  });

  if (!conditions) {
    return [];
  }

  const queryRows = () =>
    db
      .select()
      .from(schema.posts)
      .where(and(...conditions))
      .orderBy(
        desc(schema.posts.pinned),
        desc(schema.posts.publishedAt),
        desc(schema.posts.updatedAt),
      );
  const rows =
    normalizedLimit === undefined
      ? await queryRows()
      : await queryRows().limit(normalizedLimit).offset(normalizedOffset);

  const currentSettings = await getD1SiteSettings();

  return attachD1Relations(rows, currentSettings);
}

async function buildD1PostConditions({
  featured,
  includeUnpublished = false,
  query = "",
  seriesSlug,
  tagSlug,
}: ListPostsOptions = {}) {
  const db = getCmsDb();
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedSeriesSlug = seriesSlug?.trim();
  const normalizedTagSlug = tagSlug?.trim();
  const conditions = [postVisibilityFilter(includeUnpublished)];

  if (featured !== undefined) {
    conditions.push(eq(schema.posts.featured, featured));
  }

  if (normalizedQuery) {
    const pattern = `%${normalizedQuery}%`;
    conditions.push(
      or(
        like(sql`lower(${schema.posts.title})`, pattern),
        like(sql`lower(${schema.posts.excerpt})`, pattern),
        like(sql`lower(${schema.posts.contentText})`, pattern),
        like(sql`lower(${schema.posts.slug})`, pattern),
      )!,
    );
  }

  if (normalizedSeriesSlug) {
    const [series] = await db
      .select({ id: schema.series.id })
      .from(schema.series)
      .where(eq(schema.series.slug, normalizedSeriesSlug))
      .limit(1);

    if (!series) {
      return null;
    }

    conditions.push(eq(schema.posts.seriesId, series.id));
  }

  if (normalizedTagSlug) {
    const [tag] = await db
      .select({ id: schema.tags.id })
      .from(schema.tags)
      .where(eq(schema.tags.slug, normalizedTagSlug))
      .limit(1);

    if (!tag) {
      return null;
    }

    const postTagRows = await db
      .select({ postId: schema.postTags.postId })
      .from(schema.postTags)
      .where(eq(schema.postTags.tagId, tag.id));
    const postIds = postTagRows.map((row) => row.postId);

    if (!postIds.length) {
      return null;
    }

    conditions.push(inArray(schema.posts.id, postIds));
  }

  return conditions;
}

function normalizeListLimit(limit: number | undefined) {
  if (!Number.isFinite(limit) || limit === undefined) {
    return undefined;
  }

  return Math.min(Math.max(1, Math.floor(limit)), 100);
}

function normalizeListOffset(offset: number | undefined) {
  if (!Number.isFinite(offset) || offset === undefined) {
    return 0;
  }

  return Math.max(0, Math.floor(offset));
}

export async function getD1PostBySlug(slug: string, includeUnpublished = false) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.posts)
    .where(and(eq(schema.posts.slug, slug), postVisibilityFilter(includeUnpublished)))
    .limit(1);

  const row = rows[0];

  if (!row) {
    return undefined;
  }

  const [post] = await attachD1Relations([row], await getD1SiteSettings());

  return post;
}

export async function getD1PostByIdOrSlug(idOrSlug: string, includeUnpublished = true) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.posts)
    .where(
      and(
        or(eq(schema.posts.id, idOrSlug), eq(schema.posts.slug, idOrSlug)),
        postVisibilityFilter(includeUnpublished),
      ),
    )
    .limit(1);

  const row = rows[0];

  if (!row) {
    return undefined;
  }

  const [post] = await attachD1Relations([row], await getD1SiteSettings());

  return post;
}

export async function createD1Post(input: PostInput) {
  const currentSettings = await getD1SiteSettings();
  const title = input.title?.trim() || "Untitled post";
  const slug = await uniqueD1Slug(input.slug?.trim() || slugify(title));
  const now = new Date().toISOString();
  const contentMarkdown = input.contentMarkdown?.trim() || `# ${title}\n`;
  const contentHtml = input.contentHtml
    ? sanitizeHtml(input.contentHtml)
    : renderMarkdownToHtml(contentMarkdown);
  const contentText = input.contentHtml ? htmlToText(contentHtml) : markdownToText(contentMarkdown);
  const status = input.status ?? "draft";
  const source = input.source ?? "api";
  const publishedAt = normalizeDateInput(input.publishedAt) ?? now;
  const coverImage = input.coverImage?.trim() ?? "";
  const seriesId = (await resolveD1SeriesId(input)) ?? null;
  const post: Post = {
    id: `post_${crypto.randomUUID()}`,
    title,
    slug,
    excerpt: input.excerpt?.trim() || contentText.slice(0, MAX_EXCERPT_LENGTH),
    coverImage,
    contentMarkdown,
    contentHtml,
    contentText,
    status,
    source,
    featured: input.featured ?? false,
    pinned: input.pinned ?? false,
    commentsEnabled: input.commentsEnabled ?? true,
    publishedAt,
    updatedAt: now,
    authorName: currentSettings.authorName,
    series: null,
    tags: [],
    seoTitle: input.seoTitle?.trim() || title,
    seoDescription:
      input.seoDescription?.trim() ||
      input.excerpt?.trim() ||
      contentText.slice(0, MAX_SEO_DESCRIPTION_LENGTH),
    i18n: input.i18n,
  };

  if (input.locale === "zh") {
    post.i18n = {
      ...post.i18n,
      title: { ...post.i18n?.title, zh: title },
      excerpt: { ...post.i18n?.excerpt, zh: post.excerpt },
      contentMarkdown: { ...post.i18n?.contentMarkdown, zh: post.contentMarkdown },
      contentHtml: { ...post.i18n?.contentHtml, zh: post.contentHtml },
      contentText: { ...post.i18n?.contentText, zh: post.contentText },
      seoTitle: { ...post.i18n?.seoTitle, zh: post.seoTitle },
      seoDescription: { ...post.i18n?.seoDescription, zh: post.seoDescription },
    };
  }

  const db = getCmsDb();
  await db.insert(schema.posts).values({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: coverImage,
    contentMarkdown: post.contentMarkdown,
    contentHtml: post.contentHtml,
    contentText: post.contentText,
    status: post.status,
    source: post.source,
    featured: post.featured,
    pinned: post.pinned,
    commentsEnabled: post.commentsEnabled,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    i18n: post.i18n ?? null,
    publishedAt,
    createdAt: now,
    updatedAt: post.updatedAt,
    seriesId,
  });

  await replaceD1PostTags(post.id, input.tags ?? [], input.locale);
  await invalidateCache("posts:published", "tags:all", "sitemap:paths");

  return (await getD1PostByIdOrSlug(post.id)) ?? post;
}

export async function updateD1Post(idOrSlug: string, input: PostInput) {
  const post = await getD1PostByIdOrSlug(idOrSlug);

  if (!post) {
    return undefined;
  }

  const localizedUpdate = input.locale === "zh";
  const inputTitle = input.title?.trim();
  const inputExcerpt = input.excerpt?.trim();
  const inputMarkdown = input.contentMarkdown?.trim();
  const inputHtml = input.contentHtml !== undefined ? sanitizeHtml(input.contentHtml) : undefined;
  const title = localizedUpdate ? post.title : inputTitle || post.title;
  const contentMarkdown = localizedUpdate
    ? post.contentMarkdown
    : (inputMarkdown ?? post.contentMarkdown);
  const contentHtml = localizedUpdate
    ? post.contentHtml
    : inputHtml !== undefined
      ? inputHtml
      : inputMarkdown !== undefined
        ? renderMarkdownToHtml(contentMarkdown)
        : post.contentHtml;
  const contentText = localizedUpdate
    ? post.contentText
    : inputHtml !== undefined
      ? htmlToText(contentHtml)
      : inputMarkdown !== undefined
        ? markdownToText(contentMarkdown)
        : post.contentText;
  const status = input.status ?? post.status;
  const slug =
    !localizedUpdate && input.slug !== undefined
      ? await uniqueD1Slug(slugify(input.slug.trim()), post.id)
      : post.slug;
  const now = new Date().toISOString();
  const inputPublishedAt =
    input.publishedAt !== undefined ? normalizeDateInput(input.publishedAt) : undefined;
  const publishedAt =
    inputPublishedAt ??
    (status === "published" && post.status !== "published" ? now : post.publishedAt);
  const i18n = buildPostI18n(post, input, {
    contentHtml: inputHtml,
    contentMarkdown: inputMarkdown,
    excerpt: inputExcerpt,
    title: inputTitle,
  });
  const excerpt = localizedUpdate
    ? post.excerpt
    : inputExcerpt !== undefined
      ? inputExcerpt
      : post.excerpt;
  const seoTitle = localizedUpdate ? post.seoTitle : input.seoTitle?.trim() || title;
  const seoDescription = localizedUpdate
    ? post.seoDescription
    : input.seoDescription !== undefined
      ? input.seoDescription.trim()
      : input.excerpt !== undefined
        ? excerpt
        : post.seoDescription;
  const commentsEnabled = input.commentsEnabled ?? post.commentsEnabled;
  const featured = input.featured ?? post.featured;
  const pinned = input.pinned ?? post.pinned;
  const nextSeriesId = await resolveD1SeriesId(input);

  const db = getCmsDb();
  await db
    .update(schema.posts)
    .set({
      title,
      slug,
      excerpt,
      coverImage: input.coverImage !== undefined ? input.coverImage.trim() : post.coverImage,
      contentMarkdown,
      contentHtml,
      contentText,
      status,
      featured,
      pinned,
      commentsEnabled,
      seoTitle,
      seoDescription,
      i18n: i18n ?? null,
      publishedAt,
      updatedAt: now,
      ...(hasSeriesInput(input) ? { seriesId: nextSeriesId ?? null } : {}),
    })
    .where(eq(schema.posts.id, post.id));

  if (input.tags !== undefined) {
    await replaceD1PostTags(post.id, input.tags, input.locale);
  }

  await invalidateCache("posts:published", "tags:all", "sitemap:paths");

  return getD1PostByIdOrSlug(post.id);
}

function buildPostI18n(
  post: Post,
  input: PostInput,
  normalized: {
    contentHtml?: string;
    contentMarkdown?: string;
    excerpt?: string;
    title?: string;
  },
) {
  if (input.i18n) {
    return input.i18n;
  }

  if (input.locale !== "zh") {
    return post.i18n ?? null;
  }

  const next = { ...post.i18n };
  const setZh = <TField extends keyof NonNullable<Post["i18n"]>>(field: TField, value?: string) => {
    if (value === undefined) {
      return;
    }

    next[field] = {
      ...next[field],
      zh: value,
    };
  };

  const localizedHtml =
    normalized.contentHtml ??
    (normalized.contentMarkdown !== undefined
      ? renderMarkdownToHtml(normalized.contentMarkdown)
      : undefined);
  const localizedText =
    normalized.contentHtml !== undefined
      ? htmlToText(normalized.contentHtml)
      : normalized.contentMarkdown !== undefined
        ? markdownToText(normalized.contentMarkdown)
        : undefined;

  setZh("title", normalized.title);
  setZh("excerpt", normalized.excerpt);
  setZh("contentMarkdown", normalized.contentMarkdown);
  setZh("contentHtml", localizedHtml);
  setZh("contentText", localizedText);
  setZh("seoTitle", input.seoTitle?.trim() || normalized.title);
  setZh("seoDescription", input.seoDescription?.trim() || normalized.excerpt || localizedText);

  return next;
}

export async function deleteD1Post(idOrSlug: string) {
  const post = await getD1PostByIdOrSlug(idOrSlug);

  if (!post) {
    return undefined;
  }

  const now = new Date().toISOString();
  const db = getCmsDb();

  const deletedSlug = await uniqueD1Slug(`${post.slug}-deleted`, post.id);

  await db
    .update(schema.posts)
    .set({ slug: deletedSlug, status: "deleted", updatedAt: now })
    .where(eq(schema.posts.id, post.id));

  await invalidateCache("posts:published", "sitemap:paths");

  return {
    ...post,
    slug: deletedSlug,
    status: "deleted" as const,
    updatedAt: now,
  };
}

// ---------------------------------------------------------------------------
// Relation attachment (private helper for posts)
// ---------------------------------------------------------------------------

async function attachD1Relations(
  rows: Array<typeof schema.posts.$inferSelect>,
  currentSettings: Awaited<ReturnType<typeof getD1SiteSettings>>,
) {
  if (!rows.length) {
    return [];
  }

  const db = getCmsDb();
  const posts = rows.map((row) => drizzleRowToPost(row, currentSettings));
  const postIds = posts.map((post) => post.id);
  const seriesIds = Array.from(
    new Set(rows.map((row) => row.seriesId).filter((id): id is string => Boolean(id))),
  );
  const [tagRows, seriesRows, sourceRows] = await Promise.all([
    db
      .select({
        tagId: schema.tags.id,
        tagName: schema.tags.name,
        tagSlug: schema.tags.slug,
        tagDescription: schema.tags.description,
        tagI18n: schema.tags.i18n,
        postId: schema.postTags.postId,
      })
      .from(schema.tags)
      .innerJoin(schema.postTags, eq(schema.postTags.tagId, schema.tags.id))
      .where(inArray(schema.postTags.postId, postIds))
      .orderBy(asc(schema.tags.name)),
    seriesIds.length
      ? db.select().from(schema.series).where(inArray(schema.series.id, seriesIds))
      : Promise.resolve([]),
    db.select().from(schema.postSources).where(inArray(schema.postSources.postId, postIds)),
  ]);

  const seriesById = new Map(seriesRows.map((row) => [row.id, drizzleRowToSeries(row)]));
  const sourcesByPostId = new Map(
    sourceRows.map((row) => [row.postId, drizzleRowToPostExternalSource(row)]),
  );
  const tagsByPostId = new Map<string, Tag[]>();

  for (const row of tagRows) {
    const tag: Tag = {
      id: row.tagId,
      name: row.tagName,
      slug: row.tagSlug,
      description: row.tagDescription,
      i18n: row.tagI18n as Tag["i18n"],
    };
    const current = tagsByPostId.get(row.postId) ?? [];
    current.push(tag);
    tagsByPostId.set(row.postId, current);
  }

  return posts.map((post, index) => ({
    ...post,
    externalSource: sourcesByPostId.get(post.id) ?? null,
    series: rows[index].seriesId ? (seriesById.get(rows[index].seriesId) ?? null) : null,
    tags: tagsByPostId.get(post.id) ?? [],
  }));
}

// ---------------------------------------------------------------------------
// Slug uniqueness
// ---------------------------------------------------------------------------

async function uniqueD1Slug(base: string, currentPostId?: string) {
  const normalized = base || "untitled-post";
  let candidate = normalized;
  let index = 2;
  const db = getCmsDb();

  while (true) {
    const rows = await db
      .select({ id: schema.posts.id })
      .from(schema.posts)
      .where(eq(schema.posts.slug, candidate))
      .limit(1);
    const existing = rows[0];

    if (!existing || existing.id === currentPostId) {
      return candidate;
    }

    candidate = `${normalized}-${index}`;
    index += 1;
  }
}
