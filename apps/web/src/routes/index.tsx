import {
  SiCloudflare,
  SiDrizzle,
  SiReact,
  SiTypescript,
  SiVite,
} from "@icons-pack/react-simple-icons";
import {
  formatDate,
  localizePost,
  localizeSiteSettings,
  type Post,
  type SupportedLocale,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArchiveIcon,
  ArrowRightIcon,
  BookOpenIcon,
  CloudIcon,
  ExternalLinkIcon,
  FilesIcon,
  FileTextIcon,
  GitBranchIcon,
  GlobeIcon,
  ImageIcon,
  LockKeyholeIcon,
  MessageSquareTextIcon,
  PencilIcon,
  RocketIcon,
  ServerIcon,
  Share2Icon,
  ShieldCheckIcon,
  ShieldIcon,
  SparklesIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react";
import { useEffect, type ComponentType, type CSSProperties } from "react";

import { SiteShell } from "#/components/site-shell";
import { $getHomePageData, type HomePageData } from "#/lib/cms-server";
import { getDocsUrl } from "#/lib/docs-i18n";
import { getCurrentLocale } from "#/lib/i18n";
import { publicSiteHead } from "#/lib/public-head";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/")({
  loader: (): Promise<HomePageData> => $getHomePageData(),
  head: ({ loaderData }) => publicSiteHead(loaderData?.siteSettings),
  component: HomePage,
});

type HomeViewProps = {
  readonly posts: Post[];
  readonly locale: SupportedLocale;
};

type FeatureItem = {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
};

type ThemePreview = {
  readonly themePreset: string;
  readonly title: string;
  readonly description: string;
};

type FreeHighlight = {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly body: string;
};

type SetupPath = {
  readonly title: string;
  readonly description: string;
  readonly cta: string;
  readonly icon: LucideIcon;
};

type CreatorSpotlight = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly cta: string;
  readonly icon: LucideIcon;
};

type TechItem = {
  readonly name: string;
  readonly label: string;
  readonly icon: ComponentType<{ className?: string; style?: CSSProperties }>;
};

type HomeRevealStyle = CSSProperties & {
  readonly "--home-reveal-delay": string;
};

function HomePage() {
  const data: HomePageData = Route.useLoaderData();
  const locale = getCurrentLocale();
  const posts = data.posts.map((post) => localizePost(post, locale)).filter(isReaderFacingPost);
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);
  const homeProps = { posts, locale };

  return (
    <SiteShell siteSettings={siteSettings}>
      <ShelfHome {...homeProps} />
    </SiteShell>
  );
}

function ShelfHome({ posts, locale }: HomeViewProps) {
  const copy = getHomeCopy(locale);
  const aiSetupDocsHref = getDocsUrl(["ai-setup"], locale);
  const obsidianDocsHref = getDocsUrl(["obsidian"], locale);
  const latestPosts = posts.slice(0, 3);

  return (
    <div data-home-surface className="bg-background">
      <HomeMotionController />
      {/* ── Hero ── */}
      <section
        data-home-hero
        className="relative isolate overflow-hidden border-b-2 border-foreground"
      >
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16 sm:pb-14 lg:px-8 lg:pt-24 lg:pb-20 xl:px-12">
          <p
            data-home-reveal
            style={getRevealStyle(0)}
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase"
          >
            {copy.eyebrow}
          </p>
          <h1
            data-home-reveal
            style={getRevealStyle(90)}
            className="mt-6 max-w-5xl text-4xl leading-[0.98] font-semibold text-balance sm:text-6xl lg:text-7xl"
          >
            {copy.heroTitle}
          </h1>
          <p
            data-home-reveal
            style={getRevealStyle(180)}
            className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            {copy.heroBody}
          </p>
          <div data-home-reveal style={getRevealStyle(270)} className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<a href={aiSetupDocsHref} aria-label={copy.primaryCta} />}
              nativeButton={false}
              size="lg"
              className="hover:-translate-y-0.5"
            >
              {copy.primaryCta}
              <ArrowRightIcon />
            </Button>
            <Button
              render={<Link to="/demo" />}
              variant="outline"
              nativeButton={false}
              size="lg"
              className="hover:-translate-y-0.5"
            >
              <FileTextIcon />
              {copy.secondaryCta}
            </Button>
          </div>
        </div>
      </section>

      <LatestPostsSection copy={copy} latestPosts={latestPosts} locale={locale} />

      {/* ── Your Own Corner ── */}
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <div data-home-reveal className="grid gap-9 lg:grid-cols-[0.44fr_0.56fr]">
            <div>
              <p className="text-sm font-semibold text-link uppercase">{copy.ownershipEyebrow}</p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
                {copy.ownershipTitle}
              </h2>
            </div>
            <p className="self-end text-sm leading-7 text-muted-foreground">{copy.ownershipBody}</p>
          </div>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {copy.ownershipPoints.map((point, index) => (
              <OwnershipRow key={point.title} point={point} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Features ── */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 py-12 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:px-8 lg:py-16 xl:px-12">
          <div data-home-reveal className="max-w-md">
            <p className="text-sm font-semibold text-link uppercase">{copy.featuresEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
              {copy.featuresTitle}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{copy.featuresBody}</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {copy.features.map((feature, index) => (
              <FeatureRow key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Obsidian ── */}
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 py-12 sm:px-6 lg:grid-cols-[0.44fr_0.56fr] lg:px-8 lg:py-16 xl:px-12">
          <div data-home-reveal className="max-w-md">
            <p className="text-sm font-semibold text-link uppercase">{copy.obsidianEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
              {copy.obsidianTitle}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{copy.obsidianBody}</p>
            <div className="mt-6">
              <Button
                render={<a href={obsidianDocsHref} aria-label={copy.obsidianCta} />}
                variant="outline"
                nativeButton={false}
                className="hover:-translate-y-0.5"
              >
                <FileTextIcon />
                {copy.obsidianCta}
              </Button>
            </div>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {copy.obsidianPoints.map((feature, index) => (
              <FeatureRow key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Automation ── */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <div data-home-reveal className="grid gap-9 lg:grid-cols-[0.44fr_0.56fr]">
            <div>
              <p className="text-sm font-semibold text-link uppercase">{copy.skillEyebrow}</p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
                {copy.skillTitle}
              </h2>
            </div>
            <p className="self-end text-sm leading-7 text-muted-foreground">{copy.skillBody}</p>
          </div>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {copy.setupPaths.map((path, index) => (
              <SetupPathCard key={path.title} href={aiSetupDocsHref} path={path} index={index} />
            ))}
          </div>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {copy.skillSteps.map((step, index) => (
              <li
                key={step.number}
                data-home-reveal
                data-home-row
                style={getRevealStyle(index * 55)}
                className="grid gap-3 py-5 sm:grid-cols-[92px_minmax(0,1fr)]"
              >
                <span className="text-sm font-semibold text-muted-foreground">{step.number}</span>
                <span>
                  <span className="block text-lg font-semibold">{step.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Merged: No Server + Free Quota ── */}
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <p data-home-reveal className="text-sm font-semibold text-link uppercase">
            {copy.freeEyebrow}
          </p>
          <h2
            data-home-reveal
            style={getRevealStyle(75)}
            className="mt-3 max-w-2xl text-3xl leading-tight font-semibold text-balance"
          >
            {copy.freeTitle}
          </h2>
          <p
            data-home-reveal
            style={getRevealStyle(150)}
            className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground"
          >
            {copy.freeBody}
          </p>
          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            {copy.freeHighlights.map((h, index) => (
              <FreeHighlightCard key={h.label} item={h} index={index} />
            ))}
          </div>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {copy.quotaItems.map((item, index) => (
              <QuotaRow key={item.service} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <p data-home-reveal className="text-sm font-semibold text-link uppercase">
            {copy.techEyebrow}
          </p>
          <h2
            data-home-reveal
            style={getRevealStyle(75)}
            className="mt-3 max-w-2xl text-3xl leading-tight font-semibold text-balance"
          >
            {copy.techTitle}
          </h2>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {copy.techItems.map((item, index) => (
              <TechBadge key={item.name} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Theme Presets ── */}
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <div data-home-reveal className="grid gap-6 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-link uppercase">{copy.themeEyebrow}</p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
                {copy.themeTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{copy.themeBody}</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {copy.themePreviews.map((preview, index) => (
              <ThemePreviewCard key={preview.themePreset} preview={preview} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CreatorSection copy={copy} />
    </div>
  );
}

function CreatorSection({ copy }: { readonly copy: ReturnType<typeof getHomeCopy> }) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
        <div className="grid gap-9 lg:grid-cols-[0.4fr_0.6fr]">
          <div data-home-reveal className="max-w-md">
            <p className="text-sm font-semibold text-link uppercase">{copy.creatorEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
              {copy.creatorTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.creatorBody}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                render={<a href="https://01mvp.com/template" aria-label={copy.creatorPrimaryCta} />}
                nativeButton={false}
                className="hover:-translate-y-0.5"
              >
                {copy.creatorPrimaryCta}
                <ExternalLinkIcon />
              </Button>
              <Button
                render={<a href="https://makerjackie.com" aria-label={copy.creatorSecondaryCta} />}
                variant="outline"
                nativeButton={false}
                className="hover:-translate-y-0.5"
              >
                {copy.creatorSecondaryCta}
                <ExternalLinkIcon />
              </Button>
            </div>
          </div>

          <div className="grid gap-px border border-border bg-border md:grid-cols-3">
            {copy.creatorSpotlights.map((item, index) => (
              <CreatorSpotlightCard key={item.href} item={item} index={index} />
            ))}
          </div>
        </div>

        <div
          data-home-reveal
          style={getRevealStyle(210)}
          className="mt-10 flex flex-col gap-3 border-y border-foreground py-5 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-semibold">
            {copy.poweredByLabel}{" "}
            <a href="https://01mvp.com" className="text-link hover:underline">
              01mvp.com
            </a>
          </p>
          <p className="text-muted-foreground">
            {copy.creatorCreditLabel}{" "}
            <a
              href="https://makerjackie.com"
              className="font-semibold text-foreground hover:text-link"
            >
              Jackie
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function CreatorSpotlightCard({
  index,
  item,
}: {
  readonly index: number;
  readonly item: CreatorSpotlight;
}) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      data-home-reveal
      data-home-card
      style={getRevealStyle(index * 70)}
      className="group bg-background p-5 transition hover:bg-muted/35"
    >
      <span
        data-home-icon
        className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground"
      >
        <Icon className="size-5" />
      </span>
      <span className="mt-5 block text-lg leading-tight font-semibold group-hover:text-link">
        {item.title}
      </span>
      <span className="mt-3 block text-sm leading-6 text-muted-foreground">{item.description}</span>
      <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-link">
        {item.cta}
        <ExternalLinkIcon className="size-4" />
      </span>
    </a>
  );
}

function LatestPostsSection({
  copy,
  latestPosts,
  locale,
}: {
  readonly copy: ReturnType<typeof getHomeCopy>;
  readonly latestPosts: Post[];
  readonly locale: SupportedLocale;
}) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
        <div data-home-reveal className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-link uppercase">{copy.contentEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold">{copy.contentTitle}</h2>
          </div>
        </div>

        {latestPosts.length ? (
          <div
            className={`mt-7 grid gap-px border border-border bg-border ${getLatestPostsGridClassName(
              latestPosts.length,
            )}`}
          >
            {latestPosts.map((post, index) => (
              <LatestPostCard key={post.id} post={post} locale={locale} index={index} />
            ))}
          </div>
        ) : null}

        <div data-home-reveal className="mt-7">
          <Button
            render={<Link to="/blog" search={{ q: "", tag: "", series: "", page: 1 }} />}
            variant="outline"
            nativeButton={false}
            className="hover:-translate-y-0.5"
          >
            {m.view_all_posts()}
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}

function getLatestPostsGridClassName(count: number) {
  if (count <= 1) {
    return "md:grid-cols-1";
  }

  if (count === 2) {
    return "md:grid-cols-2";
  }

  return "md:grid-cols-3";
}

function LatestPostCard({
  index,
  locale,
  post,
}: {
  readonly index: number;
  readonly locale: SupportedLocale;
  readonly post: Post;
}) {
  return (
    <article
      data-home-reveal
      data-home-card
      style={getRevealStyle(index * 70)}
      className="flex min-h-44 flex-col bg-background p-4 transition hover:bg-muted/35"
    >
      <div className="flex items-start justify-between gap-3">
        <time dateTime={post.publishedAt} className="text-xs font-medium text-muted-foreground">
          {formatDate(post.publishedAt, locale)}
        </time>
        <PostBadges post={post} />
      </div>
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="group mt-5 block">
        <h3 className="line-clamp-2 text-lg leading-tight font-semibold text-balance group-hover:text-link">
          {post.title}
        </h3>
      </Link>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
    </article>
  );
}

function HomeMotionController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-home-surface]");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-home-reveal]"));

    const reveal = (element: HTMLElement) => {
      element.dataset.homeReveal = "visible";
    };

    const isInView = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();

      return rect.top < window.innerHeight * 0.96 && rect.bottom > 0;
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach(reveal);
      return;
    }

    elements.filter(isInView).forEach(reveal);
    root?.setAttribute("data-home-motion-ready", "true");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    elements
      .filter((element) => element.dataset.homeReveal !== "visible")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}

function getRevealStyle(delayMs: number): HomeRevealStyle {
  return {
    "--home-reveal-delay": `${delayMs}ms`,
  };
}

function FreeHighlightCard({
  index,
  item,
}: {
  readonly index: number;
  readonly item: FreeHighlight;
}) {
  const Icon = item.icon;
  return (
    <div
      data-home-reveal
      data-home-card
      style={getRevealStyle(index * 70)}
      className="bg-background px-6 py-7"
    >
      <span
        data-home-icon
        className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground"
      >
        <Icon className="size-5" />
      </span>
      <p className="mt-5 text-lg font-semibold">{item.label}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
    </div>
  );
}

function SetupPathCard({
  href,
  index,
  path,
}: {
  readonly href: string;
  readonly index: number;
  readonly path: SetupPath;
}) {
  const Icon = path.icon;

  return (
    <a
      href={href}
      data-home-reveal
      data-home-card
      style={getRevealStyle(index * 70)}
      className="group bg-background p-5 transition hover:bg-muted/35"
    >
      <span
        data-home-icon
        className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground"
      >
        <Icon className="size-5" />
      </span>
      <span className="mt-5 block text-lg font-semibold group-hover:text-link">{path.title}</span>
      <span className="mt-2 block text-sm leading-6 text-muted-foreground">{path.description}</span>
      <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-link">
        {path.cta}
        <ArrowRightIcon className="size-4" />
      </span>
    </a>
  );
}

function OwnershipRow({
  index,
  point,
}: {
  readonly index: number;
  readonly point: { title: string; description: string; icon: LucideIcon };
}) {
  const Icon = point.icon;
  return (
    <article
      data-home-reveal
      data-home-row
      style={getRevealStyle(index * 55)}
      className="grid gap-4 py-5 sm:grid-cols-[48px_minmax(0,1fr)]"
    >
      <span
        data-home-icon
        className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground"
      >
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block text-lg font-semibold">{point.title}</span>
        <span className="mt-2 block text-sm leading-6 text-muted-foreground">
          {point.description}
        </span>
      </span>
    </article>
  );
}

function FeatureRow({ feature, index }: { readonly feature: FeatureItem; readonly index: number }) {
  const Icon = feature.icon;

  return (
    <article
      data-home-reveal
      data-home-row
      style={getRevealStyle(index * 45)}
      className="grid gap-4 py-5 sm:grid-cols-[48px_minmax(0,1fr)]"
    >
      <span
        data-home-icon
        className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground"
      >
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block text-lg font-semibold">{feature.title}</span>
        <span className="mt-2 block text-sm leading-6 text-muted-foreground">
          {feature.description}
        </span>
      </span>
    </article>
  );
}

function QuotaRow({
  index,
  item,
}: {
  readonly index: number;
  readonly item: { service: string; quota: string; note: string };
}) {
  return (
    <div
      data-home-reveal
      data-home-row
      style={getRevealStyle(index * 45)}
      className="grid gap-2 py-4 sm:grid-cols-[160px_minmax(0,1fr)]"
    >
      <span className="text-sm font-semibold">{item.service}</span>
      <span>
        <span className="block text-sm font-semibold text-link">{item.quota}</span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.note}</span>
      </span>
    </div>
  );
}

function TechBadge({ index, item }: { readonly index: number; readonly item: TechItem }) {
  const Icon = item.icon;
  return (
    <div
      data-home-reveal
      data-home-card
      style={getRevealStyle(index * 45)}
      className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background px-3 py-5 text-center"
    >
      <Icon className="size-7 shrink-0" />
      <span className="text-xs leading-tight font-semibold">{item.name}</span>
      <span className="text-xs text-muted-foreground">{item.label}</span>
    </div>
  );
}

function ThemePreviewCard({
  index,
  preview,
}: {
  readonly index: number;
  readonly preview: ThemePreview;
}) {
  return (
    <article
      data-home-reveal
      data-home-card
      data-theme-preset={preview.themePreset}
      data-layout-preset="shelf"
      style={getRevealStyle(index * 70)}
      className="rounded-lg border border-border bg-background p-4 text-foreground"
    >
      <div className="flex items-center gap-2">
        <span className="size-4 rounded-full bg-primary" />
        <span className="size-4 rounded-full bg-muted" />
        <span className="size-4 rounded-full bg-accent" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">{preview.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{preview.description}</p>
    </article>
  );
}

function PostBadges({ post }: { readonly post: Post }) {
  if (!post.pinned && !post.featured) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {post.pinned ? (
        <span className="rounded-sm bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {m.pinned()}
        </span>
      ) : null}
      {post.featured ? (
        <span className="rounded-sm bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
          {m.featured()}
        </span>
      ) : null}
    </div>
  );
}

function isReaderFacingPost(post: { title: string; slug: string }) {
  const normalized = `${post.title} ${post.slug}`.toLowerCase();

  return !["e2e comment flow", "smoke post", "e2e edit smoke"].some((marker) =>
    normalized.includes(marker),
  );
}

// Cloudflare brand color
const CF_ORANGE = "#F6821F";

function getHomeCopy(locale: SupportedLocale) {
  const techItems: TechItem[] = [
    {
      name: "Cloudflare",
      label: locale === "zh" ? "运行 / 存储 / DB" : "Runtime · Storage · DB",
      icon: (props) => <SiCloudflare {...props} style={{ color: CF_ORANGE }} />,
    },
    {
      name: "TanStack Start",
      label: locale === "zh" ? "全栈框架" : "Full-stack framework",
      icon: (props) => <SiReact {...props} style={{ color: "#61DAFB" }} />,
    },
    {
      name: "TypeScript",
      label: locale === "zh" ? "类型安全" : "Type safety",
      icon: (props) => <SiTypescript {...props} style={{ color: "#3178C6" }} />,
    },
    {
      name: "Vite",
      label: locale === "zh" ? "构建工具" : "Build tool",
      icon: (props) => <SiVite {...props} style={{ color: "#646CFF" }} />,
    },
    {
      name: "Drizzle ORM",
      label: locale === "zh" ? "数据库 ORM" : "Database ORM",
      icon: (props) => <SiDrizzle {...props} style={{ color: "#C5F74F" }} />,
    },
    {
      name: "Better Auth",
      label: locale === "zh" ? "认证" : "Auth",
      icon: (props) => <ShieldIcon {...props} />,
    },
  ];

  if (locale === "zh") {
    return {
      eyebrow: "个人博客内容系统 · Cloudflare 托管 · 自动化部署",
      heroTitle: "搭建你的永久精神家园",
      heroBody:
        "01mvp-blog-starter 是一套 Cloudflare 原生的个人博客内容系统。后台、评论、图床、RSS 开箱即用，初始化流程可以从配置一路跑到上线。",
      primaryCta: "开始 AI 建站",
      secondaryCta: "查看博客 Demo",

      // ── Why Free ──
      freeEyebrow: "免费边界",
      freeTitle: "无需服务器，无需续费。",
      freeBody:
        "Cloudflare 的免费额度对个人博客来说基本用不完。你只需要在第一天配置好，之后几乎不需要再管服务器、数据库和存储。",
      freeHighlights: [
        {
          icon: ServerIcon,
          label: "无需购买服务器",
          body: "运行在 Cloudflare Workers，免费额度每天 10 万次请求，个人博客基本用不完。",
        },
        {
          icon: GlobeIcon,
          label: "自带访问地址",
          body: "默认提供 *.workers.dev 子域名，适合测试。面向中国大陆读者时，建议绑定自己的域名；长期大量访问还要考虑备案。",
        },
        {
          icon: ShieldCheckIcon,
          label: "底层服务成熟",
          body: "Workers、D1、R2 都由 Cloudflare 托管，不需要自己维护 VPS、数据库实例和对象存储。",
        },
      ] as (FreeHighlight & { icon: LucideIcon })[],

      // ── Your Own Corner ──
      ownershipEyebrow: "内容所有权",
      ownershipTitle: "你的内容，真正属于你。",
      ownershipBody: "平台账号随时可以被封、内容随时可以被删除。个人站点是你真正拥有的互联网资产。",
      ownershipPoints: [
        {
          icon: LockKeyholeIcon,
          title: "不被平台控制",
          description:
            "平台可以限制你发什么、决定何时推送、甚至封号禁言。在自己的站点上，这些规则都是你定的。",
        },
        {
          icon: PencilIcon,
          title: "写你真正想写的",
          description:
            "发链接、留联系方式、评价竞品——在自己的博客里，这些都没有限制。不追热点，不讨好算法。",
        },
        {
          icon: Share2Icon,
          title: "一次写作，多平台同步",
          description: "在博客写完，用 multipost 等工具分发到各平台，文章永不失联",
        },
      ] as { title: string; description: string; icon: LucideIcon }[],

      // ── Core Features ──
      featuresEyebrow: "核心功能",
      featuresTitle: "全功能站点，不止步于静态页面。",
      featuresBody:
        "真正的数据库、真正的后台，评论和媒体管理全部内置，运行在 Cloudflare 免费额度上。",
      features: [
        {
          title: "可视化写作后台",
          description: "Markdown 编辑器、标签、封面、定时发布，全在 /admin 搞定。",
          icon: BookOpenIcon,
        },
        {
          title: "图床（R2 存储）",
          description:
            "用于图片、导入、导出和备份。开通通常需要绑定付款方式，小型个人站一般落在免费额度内。",
          icon: CloudIcon,
        },
        {
          title: "评论系统",
          description: "内置评论，不依赖第三方。支持审核、关键词拦截，也可接入 AI 自动审核。",
          icon: MessageSquareTextIcon,
        },
        {
          title: "AI 自由改造",
          description: "开源模板，用 Cursor / Claude Code 随时改主题、加功能，代码完全属于你。",
          icon: SparklesIcon,
        },
        {
          title: "多平台分发",
          description: "配合 multipost 把文章同步到公众号、知乎、小红书，博客是原点，平台是出口。",
          icon: Share2Icon,
        },
        {
          title: "导出与迁移",
          description: "文章、图片、评论、设置全部可导出，随时带走，不被锁死。",
          icon: ArchiveIcon,
        },
      ],

      obsidianEyebrow: "Git Markdown 写作流",
      obsidianTitle: "把 Obsidian 风格的 Markdown 发布成博客。",
      obsidianBody:
        "把选中的 Markdown / MDX 文件放进 content/notes，用 GitHub 或部署流程发布。只有带 publish: true 的文件会公开，并继续共用标签、RSS、评论和站内搜索。",
      obsidianCta: "阅读 Markdown 发布文档",
      obsidianPoints: [
        {
          title: "按你的目录写作",
          description:
            "文件放在 content/notes，目录结构随你安排。网站不按文件夹展示，只按标签和发布时间组织文章。",
          icon: FilesIcon,
        },
        {
          title: "图片自动上传",
          description:
            "支持 ![[image.png]] 和普通 Markdown 图片。能在 vault 中找到的图片会上传到 R2，并自动改写链接。",
          icon: ImageIcon,
        },
        {
          title: "Git 同步发布与隐藏",
          description:
            "部署同步会记录源文件路径和内容 hash。移除 publish: true 或删除文件后，站内文章会自动隐藏。",
          icon: GitBranchIcon,
        },
      ] satisfies FeatureItem[],

      // ── Automation ──
      skillEyebrow: "自动化初始化",
      skillTitle: "两种方式，把模板交给 AI 跑完整流程。",
      skillBody:
        "推荐安装 01mvp-blog Skill；不想安装也可以直接复制文档里的 Prompt。AI 负责创建 Cloudflare 资源、写配置、跑迁移和部署，你只在账号、域名和付款确认等环节手动处理。",
      setupPaths: [
        {
          title: "安装 01mvp-blog Skill",
          description:
            "适合长期使用。后续初始化命令、Cloudflare 资源创建和验收清单都可以跟着 Skill 更新。",
          cta: "查看安装步骤",
          icon: SparklesIcon,
        },
        {
          title: "复制 AI 建站 Prompt",
          description:
            "适合先快速体验。把完整 Prompt 发给 Codex、Claude Code 或 Cursor，让 AI 按同一套流程执行。",
          cta: "复制教程 Prompt",
          icon: FileTextIcon,
        },
      ] satisfies SetupPath[],
      skillSteps: [
        {
          number: "01",
          title: "安装 Cloudflare 插件",
          description: "在 Codex、Claude Code 或 Cursor 里连接 Cloudflare 账号，让 AI 能操作资源。",
        },
        {
          number: "02",
          title: "Fork 或 clone 模板",
          description: "使用 01MVP/blog-starter 作为起点，也可以让 AI 创建新的 GitHub 仓库。",
        },
        {
          number: "03",
          title: "让 AI 执行初始化",
          description: "自动创建 D1、KV、R2、Worker，写入配置，执行 migrations，部署上线。",
        },
        {
          number: "04",
          title: "处理少量人工确认",
          description:
            "登录 Cloudflare、确认付款方式、切换 nameserver、创建 OAuth 应用或验证邮件。",
        },
      ],

      // ── Merged quota (rendered inline, no heading needed) ──
      quotaEyebrow: "",
      quotaTitle: "",
      quotaBody: "",
      quotaItems: [
        {
          service: "Workers",
          quota: "10 万次请求 / 天",
          note: "个人博客日常远低于此上限。",
        },
        {
          service: "D1 数据库",
          quota: "5 GB + 500 万次读 / 天",
          note: "文章、评论、设置，够运营数年。",
        },
        {
          service: "R2 图床",
          quota: "10 GB，下载免费",
          note: "用于图片、导入、导出和备份；通常需先确认付款方式。",
        },
        {
          service: "KV 缓存",
          quota: "10 万次读 / 天，1 GB",
          note: "用于页面缓存加速。",
        },
      ],

      // ── Tech Stack ──
      techEyebrow: "技术栈",
      techTitle: "Cloudflare 原生 · 现代全栈 · AI 友好",
      techItems,

      // ── Theme ──
      themeEyebrow: "内置风格",
      themeTitle: "四套预设主题，随时用 AI 改造。",
      themeBody: "默认黑白极简。风格一键切换，或用 AI 工具改成任意风格。",
      themePreviews: [
        {
          themePreset: "maker",
          title: "黑白极简",
          description: "高对比、留白充足，适合技术文章和个人内容站。",
        },
        {
          themePreset: "apple",
          title: "苹果圆角",
          description: "蓝色主色、大圆角、柔和边框，适合产品文档。",
        },
        {
          themePreset: "editorial",
          title: "暖调人文",
          description: "橙米色调、人文感柔软，适合长文随笔。",
        },
        {
          themePreset: "brutalist",
          title: "野兽派",
          description: "粗边框、高反差，适合有态度的个人站点。",
        },
      ],

      // ── Content ──
      contentEyebrow: "博客",
      contentTitle: "最新文章",

      // ── Creator ──
      creatorEyebrow: "出品方",
      creatorTitle: "由 MakerJackie 持续维护。",
      creatorBody: "这里展示 01MVP 的 AI 建站方法、Jackie 的作品，以及可复用的 TanStack 全栈模板。",
      creatorPrimaryCta: "查看 TanStack 全栈模板",
      creatorSecondaryCta: "了解 Jackie",
      creatorSpotlights: [
        {
          title: "Jackie / MakerJackie",
          description:
            "独立开发者，前 AI 算法工程师，周周黑客松社区发起人，长期记录 AI 创作、产品实验和可复用模板。",
          href: "https://makerjackie.com",
          cta: "查看作品",
          icon: UserRoundIcon,
        },
        {
          title: "01MVP 实战手册",
          description: "从想法、MVP、上线到迭代，围绕真实交付整理 AI 产品实战方法。",
          href: "https://01mvp.com",
          cta: "访问 01MVP",
          icon: BookOpenIcon,
        },
        {
          title: "TanStack 全栈模板",
          description:
            "基于 TanStack Start 的全栈产品模板，适合用 AI 快速搭建 SaaS、工具站和可上线应用。",
          href: "https://01mvp.com/template",
          cta: "查看模板",
          icon: RocketIcon,
        },
      ] satisfies CreatorSpotlight[],
      poweredByLabel: "Powered by",
      creatorCreditLabel: "创作者",
    };
  }

  // ── English ──
  return {
    eyebrow: "Personal blog system · Cloudflare-hosted · automated deploy",
    heroTitle: "Build your permanent home on the internet",
    heroBody:
      "01mvp-blog-starter is a Cloudflare-native personal blog system. Writing dashboard, comments, image hosting, and RSS ship out of the box, and the setup flow can take it from configuration to live deploy.",
    primaryCta: "Start AI setup",
    secondaryCta: "View blog demo",

    // ── Why Free ──
    freeEyebrow: "Cost boundary",
    freeTitle: "No server. No renewal fees.",
    freeBody:
      "Cloudflare's free tier is effectively more than enough for a personal blog. Configure it on day one, then stop thinking about servers, databases, and storage.",
    freeHighlights: [
      {
        icon: ServerIcon,
        label: "No server required",
        body: "Runs on Cloudflare Workers — 100K free requests per day. A personal blog will never come close.",
      },
      {
        icon: GlobeIcon,
        label: "Built-in URL",
        body: "A free *.workers.dev subdomain is included for testing. For mainland China readers, bind your own domain; long-term high-volume access may need filing work.",
      },
      {
        icon: ShieldCheckIcon,
        label: "Mature infrastructure",
        body: "Workers, D1, and R2 are hosted by Cloudflare, so you do not maintain VPS, database, or object storage infrastructure.",
      },
    ] as (FreeHighlight & { icon: LucideIcon })[],

    // ── Your Own Corner ──
    ownershipEyebrow: "Content ownership",
    ownershipTitle: "Your content, truly yours.",
    ownershipBody:
      "Platform accounts can be suspended anytime. Content can be deleted without warning. A personal site is an internet asset you actually own.",
    ownershipPoints: [
      {
        icon: LockKeyholeIcon,
        title: "No platform control",
        description:
          "Platforms decide what you can post, when you get pushed, and when you get banned. On your own site, you set the rules.",
      },
      {
        icon: PencilIcon,
        title: "Write what you actually want",
        description:
          "Link out freely, share contact info, critique competitors — none of the restrictions that come with publishing on someone else's platform.",
      },
      {
        icon: Share2Icon,
        title: "Blog as hub, platforms as outlets",
        description:
          "Write once on your blog, then use multipost or AI to syndicate to each platform in its own voice.",
      },
    ] as { title: string; description: string; icon: LucideIcon }[],

    // ── Core Features ──
    featuresEyebrow: "Core features",
    featuresTitle: "A full dynamic publishing system for a living blog.",
    featuresBody:
      "Real database, real admin panel, built-in comments and media management — all on Cloudflare's free tier.",
    features: [
      {
        title: "Writing dashboard",
        description: "Markdown editor, tags, covers, scheduled publishing — all in /admin.",
        icon: BookOpenIcon,
      },
      {
        title: "Image hosting (R2)",
        description:
          "Images, imports, exports, and backups. Activation usually requires a payment method; small personal sites usually stay inside the free tier.",
        icon: CloudIcon,
      },
      {
        title: "Comments",
        description:
          "Self-hosted on D1. Moderation queue, Cloudflare Turnstile spam protection — no Disqus required.",
        icon: MessageSquareTextIcon,
      },
      {
        title: "AI-customizable",
        description:
          "Open-source template. Use Cursor, Claude Code, or any AI tool to restyle or extend it however you like.",
        icon: SparklesIcon,
      },
      {
        title: "Multi-platform distribution",
        description:
          "Use multipost to sync posts to other platforms. Your blog is the source; social channels are outlets.",
        icon: Share2Icon,
      },
      {
        title: "Export and migrate",
        description: "Posts, images, comments, and settings are all exportable. No lock-in.",
        icon: ArchiveIcon,
      },
    ],

    obsidianEyebrow: "Git Markdown workflow",
    obsidianTitle: "Publish Obsidian-style Markdown as blog posts.",
    obsidianBody:
      "Put selected Markdown / MDX files under content/notes and publish them through GitHub or your deploy flow. Only files with publish: true become public posts, and they still use tags, RSS, comments, and site search.",
    obsidianCta: "Read the Markdown guide",
    obsidianPoints: [
      {
        title: "Write in any folder structure",
        description:
          "Put files under content/notes and organize them however you like. The site ignores folders and groups public posts by tags and publish time.",
        icon: FilesIcon,
      },
      {
        title: "Image references are handled",
        description:
          "Supports ![[image.png]] and standard Markdown image links. Images found in the vault are uploaded to R2 and rewritten automatically.",
        icon: ImageIcon,
      },
      {
        title: "Git-backed publish and hide",
        description:
          "Deployment sync records source paths and content hashes. Remove publish: true or delete the source file, and the public post is hidden on the next sync.",
        icon: GitBranchIcon,
      },
    ] satisfies FeatureItem[],

    // ── Automation ──
    skillEyebrow: "Automated setup",
    skillTitle: "Give the template to AI in either of two ways.",
    skillBody:
      "Install the 01mvp-blog Skill for the best long-term flow, or copy the setup prompt from the docs. AI creates Cloudflare resources, writes config, runs migrations, and deploys; you only handle account, domain, and payment confirmations.",
    setupPaths: [
      {
        title: "Install the 01mvp-blog Skill",
        description:
          "Best for repeated use. Setup commands, Cloudflare provisioning, and verification checks can keep improving with the Skill.",
        cta: "Read install steps",
        icon: SparklesIcon,
      },
      {
        title: "Copy the AI setup prompt",
        description:
          "Best for quick trials. Paste the full prompt into Codex, Claude Code, or Cursor and let AI follow the same workflow.",
        cta: "Copy the prompt",
        icon: FileTextIcon,
      },
    ] satisfies SetupPath[],
    skillSteps: [
      {
        number: "01",
        title: "Install Cloudflare access",
        description:
          "Connect your Cloudflare account inside Codex, Claude Code, Cursor, or another AI coding agent.",
      },
      {
        number: "02",
        title: "Fork or clone the template",
        description:
          "Start from 01MVP/blog-starter, or let AI create a fresh GitHub repository for your blog.",
      },
      {
        number: "03",
        title: "Let AI initialize the site",
        description:
          "Creates D1, KV, R2, and Worker resources, writes config, runs migrations, and deploys.",
      },
      {
        number: "04",
        title: "Handle manual confirmations",
        description:
          "Cloudflare login, payment-method confirmation, nameservers, OAuth apps, or email verification.",
      },
    ],

    // ── Merged quota (rendered inline, no heading needed) ──
    quotaEyebrow: "",
    quotaTitle: "",
    quotaBody: "",
    quotaItems: [
      {
        service: "Workers",
        quota: "100,000 requests / day",
        note: "Personal blogs typically use a tiny fraction of this.",
      },
      {
        service: "D1 database",
        quota: "5 GB + 5M reads / day",
        note: "Posts, comments, settings — enough for years.",
      },
      {
        service: "R2 image storage",
        quota: "10 GB, free egress",
        note: "Images, imports, exports, and backups; payment-method confirmation is usually needed.",
      },
      {
        service: "KV cache",
        quota: "100K reads / day, 1 GB",
        note: "Page caching for faster load times.",
      },
    ],

    // ── Tech Stack ──
    techEyebrow: "Tech stack",
    techTitle: "Cloudflare-native · Modern full-stack · AI-friendly",
    techItems,

    // ── Theme ──
    themeEyebrow: "Built-in styles",
    themeTitle: "Four presets. Customize freely with AI.",
    themeBody:
      "Default is minimal monochrome. Switch presets in one line — or use your AI tool to build something entirely different.",
    themePreviews: [
      {
        themePreset: "maker",
        title: "Monochrome",
        description: "Pure black and white, sharp corners, maximum contrast for technical writing.",
      },
      {
        themePreset: "apple",
        title: "Apple Rounded",
        description: "Blue primary, larger radius, softer borders for calm product docs.",
      },
      {
        themePreset: "editorial",
        title: "Warm Editorial",
        description: "Warm cream-orange, soft and humanistic, for essays and reflective posts.",
      },
      {
        themePreset: "brutalist",
        title: "Brutalist",
        description: "Thick borders, high contrast, bold accent for expressive personal sites.",
      },
    ],

    // ── Content ──
    contentEyebrow: "Blog",
    contentTitle: "Latest posts",

    // ── Creator ──
    creatorEyebrow: "Made by",
    creatorTitle: "Maintained by MakerJackie.",
    creatorBody:
      "Explore 01MVP's AI website workflow, Jackie's projects, and the reusable TanStack full-stack template.",
    creatorPrimaryCta: "View TanStack template",
    creatorSecondaryCta: "Meet Jackie",
    creatorSpotlights: [
      {
        title: "Jackie / MakerJackie",
        description:
          "Independent developer, former AI algorithm engineer, founder of Hackathon Weekly, and publisher of AI product experiments and reusable templates.",
        href: "https://makerjackie.com",
        cta: "View projects",
        icon: UserRoundIcon,
      },
      {
        title: "01MVP handbook",
        description:
          "A practical guide from idea, MVP, launch, and feedback to the next product iteration.",
        href: "https://01mvp.com",
        cta: "Visit 01MVP",
        icon: BookOpenIcon,
      },
      {
        title: "TanStack full-stack template",
        description:
          "A TanStack Start full-stack product template for shipping SaaS apps, tools, and AI-built products.",
        href: "https://01mvp.com/template",
        cta: "View template",
        icon: RocketIcon,
      },
    ] satisfies CreatorSpotlight[],
    poweredByLabel: "Powered by",
    creatorCreditLabel: "Created by",
  };
}
