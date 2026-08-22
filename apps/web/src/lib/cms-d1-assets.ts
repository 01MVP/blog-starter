import "@tanstack/react-start/server-only";
import { localizeSeries, localizeTag, type Asset, type SupportedLocale } from "@repo/core";
import * as schema from "@repo/db/schema/cms";
import { desc, eq, or } from "drizzle-orm";

import { listD1Comments } from "./cms-d1-comments";
import { listD1Posts } from "./cms-d1-posts";
import { listD1Series } from "./cms-d1-series";
import { getD1SiteSettings } from "./cms-d1-settings";
import { type AssetInput, drizzleRowToAsset } from "./cms-d1-shared";
import { listD1Tags } from "./cms-d1-tags";
import { getCmsDb } from "./cms-db";

export async function listD1Assets() {
  const db = getCmsDb();
  const rows = await db.select().from(schema.assets).orderBy(desc(schema.assets.createdAt));

  return rows.map(drizzleRowToAsset);
}

export async function getD1AssetById(idOrKey: string) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.assets)
    .where(or(eq(schema.assets.id, idOrKey), eq(schema.assets.key, idOrKey)))
    .limit(1);

  return rows[0] ? drizzleRowToAsset(rows[0]) : undefined;
}

export async function createD1Asset(input: AssetInput) {
  const asset: Asset = {
    id: `asset_${crypto.randomUUID()}`,
    key: input.key,
    url: input.url,
    filename: input.filename,
    contentType: input.contentType,
    sizeBytes: input.sizeBytes,
    attachedPostId: input.attachedPostId ?? null,
    createdAt: new Date().toISOString(),
  };

  const db = getCmsDb();
  await db.insert(schema.assets).values({
    id: asset.id,
    key: asset.key,
    url: asset.url,
    filename: asset.filename,
    contentType: asset.contentType,
    sizeBytes: asset.sizeBytes,
    attachedPostId: asset.attachedPostId,
    createdAt: asset.createdAt,
  });

  return asset;
}

export async function deleteD1Asset(idOrKey: string) {
  const asset = await getD1AssetById(idOrKey);

  if (!asset) {
    return undefined;
  }

  const db = getCmsDb();
  await db.delete(schema.assets).where(eq(schema.assets.id, asset.id));

  return asset;
}

export async function buildD1SiteExport(locale: SupportedLocale) {
  const [persistedPosts, persistedComments, persistedAssets, persistedTags, persistedSeries] =
    await Promise.all([
      listD1Posts({ includeUnpublished: true }),
      listD1Comments(),
      listD1Assets(),
      listD1Tags(),
      listD1Series(),
    ]);

  return {
    exportedAt: new Date().toISOString(),
    locale,
    site: await getD1SiteSettings(locale),
    posts: persistedPosts.map((post) => ({
      ...post,
      comments: persistedComments.filter((comment) => comment.postId === post.id),
    })),
    series: persistedSeries.map((series) => localizeSeries(series, locale)),
    tags: persistedTags.map((tag) => localizeTag(tag, locale)),
    assets: persistedAssets,
    comments: persistedComments,
  };
}
