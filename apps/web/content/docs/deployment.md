---
title: Deployment
description: Publish your blog to the internet.
---

## What is "deployment"

**Deployment = uploading your website to the internet so anyone in the world can visit it via a URL.**

Think of it this way: you've written a book on your computer. "Deploying" is like shipping that book to a bookstore shelf so readers can find it. Before deployment, the website only exists on a developer's computer — no one else can see it.

## Where your website lives: Cloudflare

Your website runs on **Cloudflare's** servers.

| Question            | Answer                                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| What is Cloudflare? | A publicly-traded US company, one of the world's largest internet infrastructure providers                              |
| Why use it?         | Generous free tier, fast (servers worldwide), stable and reliable                                                       |
| Does it cost money? | Core blog usage usually stays in the free tier; R2 may require a payment method, and Email Sending requires a paid plan |

## The "infrastructure" your website needs

Your website is powered by three core components. Think of it like a restaurant:

| Component   | Analogy                                     | What it does                                                      |
| ----------- | ------------------------------------------- | ----------------------------------------------------------------- |
| **Workers** | Waitstaff                                   | Greets every visitor to your site and serves them the right page  |
| **D1**      | Filing cabinet with spreadsheets (database) | Stores your posts, comments, user info, and other structured data |
| **R2**      | Storage locker                              | Stores images you upload, backup files, etc.                      |

> There are also optional components (like KV caching and email sending) that don't affect core functionality. Enable them as needed.

## Deployment overview

From your perspective, deployment looks like this:

1. You write posts and adjust settings in the admin panel
2. A developer runs **one command** in their terminal, and the site is updated

The whole process usually takes less than a minute.

If you use [AI Setup](./ai-setup), the AI agent can also create D1, KV, R2, the Worker, DNS bindings, D1 migrations, and live verification. You only step in for Cloudflare login, payment-method confirmation, domain nameservers, OAuth apps, or email verification.

## What is "local development"

"Local development" means a developer **runs a copy of the website on their own computer** to test things. It's like a chef tasting a dish in the kitchen — only they can see it; customers don't know it's happening.

Local development is used to:

- Test new features before they go live
- Preview design changes
- Avoid breaking the live production site

---

## Developer Reference

> The following section is for the developer responsible for deploying and maintaining the site. If you're a product manager or site owner, you can skip this.

### Local development admin

Seed the local Wrangler D1 database with a fixed admin account:

```sh
pnpm db:seed:local-admin
```

Default local credentials:

```txt
email: a@a.test
password: 1
```

This command writes only to the local D1 database under `.wrangler/state`. It does not create a production admin account. Override defaults with `BLOGCMS_LOCAL_ADMIN_EMAIL`, `BLOGCMS_LOCAL_ADMIN_NAME`, or `BLOGCMS_LOCAL_ADMIN_PASSWORD`.

### Production deployment

This repository's `apps/web/wrangler.jsonc` is the live `blog.01mvp.com` demo. When you create your own site, copy `apps/web/wrangler.example.jsonc` to `apps/web/wrangler.jsonc`, then replace the D1 database id, KV namespace id, public site URL, and optional custom domain. The deploy command fails early if placeholders remain.

```sh
pnpm deploy:web
```

This command: checks R2 bucket → builds the web app → applies remote D1 migrations → deploys the Worker → syncs Git-managed notes (when `CMS_PUBLIC_SITE_URL` and `CMS_API_TOKEN` are configured).

If it reports a missing R2 bucket:

```sh
pnpm --filter @repo/web exec wrangler r2 bucket create blog-starter-assets --config wrangler.jsonc
```

### Runtime resources

```txt
Workers: public site, admin, API routes, feeds, sitemap, robots
D1: posts, comments, settings, users, sessions, tokens
R2: assets, import packages, exports, backups
KV: cache metadata and optional short-lived records
```

### Environment variables

Local development reads `apps/web/.env`. Production reads Wrangler vars plus secrets. Use `apps/web/wrangler.jsonc` as the source of truth for variable names.

Set production secrets:

```sh
pnpm --filter @repo/web exec wrangler secret put BETTER_AUTH_SECRET --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_ID --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GOOGLE_CLIENT_ID --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GOOGLE_CLIENT_SECRET --config wrangler.jsonc
```

### D1 Migrations

`pnpm deploy:web` applies remote D1 migrations automatically. Only run manually for custom pipelines or targeted maintenance:

```sh
pnpm --filter @repo/web exec wrangler d1 migrations apply <d1-database-name> --remote --config wrangler.jsonc
```

### Optional email sending

Cloudflare Email Sending is disabled by default (requires Workers Paid). Used for password resets, admin notifications, import/export notices, etc. Core functionality works fine without it.

### Social comment login

See the [Comments documentation](./comments) for GitHub/Google OAuth setup details.
