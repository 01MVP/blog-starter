import {
  pickRelatedPosts,
  type Comment,
  type Post,
  type Series,
  type SiteSettings,
  type Tag,
} from "@repo/core";
import { createServerFn } from "@tanstack/react-start";

export type BlogPostPageData = {
  post: Post;
  comments: Comment[];
  relatedPosts: Post[];
  siteSettings: SiteSettings;
  turnstileSiteKey: string | null;
};

export type HomePageData = {
  posts: Post[];
  featuredPosts: Post[];
  siteSettings: SiteSettings;
  tags: Tag[];
  series: Series[];
};

export type BlogIndexPageData = {
  page: number;
  pageSize: number;
  posts: Post[];
  siteSettings: SiteSettings;
  tags: Tag[];
  series: Series[];
  totalPosts: number;
};

export type TagPageData = {
  siteSettings: SiteSettings;
  tag: Tag;
  posts: Post[];
};

export type TagsPageData = {
  siteSettings: SiteSettings;
  tags: Tag[];
  posts: Post[];
};

export type SeriesPageData = {
  siteSettings: SiteSettings;
  series: Series[];
  posts: Post[];
};

export type SeriesDetailPageData = {
  siteSettings: SiteSettings;
  currentSeries: Series;
  posts: Post[];
};

export type SiteSettingsPageData = {
  siteSettings: SiteSettings;
};

export type AboutPageData = {
  siteSettings: SiteSettings;
};

export const $getBlogPostPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<BlogPostPageData | null> => {
    const [{ env }, { getD1PostBySlug, getD1SiteSettings, listD1ApprovedComments, listD1Posts }] =
      await Promise.all([import("cloudflare:workers"), import("./cms-d1")]);
    const [siteSettings, post] = await Promise.all([
      getD1SiteSettings(),
      getD1PostBySlug(data.slug),
    ]);

    if (!post) {
      return null;
    }

    const [comments, relatedCandidates] = await Promise.all([
      listD1ApprovedComments(post.id),
      listD1Posts({ limit: 24 }),
    ]);

    return {
      post,
      comments,
      relatedPosts: pickRelatedPosts(post, relatedCandidates),
      siteSettings,
      turnstileSiteKey: env.VITE_TURNSTILE_SITE_KEY?.trim() || null,
    };
  });

export const $getHomePageData = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomePageData> => {
    const { getD1SiteSettings, listD1Posts, listD1Series, listD1Tags } = await import("./cms-d1");
    const [siteSettings, posts, featuredPosts, tags, series] = await Promise.all([
      getD1SiteSettings(),
      listD1Posts({ limit: 12 }),
      listD1Posts({ featured: true, limit: 3 }),
      listD1Tags(),
      listD1Series(),
    ]);

    return {
      posts,
      featuredPosts,
      siteSettings,
      tags,
      series,
    };
  },
);

export const $getBlogIndexPage = createServerFn({ method: "GET" })
  .inputValidator(
    (data: {
      page?: number;
      pageSize?: number;
      query?: string;
      tagSlug?: string;
      seriesSlug?: string;
    }) => data,
  )
  .handler(async ({ data }): Promise<BlogIndexPageData> => {
    const { countD1Posts, getD1SiteSettings, listD1Posts, listD1Series, listD1Tags } =
      await import("./cms-d1");
    const pageSize = Math.min(Math.max(1, Math.floor(data.pageSize ?? 6)), 24);
    const requestedPage = Math.max(1, Math.floor(data.page ?? 1));
    const filters = {
      query: data.query,
      tagSlug: data.tagSlug,
      seriesSlug: data.seriesSlug,
    };
    const [siteSettings, tags, series, totalPosts] = await Promise.all([
      getD1SiteSettings(),
      listD1Tags(),
      listD1Series(),
      countD1Posts(filters),
    ]);
    const pageCount = Math.max(1, Math.ceil(totalPosts / pageSize));
    const page = Math.min(requestedPage, pageCount);
    const posts = await listD1Posts({
      ...filters,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return {
      page,
      pageSize,
      posts,
      siteSettings,
      tags,
      series,
      totalPosts,
    };
  });

export const $getTagPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<TagPageData | null> => {
    const { getD1SiteSettings, listD1Posts, listD1Tags } = await import("./cms-d1");
    const [posts, siteSettings, tags] = await Promise.all([
      listD1Posts({ tagSlug: data.slug }),
      getD1SiteSettings(),
      listD1Tags(),
    ]);
    const tag = tags.find((candidate) => candidate.slug === data.slug);

    if (!tag) {
      return null;
    }

    return {
      siteSettings,
      tag,
      posts,
    };
  });

export const $getTagsPage = createServerFn({ method: "GET" }).handler(
  async (): Promise<TagsPageData> => {
    const { getD1SiteSettings, listD1Posts, listD1Tags } = await import("./cms-d1");
    const [posts, siteSettings, tags] = await Promise.all([
      listD1Posts(),
      getD1SiteSettings(),
      listD1Tags(),
    ]);

    return {
      siteSettings,
      posts,
      tags,
    };
  },
);

export const $getSeriesPage = createServerFn({ method: "GET" }).handler(
  async (): Promise<SeriesPageData> => {
    const { getD1SiteSettings, listD1Posts, listD1Series } = await import("./cms-d1");
    const [posts, siteSettings, series] = await Promise.all([
      listD1Posts(),
      getD1SiteSettings(),
      listD1Series(),
    ]);

    return {
      siteSettings,
      posts,
      series,
    };
  },
);

export const $getSeriesDetailPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<SeriesDetailPageData | null> => {
    const { getD1SiteSettings, listD1Posts, listD1Series } = await import("./cms-d1");
    const [posts, siteSettings, allSeries] = await Promise.all([
      listD1Posts({ seriesSlug: data.slug }),
      getD1SiteSettings(),
      listD1Series(),
    ]);
    const series = allSeries.find((candidate) => candidate.slug === data.slug);

    if (!series) {
      return null;
    }

    return {
      siteSettings,
      currentSeries: series,
      posts,
    };
  });

export const $getSiteSettingsPageData = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSettingsPageData> => {
    const { getD1SiteSettings } = await import("./cms-d1");

    return {
      siteSettings: await getD1SiteSettings(),
    };
  },
);

export const $getAboutPageData = createServerFn({ method: "GET" }).handler(
  async (): Promise<AboutPageData> => {
    const { getD1SiteSettings } = await import("./cms-d1");

    return {
      siteSettings: await getD1SiteSettings(),
    };
  },
);
