# 01mvp-blog-starter

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/01MVP/blog-starter)
[![Cloudflare deploy](https://github.com/01MVP/blog-starter/actions/workflows/cloudflare-deploy.yml/badge.svg)](https://github.com/01MVP/blog-starter/actions/workflows/cloudflare-deploy.yml)

[中文 README](./README.zh-CN.md)

01mvp-blog-starter is a Cloudflare-native personal publishing system with a Git-managed documentation system.

It ships with two content surfaces:

- `/blog` is powered by the publishing backend for posts, admin writing, comments, RSS, OpenAPI publishing, imports, exports, and backups.
- `/docs` is powered by Fumadocs and GitHub Markdown/MDX for product docs, developer docs, API guides, and template notes.

## Stack

- TanStack Start + TanStack Router
- React 19 + React Compiler
- Tailwind CSS + shadcn/ui
- Fumadocs for Git-managed documentation
- Paraglide.js for English and Chinese UI messages
- Cloudflare Workers via `@cloudflare/vite-plugin`
- Cloudflare D1 for posts, comments, settings, users, sessions, and API tokens
- Cloudflare R2 for assets, imports, exports, and backups
- Cloudflare KV for cache metadata and short-lived records

## Deploy To Cloudflare

Use the Deploy to Cloudflare button above to create and deploy your own copy from the public GitHub repository.

The button works for Workers applications. This repository is a pnpm monorepo, so the root package script is the deployment entrypoint:

```sh
pnpm deploy:web
```

This repository's `apps/web/wrangler.jsonc` is the live demo at `blog.01mvp.com`. Do not copy those D1, KV, or R2 ids into a new site.

When you fork the template, copy `apps/web/wrangler.example.jsonc` to `apps/web/wrangler.jsonc`, create your own D1 database, R2 bucket, and KV namespace, then replace the placeholders. The deploy script fails early while placeholder IDs or placeholder URLs remain. See [configuration](./docs/specs/configuration.md).

Required production secrets:

- `BETTER_AUTH_SECRET`: generate with `pnpm auth:secret`
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`: optional unless GitHub login is enabled
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: optional unless Google login is enabled

## Automatic Deploys

This repo includes a GitHub Actions workflow at `.github/workflows/cloudflare-deploy.yml`. Every push to `main` installs dependencies, builds the web app, applies D1 migrations to the remote database, and deploys the Worker to Cloudflare.

Add these GitHub repository secrets once:

```sh
gh secret set CLOUDFLARE_API_TOKEN --repo 01MVP/blog-starter --body "$CLOUDFLARE_API_TOKEN"
gh secret set CLOUDFLARE_ACCOUNT_ID --repo 01MVP/blog-starter --body "$CLOUDFLARE_ACCOUNT_ID"
```

The token needs permission to deploy Workers and manage the bound D1, R2, and KV resources used by `apps/web/wrangler.jsonc`.

## Local Development

```sh
pnpm install
pnpm dev:web
```

The local web app runs on `http://localhost:3000`.

Seed the local D1 database with a fixed admin account:

```sh
pnpm db:seed:local-admin
```

Default local credentials:

```txt
email: a@a.test
password: 1
```

## Build

```sh
pnpm build:web
```

The build compiles Paraglide output, builds TanStack Start, and writes the Cloudflare Worker bundle.

## Production Deploy

```sh
pnpm deploy:web
```

This checks the required R2 bucket, builds the web app, applies remote D1 migrations, deploys the Worker with the generated Cloudflare config, and runs the Git-managed notes sync when `CMS_PUBLIC_SITE_URL` and `CMS_API_TOKEN` are configured.

## Workspace

```txt
apps/web                 TanStack Start app, admin UI, public site, docs, API routes
packages/auth            Better Auth factory and TanStack helpers
packages/core            content types, demo data, Markdown and i18n helpers
packages/db              Drizzle schema and D1 migrations
packages/ui              shared UI primitives
skills                   AI initialization and OpenAPI maintenance Skill
apps/web/content/docs    public Fumadocs source, mirrored at docs/site
docs/prd.md              Chinese PRD; English translation in docs/prd.en.md
docs/specs               project specifications and release planning records
```

## Documentation

The public documentation source is `apps/web/content/docs`. It is rendered at `/docs` and `/zh/docs`.

Start with these guides:

- [AI Setup](./apps/web/content/docs/ai-setup.md)
- [Deployment](./apps/web/content/docs/deployment.md)
- [Comments](./apps/web/content/docs/comments.md)
- [Advanced configuration](./apps/web/content/docs/advanced-configuration.md)
- [API](./apps/web/content/docs/api.md)
- [Configuration](./docs/specs/configuration.md)
- [PRD (English)](./docs/prd.en.md) / [PRD (中文)](./docs/prd.md)

The root `docs/specs` folder is for project specifications, deployment records, acceptance notes, and release planning records. It is intentionally separate from the public Fumadocs source.

## Automation

The canonical blog Skill lives at `skills/01mvp-blog/SKILL.md`.

Check that the Skill is discoverable from the GitHub repository:

```sh
npx skills@latest add 01MVP/blog-starter --list
```

Install it for Codex in this project:

```sh
npx skills@latest add 01MVP/blog-starter --skill 01mvp-blog --agent codex --yes
```

Replace `codex` with another lowercase agent id when installing for a different agent.

Use the `01mvp-blog` Skill for site creation and OpenAPI-based maintenance. Cloudflare provisioning still needs Cloudflare-capable agent skills or tooling. Generated sites expose `/openapi.json`; create scoped API tokens in the admin settings before wiring external automation.

If you do not want to install the Skill, copy the prompt in [AI Setup](./apps/web/content/docs/ai-setup.md) into your AI agent. The Skill is still recommended because setup commands, Cloudflare provisioning, and verification checks can be updated over time.

## License

MIT. See [LICENSE](./LICENSE).
