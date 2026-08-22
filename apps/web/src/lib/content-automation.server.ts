import "@tanstack/react-start/server-only";
import {
  htmlToText,
  markdownToText,
  renderMarkdownToHtml,
  slugify,
  type Post,
  type SupportedLocale,
} from "@repo/core";

import {
  createOpenAiCompatibleChatCompletion,
  getConfiguredAiProvider,
  parseAiJsonObject,
} from "#/lib/ai-provider.server";
import type { PostInput } from "#/lib/cms-d1-shared";

type PublishingAutomationInput = PostInput & {
  locale?: SupportedLocale;
};

type GeneratedMetadata = {
  title?: string;
  excerpt?: string;
  slug?: string;
  tags?: string[];
};

type GeneratedEnglishTranslation = {
  title?: string;
  excerpt?: string;
  contentMarkdown?: string;
};

const defaultTitleValues = new Set(["", "New bilingual post", "新的双语文章", "Untitled post"]);
const defaultExcerptValues = new Set([
  "",
  "A short summary for the new post.",
  "新文章的简短摘要。",
]);

export async function applyPublishingAutomation(
  input: PublishingAutomationInput,
  currentPost?: Post | null,
): Promise<PublishingAutomationInput> {
  if (!shouldAutomate(input.status)) {
    return input;
  }

  const config = await getConfiguredAiProvider().catch(() => null);

  if (!config) {
    return input;
  }

  const snapshot = createAutomationSnapshot(input, currentPost);
  const [metadataResult, slugTagsResult, englishResult] = await Promise.allSettled([
    generateMetadata(snapshot, config),
    generateSlugAndTags(snapshot, config),
    generateEnglishTranslation(snapshot, config),
  ]);
  const metadata = settledValue(metadataResult) ?? {};
  const slugTags = settledValue(slugTagsResult) ?? {};
  const english = settledValue(englishResult) ?? {};

  return mergeAutomationResult(input, currentPost, {
    ...metadata,
    slug: slugTags.slug ?? metadata.slug,
    tags: slugTags.tags ?? metadata.tags,
    english,
  });
}

function shouldAutomate(status: PostInput["status"]) {
  return status === "published";
}

function createAutomationSnapshot(input: PublishingAutomationInput, currentPost?: Post | null) {
  const contentMarkdown =
    input.contentMarkdown?.trim() || currentPost?.contentMarkdown || `# ${input.title ?? ""}\n`;
  const contentHtml =
    input.contentHtml !== undefined ? input.contentHtml : (currentPost?.contentHtml ?? "");
  const contentText = contentHtml
    ? htmlToText(contentHtml)
    : markdownToText(contentMarkdown || currentPost?.contentMarkdown || "");
  const title = input.title?.trim() || currentPost?.title || "";
  const excerpt = input.excerpt?.trim() || currentPost?.excerpt || "";
  const tags = input.tags ?? currentPost?.tags.map((tag) => tag.name) ?? [];
  const locale = input.locale ?? "en";

  return {
    contentMarkdown,
    contentText: contentText.slice(0, 12_000),
    excerpt,
    locale,
    tags,
    title,
  };
}

async function generateMetadata(
  snapshot: ReturnType<typeof createAutomationSnapshot>,
  config: NonNullable<Awaited<ReturnType<typeof getConfiguredAiProvider>>>,
): Promise<GeneratedMetadata> {
  const result = await createOpenAiCompatibleChatCompletion({
    config,
    messages: [
      {
        role: "system",
        content:
          "You generate concise blog publishing metadata. Return compact JSON only, with keys title and excerpt. The excerpt must be useful as a meta description and no longer than 150 characters.",
      },
      {
        role: "user",
        content: JSON.stringify({
          currentTitle: snapshot.title,
          currentExcerpt: snapshot.excerpt,
          content: snapshot.contentText,
          locale: snapshot.locale,
        }),
      },
    ],
    maxTokens: 260,
    temperature: 0.3,
  });

  if (!result.ok) {
    return {};
  }

  const parsed = parseAiJsonObject(result.content);

  return {
    title: cleanText(parsed?.title, 90),
    excerpt: cleanText(parsed?.excerpt, 180),
  };
}

async function generateSlugAndTags(
  snapshot: ReturnType<typeof createAutomationSnapshot>,
  config: NonNullable<Awaited<ReturnType<typeof getConfiguredAiProvider>>>,
): Promise<GeneratedMetadata> {
  const result = await createOpenAiCompatibleChatCompletion({
    config,
    messages: [
      {
        role: "system",
        content:
          'You generate blog URL slugs and topic tags. Return compact JSON only: {"slug":"lowercase-ascii-kebab-case","tags":["tag"]}. Use 3 to 6 tags. Keep tags short.',
      },
      {
        role: "user",
        content: JSON.stringify({
          title: snapshot.title,
          excerpt: snapshot.excerpt,
          existingTags: snapshot.tags,
          content: snapshot.contentText,
        }),
      },
    ],
    maxTokens: 220,
    temperature: 0.2,
  });

  if (!result.ok) {
    return {};
  }

  const parsed = parseAiJsonObject(result.content);
  const slug = cleanText(parsed?.slug, 96);
  const tags = Array.isArray(parsed?.tags)
    ? parsed.tags
        .map((tag) => cleanText(tag, 32))
        .filter((tag): tag is string => Boolean(tag))
        .slice(0, 6)
    : undefined;

  return {
    slug: slug ? slugify(slug) || undefined : undefined,
    tags,
  };
}

async function generateEnglishTranslation(
  snapshot: ReturnType<typeof createAutomationSnapshot>,
  config: NonNullable<Awaited<ReturnType<typeof getConfiguredAiProvider>>>,
): Promise<GeneratedEnglishTranslation> {
  const result = await createOpenAiCompatibleChatCompletion({
    config,
    messages: [
      {
        role: "system",
        content:
          "Translate or adapt this blog post into natural English. Preserve Markdown structure. Return compact JSON only with title, excerpt, and contentMarkdown.",
      },
      {
        role: "user",
        content: JSON.stringify({
          title: snapshot.title,
          excerpt: snapshot.excerpt,
          contentMarkdown: snapshot.contentMarkdown.slice(0, 24_000),
        }),
      },
    ],
    maxTokens: 4_000,
    temperature: 0.25,
    timeoutMs: 30_000,
  });

  if (!result.ok) {
    return {};
  }

  const parsed = parseAiJsonObject(result.content);

  return {
    title: cleanText(parsed?.title, 120),
    excerpt: cleanText(parsed?.excerpt, 220),
    contentMarkdown: cleanText(parsed?.contentMarkdown, 40_000),
  };
}

function mergeAutomationResult(
  input: PublishingAutomationInput,
  currentPost: Post | null | undefined,
  result: GeneratedMetadata & { english?: GeneratedEnglishTranslation },
): PublishingAutomationInput {
  const title = shouldReplaceTitle(input, currentPost) ? result.title || input.title : input.title;
  const excerpt = shouldReplaceExcerpt(input, currentPost)
    ? result.excerpt || input.excerpt
    : input.excerpt;
  const slug = shouldReplaceSlug(input, currentPost) ? result.slug || input.slug : input.slug;
  const tags = shouldReplaceTags(input, currentPost) ? result.tags || input.tags : input.tags;
  const english = result.english;
  const i18n =
    english?.title || english?.excerpt || english?.contentMarkdown
      ? {
          ...input.i18n,
          title: {
            ...input.i18n?.title,
            en: english.title || result.title || input.title || currentPost?.title || "",
          },
          excerpt: {
            ...input.i18n?.excerpt,
            en: english.excerpt || result.excerpt || input.excerpt || currentPost?.excerpt || "",
          },
          contentMarkdown: {
            ...input.i18n?.contentMarkdown,
            en:
              english.contentMarkdown ||
              input.contentMarkdown ||
              currentPost?.contentMarkdown ||
              "",
          },
          contentHtml: {
            ...input.i18n?.contentHtml,
            en: renderMarkdownToHtml(
              english.contentMarkdown ||
                input.contentMarkdown ||
                currentPost?.contentMarkdown ||
                "",
            ),
          },
          contentText: {
            ...input.i18n?.contentText,
            en: markdownToText(
              english.contentMarkdown ||
                input.contentMarkdown ||
                currentPost?.contentMarkdown ||
                "",
            ),
          },
          seoTitle: {
            ...input.i18n?.seoTitle,
            en: english.title || result.title || input.title || currentPost?.title || "",
          },
          seoDescription: {
            ...input.i18n?.seoDescription,
            en: english.excerpt || result.excerpt || input.excerpt || currentPost?.excerpt || "",
          },
        }
      : input.i18n;

  return {
    ...input,
    ...(title ? { title } : {}),
    ...(excerpt ? { excerpt, seoDescription: excerpt } : {}),
    ...(slug ? { slug } : {}),
    ...(tags?.length ? { tags } : {}),
    i18n,
  };
}

function shouldReplaceTitle(input: PublishingAutomationInput, currentPost?: Post | null) {
  return defaultTitleValues.has(input.title?.trim() || currentPost?.title || "");
}

function shouldReplaceExcerpt(input: PublishingAutomationInput, currentPost?: Post | null) {
  return defaultExcerptValues.has(input.excerpt?.trim() || currentPost?.excerpt || "");
}

function shouldReplaceSlug(input: PublishingAutomationInput, currentPost?: Post | null) {
  const currentSlug = input.slug?.trim() || currentPost?.slug || "";

  return !currentSlug || currentSlug === "new-bilingual-post" || currentSlug === "untitled-post";
}

function shouldReplaceTags(input: PublishingAutomationInput, currentPost?: Post | null) {
  return input.tags !== undefined ? input.tags.length === 0 : (currentPost?.tags.length ?? 0) === 0;
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : undefined;
}

function settledValue<TValue>(result: PromiseSettledResult<TValue>) {
  return result.status === "fulfilled" ? result.value : undefined;
}
