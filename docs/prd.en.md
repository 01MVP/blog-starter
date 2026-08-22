# 01mvp-blog-starter Product Requirements

[中文版本](./prd.md)

## 1. Positioning

Working name: `01mvp-blog-starter`

Canonical demo site:

```txt
blog.01mvp.com    # template demo
```

**01mvp-blog-starter is a Cloudflare-native personal publishing CMS.** Beginners can write in the admin UI. Developers and agents can publish and maintain the site through an AI Skill and OpenAPI.

The repository ships two products:

1. A reusable Cloudflare-native blog CMS template
2. An AI Skill that can initialize, deploy, and maintain a new site
3. One demo deployment at `blog.01mvp.com`

## 2. Base Template

Primary starter: [mugnavo/tanstarter-plus](https://github.com/mugnavo/tanstarter-plus)

It is a Vite+ / pnpm monorepo with React 19, React Compiler, TanStack Start / Router / Query / Form, Drizzle, Better Auth, Tailwind CSS, shadcn/ui, and Base UI.

Blog-feature reference (not the architecture base): [mohamede1945/tanstack-start-blog](https://github.com/mohamede1945/tanstack-start-blog) for public blog structure, RSS, SEO, OG, and Cloudflare deploy notes.

Runtime target: TanStack Start + Cloudflare Workers + D1 + R2.

## 3. Goals

The CMS should let a person:

1. Write, upload images, and publish from an admin UI
2. Publish through Markdown, HTML, or OpenAPI
3. Initialize, deploy, and maintain a site with an AI Skill
4. Export, import, and back up content without editor lock-in
5. Get a modern public blog: SEO, OG, RSS, sitemap, tags, search, comments
6. Get a lightweight CMS: posts, media, comments, site settings, import/export
7. Stay inside Cloudflare's free tier for core publishing
8. Treat email as an optional paid enhancement

Out of scope for v1: multi-tenant SaaS, theme marketplace, complex permissions, large media DAM, multi-author collaboration, WordPress-style plugins, high-concurrency community, payments/membership.

## 4. Design Principles

### Cloudflare-native

Prefer Cloudflare primitives: Workers, D1, R2, Cache / KV, Turnstile, optional Queues, optional Email Service, Wrangler / Cloudflare API / Cloudflare skills.

### Markdown-first, CMS-first

Markdown is the authoring format. D1 is the system of record for posts, comments, settings, users, and API tokens. R2 stores images, import packages, and backups. Git-managed Fumadocs is a second surface for product docs, not the blog store.

### AI automation first

The Skill is an agent workflow, not a human tutorial. Prefer automatic execution, then Cloudflare skills / Wrangler / API, then user authorization, then a Dashboard fallback.

Humans only intervene for login, OAuth, terms, paid-plan confirmation, API tokens, DNS, domain binding, and email/domain verification.

### Free core, paid extras

The free core must deploy, log in, write posts, upload images, moderate comments, serve RSS and sitemap, import/export, and expose OpenAPI. Email Sending is optional.

## 5. Roles

- **Admin**: posts, assets, comments, site settings, API tokens, import/export, backups, theme
- **Visitor**: read posts/tags, search, RSS, comment
- **API client / AI agent**: scoped token operations for posts, assets, import, export, comments, backups
- **Skill runner**: project init, Cloudflare resources, deploy, verify, first post, maintenance commands

## 6. Architecture

Stack: tanstarter-plus, TanStack Start / Router, Tailwind + shadcn/ui + Base UI, pnpm, Vite+, Cloudflare Workers, D1, Drizzle, R2, Better Auth, MDXEditor, Markdown pipeline, Turnstile, OpenAPI, `skills/01mvp-blog`.

Implemented layout (some originally planned packages were folded into `apps/web`):

```txt
apps/web          public site, admin, docs, API, Worker
packages/core     types, seed data, Markdown, i18n helpers
packages/db       Drizzle schema and D1 migrations
packages/auth     Better Auth factory
packages/ui       shared primitives
skills/01mvp-blog agent workflow
docs/             PRD and internal specs
```

## 7. Product Requirements

### Public blog

Home, `/blog` list with pagination/search/tags, `/blog/:slug` with TOC, related posts, comments, `/tags`, `/series`, `/about`, RSS, sitemap, robots.

Content supports Markdown, sanitized HTML, code highlighting, tables, images, video embeds, quotes, and callouts.

### Admin CMS (`/admin`)

Email/password session login by default. Optional email verification, password-reset email, and social login. Core login, admin creation, and password reset through the admin/OpenAPI path must work without Email Sending.

Post CRUD with statuses `draft | published | scheduled | archived | deleted`. MDXEditor is Markdown-first with source/preview, paste/drag image upload, tables, code, callouts.

Assets live in R2. Comments default to `pending` and can be approved, marked spam, or deleted. Site settings cover identity, navigation, comments, SEO, and theme/layout presets.

### Comments

Self-hosted on D1. Nickname + email + optional website + body. Email is not shown publicly. Nested replies (2 levels). Per-site and per-post comment switches. Anti-spam: Turnstile, IP limits, length/link limits, keyword filter. Email notices are optional.

### SEO / RSS / OG / sitemap

Per-post SEO title/description plus generated title, description, canonical, Open Graph, Twitter Card, and JSON-LD. Default OG image in v1; generated OG images later. `/rss.xml`, `/feed.xml`, `/sitemap.xml`, `/sitemap-posts.xml`, `/robots.txt`.

### Search

Phase 1: D1 LIKE / simple full-text. Later: FTS5 or an external service, still Cloudflare-first.

### Import / export

Markdown, HTML, and ZIP imports rewrite local images to R2. Export Markdown/HTML, assets, settings, comments, and a full ZIP backup.

### OpenAPI / tokens

`/openapi.json` plus scoped tokens: `posts:read/write/publish`, `assets:write`, `comments:moderate`, `site:read/write`, `export:read`.

## 8. AI Skill

Skill name: `01mvp-blog`.

It should initialize a site, provision Cloudflare resources, deploy, create the first admin and token, publish a first bilingual post, verify RSS/sitemap/OG, and leave an execution log. Users only handle account-owner steps.

Canonical verification target: `blog.01mvp.com`.

## 9. Roadmap

**Phase 1** — CMS loop: deploy, login, editor, public blog, comments, SEO/RSS/sitemap, without Email Sending.

**Phase 2** — Import/export, API tokens, OpenAPI publish/import/export/backup/moderation.

**Phase 3** — Optional email notices, password-reset email, scheduled backups to R2.

**Phase 4** — End-to-end Skill reproduction of a generated site.

## 10. Acceptance

Ship:

1. GitHub repo `01MVP/blog-starter`
2. Demo site `blog.01mvp.com`
3. This PRD plus specs under `docs/specs`
4. Skill package `skills/01mvp-blog`

Prove both:

1. The template is a runnable, deployable, writable, commentable, importable, exportable, automatable Cloudflare-native personal blog CMS
2. After installing the Skill, an agent can create a new independent reachable blog from the template

## 11. Task Summary

Build 01mvp-blog-starter on tanstarter-plus, with Cloudflare Workers + D1 + R2, MDXEditor, admin CMS, public blog, comments, SEO/RSS/sitemap, import/export, OpenAPI, and `skills/01mvp-blog`. Email is a Phase 3 optional extra. License: MIT. Canonical demo: `https://blog.01mvp.com`.
