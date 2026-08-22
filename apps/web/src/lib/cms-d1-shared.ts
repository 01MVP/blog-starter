import {
  normalizeCommentBlockedKeywords,
  normalizeLayoutPreset,
  normalizeThemePreset,
  siteSettings,
  type ApiToken,
  type ApiTokenScope,
  type Asset,
  type Comment,
  type CommentAiModerationDecision,
  type CommentAiModerationStatus,
  type CommentStatus,
  type ContentStatus,
  type Post,
  type Series,
  type SiteSettings,
  type SupportedLocale,
  type Tag,
} from "@repo/core";
import * as schema from "@repo/db/schema/cms";
import { and, eq, ne, or, sql } from "drizzle-orm";

import { getPublicSiteUrl } from "./runtime-config";

// ---------------------------------------------------------------------------
// Content limits
// ---------------------------------------------------------------------------

export const MAX_EXCERPT_LENGTH = 180;
export const MAX_SEO_DESCRIPTION_LENGTH = 160;
export const MIN_COMMENT_LENGTH = 2;
export const MAX_COMMENT_LENGTH = 4000;
export const MAX_COMMENT_LINKS = 3;

// ---------------------------------------------------------------------------
// Input / option types
// ---------------------------------------------------------------------------

export type PostInput = Partial<{
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  contentMarkdown: string;
  contentHtml: string;
  status: ContentStatus;
  source: Post["source"];
  featured: boolean;
  pinned: boolean;
  commentsEnabled: boolean;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  seriesId: string | null;
  seriesSlug: string | null;
  seriesName: string | null;
  publishedAt: string;
  locale: SupportedLocale;
  i18n: Post["i18n"];
}>;

export type CommentInput = {
  postSlug: string;
  parentId?: string | null;
  authorUserId?: string | null;
  authorName?: string;
  authorEmail?: string;
  authorWebsite?: string | null;
  body?: string;
  locale?: SupportedLocale;
};

export type ListPostsOptions = {
  featured?: boolean;
  includeUnpublished?: boolean;
  limit?: number;
  offset?: number;
  query?: string;
  seriesSlug?: string;
  tagSlug?: string;
};

export type AssetInput = {
  key: string;
  url: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  attachedPostId?: string | null;
};

export type SiteSettingsInput = Partial<
  Pick<
    SiteSettings,
    | "name"
    | "description"
    | "url"
    | "authorName"
    | "authorBio"
    | "avatarUrl"
    | "defaultOgImage"
    | "socialLinks"
    | "navigation"
    | "rssEnabled"
    | "commentsEnabled"
    | "commentsRequireApproval"
    | "commentAutoBlockEnabled"
    | "commentBlockedKeywords"
    | "aiCommentModerationEnabled"
    | "aiCommentModerationRules"
    | "emailVerificationEnabled"
    | "emailNotificationsEnabled"
    | "manualEmailBroadcastsEnabled"
    | "indexingEnabled"
    | "themePreset"
    | "layoutPreset"
    | "primaryLanguage"
    | "i18n"
  >
> & {
  theme?: string;
};

export type D1Result<TValue> = { data: TValue } | { error: string };

// ---------------------------------------------------------------------------
// Helpers to convert Drizzle rows to app types
// ---------------------------------------------------------------------------

export function drizzleRowToPost(
  row: typeof schema.posts.$inferSelect,
  currentSettings: SiteSettings = runtimeDefaultSiteSettings(),
): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    coverImage: row.coverImage ?? "",
    contentMarkdown: row.contentMarkdown,
    contentHtml: row.contentHtml,
    contentText: row.contentText,
    status: row.status as ContentStatus,
    source: row.source as Post["source"],
    featured: row.featured,
    pinned: row.pinned,
    commentsEnabled: row.commentsEnabled,
    publishedAt: row.publishedAt ?? row.createdAt,
    updatedAt: row.updatedAt,
    authorName: currentSettings.authorName,
    series: null,
    tags: [],
    externalSource: null,
    seoTitle: row.seoTitle ?? row.title,
    seoDescription: row.seoDescription ?? row.excerpt,
    i18n: row.i18n as Post["i18n"],
  };
}

export function drizzleRowToPostExternalSource(
  row: typeof schema.postSources.$inferSelect,
): NonNullable<Post["externalSource"]> {
  return {
    kind: row.source,
    path: row.sourcePath,
    hash: row.contentHash,
    lastSeenAt: row.lastSeenAt,
    missingAt: row.missingAt,
  };
}

export function drizzleRowToSeries(row: typeof schema.series.$inferSelect): Series {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    sortOrder: row.sortOrder,
    i18n: row.i18n as Series["i18n"],
  };
}

export function drizzleRowToTag(row: typeof schema.tags.$inferSelect): Tag {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    i18n: row.i18n as Tag["i18n"],
  };
}

export function drizzleRowToComment(row: typeof schema.comments.$inferSelect): Comment {
  return {
    id: row.id,
    postId: row.postId,
    parentId: row.parentId,
    authorUserId: row.authorUserId,
    authorName: row.authorName,
    authorEmailHash: row.authorEmailHash,
    authorWebsite: row.authorWebsite,
    body: row.body,
    status: row.status as CommentStatus,
    aiModeration: {
      status: normalizeAiModerationStatus(row.aiModerationStatus),
      decision: normalizeAiModerationDecision(row.aiModerationDecision),
      reason: row.aiModerationReason,
      error: row.aiModerationError,
      reviewedAt: row.aiModerationReviewedAt,
    },
    createdAt: row.createdAt,
    i18n: row.i18n as Comment["i18n"],
  };
}

function normalizeAiModerationStatus(value: unknown): CommentAiModerationStatus {
  return value === "pending" || value === "completed" || value === "failed"
    ? value
    : "not_requested";
}

function normalizeAiModerationDecision(value: unknown): CommentAiModerationDecision | null {
  return value === "approve" || value === "review" || value === "spam" ? value : null;
}

export function drizzleRowToAsset(row: typeof schema.assets.$inferSelect): Asset {
  return {
    id: row.id,
    key: row.key,
    url: row.url,
    filename: row.filename,
    contentType: row.contentType,
    sizeBytes: row.sizeBytes,
    attachedPostId: row.attachedPostId,
    createdAt: row.createdAt,
  };
}

export function drizzleRowToApiToken(row: typeof schema.apiTokens.$inferSelect): ApiToken {
  return {
    id: row.id,
    name: row.name,
    tokenPrefix: row.tokenHash.slice(0, 16),
    scopes: (row.scopes as ApiTokenScope[]) ?? [],
    expiresAt: row.expiresAt,
    lastUsedAt: row.lastUsedAt,
    revokedAt: row.revokedAt,
    createdAt: row.createdAt,
  };
}

// ---------------------------------------------------------------------------
// Published-scope WHERE condition (reused by multiple query builders)
// ---------------------------------------------------------------------------

function publishedWhereClause() {
  const now = new Date().toISOString();
  return or(
    eq(schema.posts.status, "published"),
    and(eq(schema.posts.status, "scheduled"), sql`${schema.posts.publishedAt} <= ${now}`),
  );
}

function notDeletedWhereClause() {
  return ne(schema.posts.status, "deleted");
}

export function postVisibilityFilter(includeUnpublished?: boolean) {
  return includeUnpublished ? notDeletedWhereClause() : publishedWhereClause();
}

// ---------------------------------------------------------------------------
// Settings normalization
// ---------------------------------------------------------------------------

export function normalizeSiteSettings(
  input: SiteSettingsInput,
  base: SiteSettings = runtimeDefaultSiteSettings(),
): SiteSettings {
  const primaryLanguage = (input.primaryLanguage ?? base.primaryLanguage) === "zh" ? "zh" : "en";

  return {
    ...base,
    name: cleanString(input.name, base.name),
    description: cleanString(input.description, base.description),
    url: cleanUrl(input.url, base.url),
    authorName: cleanString(input.authorName, base.authorName),
    authorBio: cleanString(input.authorBio, base.authorBio),
    avatarUrl: cleanString(input.avatarUrl, base.avatarUrl),
    defaultOgImage: cleanString(input.defaultOgImage, base.defaultOgImage),
    socialLinks: Array.isArray(input.socialLinks) ? input.socialLinks : base.socialLinks,
    navigation: Array.isArray(input.navigation) ? input.navigation : base.navigation,
    rssEnabled: input.rssEnabled ?? base.rssEnabled,
    commentsEnabled: input.commentsEnabled ?? base.commentsEnabled,
    commentsRequireApproval: input.commentsRequireApproval ?? base.commentsRequireApproval,
    commentAutoBlockEnabled: input.commentAutoBlockEnabled ?? base.commentAutoBlockEnabled,
    commentBlockedKeywords:
      input.commentBlockedKeywords !== undefined
        ? normalizeCommentBlockedKeywords(input.commentBlockedKeywords)
        : base.commentBlockedKeywords,
    aiCommentModerationEnabled: input.aiCommentModerationEnabled ?? base.aiCommentModerationEnabled,
    aiCommentModerationRules: cleanString(
      input.aiCommentModerationRules,
      base.aiCommentModerationRules,
    ),
    emailVerificationEnabled: input.emailVerificationEnabled ?? base.emailVerificationEnabled,
    emailNotificationsEnabled: input.emailNotificationsEnabled ?? base.emailNotificationsEnabled,
    manualEmailBroadcastsEnabled:
      input.manualEmailBroadcastsEnabled ?? base.manualEmailBroadcastsEnabled,
    indexingEnabled: input.indexingEnabled ?? base.indexingEnabled,
    themePreset: normalizeThemePreset(input.themePreset ?? input.theme, base.themePreset),
    layoutPreset: normalizeLayoutPreset(input.layoutPreset, base.layoutPreset),
    locales: ["en", "zh"],
    primaryLanguage,
    i18n: {
      ...base.i18n,
      ...input.i18n,
    },
  };
}

export function runtimeDefaultSiteSettings(): SiteSettings {
  return {
    ...siteSettings,
    url: getPublicSiteUrl(siteSettings.url),
  };
}

// ---------------------------------------------------------------------------
// Shared utilities
// ---------------------------------------------------------------------------

function cleanString(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function cleanUrl(value: string | undefined, fallback: string) {
  return cleanString(value, fallback).replace(/\/$/, "");
}
