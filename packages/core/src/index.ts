import { siteSettings } from "./demo-data";
import type { Comment, Post, Series, SiteSettings, SupportedLocale, Tag } from "./types";

export {
  applyAiCommentModerationDecision,
  defaultAiCommentModerationRules,
  getCommentInitialStatus,
  normalizeCommentBlockedKeywords,
} from "./comment-moderation";
export { htmlToText, markdownToText, renderMarkdownToHtml, sanitizeHtml } from "./markdown";
export { normalizeLayoutPreset, normalizeThemePreset } from "./presets";
export { pickRelatedPosts } from "./related-posts";
export {
  assertPassword,
  authErrorMessage,
  cleanStringList,
  countLinks,
  digestText,
  escapeHtml,
  extractSetCookieHeaders,
  normalizeDateInput,
  normalizeEmail,
  parseJson,
  slugify,
  splitSetCookieHeader,
  toIsoString,
} from "./utils";
export type {
  ApiToken,
  ApiTokenScope,
  Asset,
  Comment,
  CommentAiModeration,
  CommentAiModerationDecision,
  CommentAiModerationStatus,
  CommentStatus,
  CommentUserStatus,
  ContentStatus,
  CmsUser,
  EmailPreference,
  LayoutPreset,
  Post,
  PostExternalSource,
  Series,
  SiteSettings,
  SupportedLocale,
  Tag,
  ThemePreset,
  UserRole,
} from "./types";

export function resolveLocale(locale?: string): SupportedLocale {
  return locale === "zh" ? "zh" : "en";
}

export function localizeText(
  fallback: string,
  translations: Partial<Record<SupportedLocale, string>> | undefined,
  locale: SupportedLocale,
) {
  return translations?.[locale] ?? translations?.en ?? fallback;
}

export function localizeTag(tag: Tag, locale: SupportedLocale): Tag {
  return {
    ...tag,
    name: localizeText(tag.name, tag.i18n?.name, locale),
    description: localizeText(tag.description, tag.i18n?.description, locale),
  };
}

export function localizeSeries(series: Series, locale: SupportedLocale): Series {
  return {
    ...series,
    name: localizeText(series.name, series.i18n?.name, locale),
    description: localizeText(series.description, series.i18n?.description, locale),
  };
}

export function localizePost(post: Post, locale: SupportedLocale): Post {
  return {
    ...post,
    title: localizeText(post.title, post.i18n?.title, locale),
    excerpt: localizeText(post.excerpt, post.i18n?.excerpt, locale),
    contentMarkdown: localizeText(post.contentMarkdown, post.i18n?.contentMarkdown, locale),
    contentHtml: localizeText(post.contentHtml, post.i18n?.contentHtml, locale),
    contentText: localizeText(post.contentText, post.i18n?.contentText, locale),
    seoTitle: localizeText(post.seoTitle, post.i18n?.seoTitle, locale),
    seoDescription: localizeText(post.seoDescription, post.i18n?.seoDescription, locale),
    series: post.series ? localizeSeries(post.series, locale) : null,
    tags: post.tags.map((tag) => localizeTag(tag, locale)),
  };
}

export function localizeComment(comment: Comment, locale: SupportedLocale): Comment {
  return {
    ...comment,
    body: localizeText(comment.body, comment.i18n?.body, locale),
  };
}

export function localizeSiteSettings(
  settings: SiteSettings,
  locale: SupportedLocale,
): SiteSettings {
  return {
    ...settings,
    name: localizeText(settings.name, settings.i18n?.name, locale),
    description: localizeText(settings.description, settings.i18n?.description, locale),
    authorBio: localizeText(settings.authorBio, settings.i18n?.authorBio, locale),
    navigation: settings.navigation.map((item) => ({
      ...item,
      label: localizeNavigationLabel(item, locale),
    })),
  };
}

const defaultNavigationLabels: Record<SupportedLocale, Record<string, string>> = {
  en: {
    "/demo": "Demo",
    "/blog": "Articles",
    "/docs": "Docs",
    "/series": "Series",
    "/tags": "Tags",
    "/about": "About",
  },
  zh: {
    "/demo": "博客 Demo",
    "/blog": "文章",
    "/docs": "文档",
    "/series": "专栏",
    "/tags": "标签",
    "/about": "关于",
  },
};

function localizeNavigationLabel(
  item: SiteSettings["navigation"][number],
  locale: SupportedLocale,
) {
  const localizedLabel = localizeText(item.label, item.i18n?.label, locale);

  if (item.i18n?.label?.[locale]) {
    return localizedLabel;
  }

  const fallbackLabel = defaultNavigationLabels[locale][item.href];
  const knownDefaultLabels = new Set(
    Object.values(defaultNavigationLabels)
      .map((labels) => labels[item.href])
      .filter(Boolean),
  );

  return fallbackLabel && knownDefaultLabels.has(item.label) ? fallbackLabel : localizedLabel;
}

export function formatDate(date: string, locale: SupportedLocale = "en") {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/** Default site settings from seed data — used as SSR fallback by client components */
export { siteSettings };

export function getSiteSettingsForLocale(locale: SupportedLocale) {
  return localizeSiteSettings(siteSettings, locale);
}
