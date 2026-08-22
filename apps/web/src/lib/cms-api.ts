import { slugify, type ContentStatus, type Post, type SupportedLocale } from "@repo/core";

export {
  apiTokenScopes,
  jsonResponse,
  getApiLocale,
  readJsonBody,
  importPreview,
} from "./cms-api-utils";

export function createPostPreview(
  body: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    contentMarkdown: string;
    coverImage: string;
    status: ContentStatus;
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
  }>,
) {
  const title = body.title?.trim() || "Untitled post";
  const now = new Date().toISOString();
  const post: Post = {
    id: `post_${crypto.randomUUID()}`,
    title,
    slug: body.slug?.trim() || slugify(title) || "untitled-post",
    excerpt: body.excerpt?.trim() || "",
    coverImage: body.coverImage?.trim() || "",
    contentMarkdown: body.contentMarkdown?.trim() || `# ${title}\n`,
    contentHtml: "",
    contentText: "",
    status: body.status ?? "draft",
    source: "api",
    featured: body.featured ?? false,
    pinned: body.pinned ?? false,
    commentsEnabled: body.commentsEnabled ?? true,
    publishedAt: body.publishedAt ?? now,
    updatedAt: now,
    authorName: "",
    series: null,
    tags: [],
    seoTitle: body.seoTitle?.trim() || title,
    seoDescription: body.seoDescription?.trim() || "",
    i18n: body.i18n,
  };

  return {
    ...post,
    url: `/blog/${post.slug}`,
  };
}
