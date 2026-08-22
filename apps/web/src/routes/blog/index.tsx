import { localizePost, localizeSeries, localizeSiteSettings, localizeTag } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";

import { PostCard } from "#/components/post-card";
import { SiteShell } from "#/components/site-shell";
import { $getBlogIndexPage, type BlogIndexPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { publicSiteHead } from "#/lib/public-head";
import { m } from "#/paraglide/messages.js";

const BLOG_PAGE_SIZE = 6;

export const Route = createFileRoute("/blog/")({
  validateSearch: (search) => ({
    q: typeof search.q === "string" ? search.q : "",
    tag: typeof search.tag === "string" ? search.tag : "",
    series: typeof search.series === "string" ? search.series : "",
    page: Math.max(1, Number(search.page) || 1),
  }),
  loaderDeps: ({ search }) => ({
    page: search.page,
    q: search.q,
    tag: search.tag,
    series: search.series,
  }),
  loader: ({ deps }): Promise<BlogIndexPageData> =>
    $getBlogIndexPage({
      data: {
        query: deps.q,
        tagSlug: deps.tag || undefined,
        seriesSlug: deps.series || undefined,
        page: deps.page,
        pageSize: BLOG_PAGE_SIZE,
      },
    }),
  head: ({ loaderData }) => publicSiteHead(loaderData?.siteSettings),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const locale = getCurrentLocale();
  const search = Route.useSearch();
  const data: BlogIndexPageData = Route.useLoaderData();
  const tags = dedupeBySlug(data.tags.map((tag) => localizeTag(tag, locale)));
  const series = dedupeBySlug(data.series.map((item) => localizeSeries(item, locale)));
  const posts = data.posts.map((post) => localizePost(post, locale)).filter(isReaderFacingPost);
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);
  const pageCount = Math.max(1, Math.ceil(data.totalPosts / data.pageSize));
  const currentPage = Math.min(data.page, pageCount);

  return (
    <SiteShell siteSettings={siteSettings}>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-link uppercase">{m.blog_eyebrow()}</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{m.blog_title()}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{m.blog_description()}</p>
        </div>
        <form className="mt-8 grid gap-4 rounded-lg border border-border/80 bg-card p-4 shadow-xs md:grid-cols-[minmax(0,1fr)_auto]">
          {search.tag ? <input type="hidden" name="tag" value={search.tag} /> : null}
          {search.series ? <input type="hidden" name="series" value={search.series} /> : null}
          <label className="relative block">
            <span className="sr-only">{m.blog_search_placeholder()}</span>
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={search.q}
              placeholder={m.blog_search_placeholder()}
              className="pl-9"
            />
          </label>
          <Button type="submit">{m.blog_search_submit()}</Button>
          <details className="rounded-md border border-border bg-muted/30 p-3 md:col-span-2 md:hidden">
            <summary className="cursor-pointer text-sm font-semibold">
              {locale === "zh" ? "筛选文章" : "Filter articles"}
            </summary>
            <div className="mt-3 grid gap-3">
              <FilterGroups search={search} tags={tags} series={series} />
            </div>
          </details>
          <div className="hidden gap-3 md:col-span-2 md:grid">
            <FilterGroups search={search} tags={tags} series={series} />
          </div>
        </form>
        <div className="mt-8 grid gap-5">
          {posts.length ? (
            posts.map((post, index) => (
              <PostCard key={post.id} post={post} priority={index === 0} locale={locale} />
            ))
          ) : (
            <p className="rounded-lg border border-border/80 bg-card p-6 text-sm text-muted-foreground">
              {m.blog_no_results()}
            </p>
          )}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {m.pagination_page({ current: currentPage, total: pageCount })}
          </p>
          <div className="flex gap-2">
            <Button
              render={
                <a
                  href={blogHref({
                    q: search.q,
                    tag: search.tag,
                    series: search.series,
                    page: Math.max(1, currentPage - 1),
                  })}
                  aria-label={m.pagination_previous()}
                />
              }
              nativeButton={false}
              variant="outline"
              disabled={currentPage <= 1}
            >
              {m.pagination_previous()}
            </Button>
            <Button
              render={
                <a
                  href={blogHref({
                    q: search.q,
                    tag: search.tag,
                    series: search.series,
                    page: Math.min(pageCount, currentPage + 1),
                  })}
                  aria-label={m.pagination_next()}
                />
              }
              nativeButton={false}
              variant="outline"
              disabled={currentPage >= pageCount}
            >
              {m.pagination_next()}
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function FilterGroups({
  search,
  series,
  tags,
}: {
  readonly search: ReturnType<typeof Route.useSearch>;
  readonly series: Array<{ slug: string; name: string }>;
  readonly tags: Array<{ slug: string; name: string }>;
}) {
  return (
    <>
      <div className="flex flex-wrap gap-2" aria-label={m.blog_filter_label()}>
        <Button
          render={<a href={blogHref({ q: search.q })} aria-label={m.blog_filter_all()} />}
          nativeButton={false}
          variant={search.tag ? "outline" : "default"}
          size="sm"
        >
          {m.blog_filter_all()}
        </Button>
        {tags.slice(0, 8).map((tag) => (
          <Button
            key={tag.slug}
            render={
              <a
                href={blogHref({ q: search.q, tag: tag.slug, series: search.series })}
                aria-label={tag.name}
              />
            }
            nativeButton={false}
            variant={search.tag === tag.slug ? "default" : "outline"}
            size="sm"
          >
            {tag.name}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" aria-label={m.blog_series_filter_label()}>
        <Button
          render={
            <a href={blogHref({ q: search.q, tag: search.tag })} aria-label={m.blog_series_all()} />
          }
          nativeButton={false}
          variant={search.series ? "outline" : "default"}
          size="sm"
        >
          {m.blog_series_all()}
        </Button>
        {series.slice(0, 6).map((item) => (
          <Button
            key={item.slug}
            render={
              <a
                href={blogHref({ q: search.q, tag: search.tag, series: item.slug })}
                aria-label={item.name}
              />
            }
            nativeButton={false}
            variant={search.series === item.slug ? "default" : "outline"}
            size="sm"
          >
            {item.name}
          </Button>
        ))}
      </div>
    </>
  );
}

function blogHref({
  page,
  q,
  series,
  tag,
}: {
  readonly page?: number;
  readonly q?: string;
  readonly series?: string;
  readonly tag?: string;
}) {
  const search = new URLSearchParams({
    ...(q ? { q } : {}),
    ...(tag ? { tag } : {}),
    ...(series ? { series } : {}),
    ...(page && page > 1 ? { page: String(page) } : {}),
  });
  const value = search.toString();

  return value ? `/blog?${value}` : "/blog";
}

function dedupeBySlug<TItem extends { slug: string; name: string }>(items: TItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = `${item.slug}:${item.name}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function isReaderFacingPost(post: { title: string; slug: string }) {
  const normalized = `${post.title} ${post.slug}`.toLowerCase();

  return !["e2e comment flow", "smoke post", "e2e edit smoke"].some((marker) =>
    normalized.includes(marker),
  );
}
