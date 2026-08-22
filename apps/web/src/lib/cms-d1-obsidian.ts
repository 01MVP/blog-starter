import "@tanstack/react-start/server-only";
import { type Post } from "@repo/core";
import * as schema from "@repo/db/schema/cms";
import { and, eq, inArray, isNull, notInArray } from "drizzle-orm";

import { deleteD1Post, getD1PostByIdOrSlug, updateD1Post, createD1Post } from "./cms-d1-posts";
import { type PostInput, drizzleRowToPostExternalSource } from "./cms-d1-shared";
import { getCmsDb } from "./cms-db";

const obsidianSource = "obsidian_git" as const;

export type ObsidianSyncEntry = {
  path: string;
  hash: string;
  post: PostInput;
};

export type ObsidianSyncResult = {
  created: number;
  updated: number;
  unchanged: number;
  deleted: number;
  posts: Post[];
};

export async function syncD1ObsidianPosts(
  entries: ObsidianSyncEntry[],
  options: { deleteMissing?: boolean } = {},
): Promise<ObsidianSyncResult> {
  const deleteMissing = Boolean(options.deleteMissing) && entries.length > 0;
  const now = new Date().toISOString();
  const db = getCmsDb();
  const existingRows = await db
    .select()
    .from(schema.postSources)
    .where(eq(schema.postSources.source, obsidianSource));
  const existingByPath = new Map(existingRows.map((row) => [row.sourcePath, row]));
  const seenPaths = new Set<string>();
  const posts: Post[] = [];
  let created = 0;
  let updated = 0;
  let unchanged = 0;

  for (const entry of entries) {
    const sourcePath = normalizeSourcePath(entry.path);

    if (!sourcePath || !entry.hash.trim()) {
      continue;
    }

    seenPaths.add(sourcePath);
    const existing = existingByPath.get(sourcePath);
    const postInput = {
      ...entry.post,
      status: entry.post.status ?? "published",
      source: "import" as const,
    };

    if (existing) {
      const shouldUpdate = existing.contentHash !== entry.hash || existing.missingAt !== null;
      let post: Post | undefined = shouldUpdate
        ? await updateD1Post(existing.postId, postInput)
        : await getD1PostByIdOrSlug(existing.postId, true);
      let postId = existing.postId;

      if (!post) {
        post = await createD1Post(postInput);
        postId = post.id;
      }

      await db
        .update(schema.postSources)
        .set({
          postId,
          contentHash: entry.hash,
          lastSeenAt: now,
          missingAt: null,
          updatedAt: now,
        })
        .where(eq(schema.postSources.id, existing.id));

      if (post) {
        posts.push(withSource(post, sourcePath, entry.hash, now, null));
      }

      if (postId !== existing.postId) {
        created += 1;
      } else if (shouldUpdate) {
        updated += 1;
      } else {
        unchanged += 1;
      }

      continue;
    }

    const post = await createD1Post(postInput);

    await db.insert(schema.postSources).values({
      id: `post_source_${crypto.randomUUID()}`,
      postId: post.id,
      source: obsidianSource,
      sourcePath,
      contentHash: entry.hash,
      lastSeenAt: now,
      missingAt: null,
      createdAt: now,
      updatedAt: now,
    });

    posts.push(withSource(post, sourcePath, entry.hash, now, null));
    created += 1;
  }

  const deleted = deleteMissing ? await softDeleteMissingSources(seenPaths, now) : 0;

  return {
    created,
    updated,
    unchanged,
    deleted,
    posts,
  };
}

export async function isObsidianPost(postId: string) {
  const db = getCmsDb();
  const rows = await db
    .select({ id: schema.postSources.id })
    .from(schema.postSources)
    .where(
      and(eq(schema.postSources.postId, postId), eq(schema.postSources.source, obsidianSource)),
    )
    .limit(1);

  return Boolean(rows[0]);
}

async function softDeleteMissingSources(seenPaths: Set<string>, now: string) {
  const db = getCmsDb();
  const missingRows = await db
    .select()
    .from(schema.postSources)
    .where(
      seenPaths.size
        ? and(
            eq(schema.postSources.source, obsidianSource),
            notInArray(schema.postSources.sourcePath, Array.from(seenPaths)),
            isNull(schema.postSources.missingAt),
          )
        : and(eq(schema.postSources.source, obsidianSource), isNull(schema.postSources.missingAt)),
    );

  for (const row of missingRows) {
    await deleteD1Post(row.postId);
  }

  if (missingRows.length) {
    await db
      .update(schema.postSources)
      .set({ missingAt: now, updatedAt: now })
      .where(
        inArray(
          schema.postSources.id,
          missingRows.map((row) => row.id),
        ),
      );
  }

  return missingRows.length;
}

function withSource(
  post: Post,
  path: string,
  hash: string,
  lastSeenAt: string,
  missingAt: string | null,
): Post {
  return {
    ...post,
    externalSource: drizzleRowToPostExternalSource({
      id: "",
      postId: post.id,
      source: obsidianSource,
      sourcePath: path,
      contentHash: hash,
      lastSeenAt,
      missingAt,
      createdAt: lastSeenAt,
      updatedAt: lastSeenAt,
    }),
  };
}

function normalizeSourcePath(path: string) {
  return path
    .replace(/\\/g, "/")
    .replace(/^\.\/+/, "")
    .split("/")
    .filter((part) => part && part !== ".")
    .join("/")
    .trim();
}
