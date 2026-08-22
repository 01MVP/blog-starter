import "@tanstack/react-start/server-only";

// Re-export all types from shared module
export type {
  PostInput,
  CommentInput,
  ListPostsOptions,
  AssetInput,
  SiteSettingsInput,
  D1Result,
} from "./cms-d1-shared";

// Re-export posts
export {
  countD1Posts,
  listD1Posts,
  getD1PostBySlug,
  getD1PostByIdOrSlug,
  createD1Post,
  updateD1Post,
  deleteD1Post,
} from "./cms-d1-posts";

export type { ObsidianSyncEntry, ObsidianSyncResult } from "./cms-d1-obsidian";
export { isObsidianPost, syncD1ObsidianPosts } from "./cms-d1-obsidian";

// Re-export comments
export type { D1CommentAiModerationTask, D1CommentCreateResult } from "./cms-d1-comments";
export {
  createD1Comment,
  listD1ApprovedComments,
  moderateD1Comment,
  resolveD1CommentAiModeration,
  listD1Comments,
} from "./cms-d1-comments";

// Re-export tags
export { listD1Tags, upsertD1Tag, replaceD1PostTags } from "./cms-d1-tags";

// Re-export series
export {
  listD1Series,
  getD1SeriesByIdOrSlug,
  createD1Series,
  updateD1Series,
  deleteD1Series,
} from "./cms-d1-series";

export { getD1SiteSettings, updateD1SiteSettings } from "./cms-d1-settings";
export {
  listD1Assets,
  getD1AssetById,
  createD1Asset,
  deleteD1Asset,
  buildD1SiteExport,
} from "./cms-d1-assets";
export {
  createD1ApiToken,
  listD1ApiTokens,
  revokeD1ApiToken,
  verifyD1ApiToken,
} from "./cms-d1-tokens";

// Re-export analytics
export { getD1AnalyticsOverview, trackD1PageView } from "./cms-d1-analytics";
