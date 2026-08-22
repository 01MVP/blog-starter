---
name: 01mvp-blog
description: Create, deploy, verify, and maintain a 01mvp-blog-starter site. Orchestrate GitHub setup, Cloudflare provisioning, deployment, first admin setup, and OpenAPI-based maintenance.
---

# 01mvp-blog Skill

Use this Skill when creating a new personal blog from the 01mvp-blog-starter template, validating that a generated site matches the template contract, or maintaining an existing site through its OpenAPI API.

## Dependency Skills

For Cloudflare account, resource, DNS, and deployment work, use the relevant Cloudflare skills, plugin, connector, MCP tools, Wrangler CLI, or Cloudflare API already available in the agent environment. Prefer the comprehensive Cloudflare skill plus Wrangler and Workers best-practices guidance when present.

This Skill owns the end-to-end blog workflow. Do not tell the user to manually create D1, KV, R2, Workers, DNS routes, or run migrations when the available tools can do it. Ask the user to act only for browser-only or account-owner steps such as login, account registration, payment-method confirmation, domain purchase, nameserver changes, OAuth app creation, and email verification.

## Install And Load

Verify that the Skill can be discovered from the GitHub repository:

```sh
npx skills@latest add 01MVP/blog-starter --list
```

Install it for Codex in the current project:

```sh
npx skills@latest add 01MVP/blog-starter --skill 01mvp-blog --agent codex --yes
```

Use lowercase agent ids such as `codex`, `cursor`, or `gemini-cli` when installing for a specific agent. After installation, ask the agent to use the `01mvp-blog` Skill when creating a site, validating a generated site, or maintaining an existing blog through OpenAPI.

## Inputs To Collect

Ask for missing values only when they are not already provided:

- Project name
- Blog name
- Blog description
- Author name
- Author email
- Primary language: `en` or `zh`
- Domain, or confirmation to start with `*.workers.dev`
- Theme preset: `maker`, `apple`, `editorial`, or `brutalist`
- Layout preset: `shelf`, `developer`, or `journal`
- Comments enabled
- Email Sending enabled; clarify that it is optional and currently requires Workers Paid
- R2 enabled; clarify that it is needed for images, imports, exports, and backups, and may require a payment method before activation
- GitHub Actions enabled

For maintenance-only tasks, collect only:

- Site URL
- Scoped API token, or confirmation that the user will create one in the admin settings
- The requested operation: publish, update, import, upload, moderate comments, export, backup, or update settings
- Local content paths or payload details when needed

## Create Blog Workflow

1. Check local prerequisites with `scripts/check-prereqs.sh`.
2. Create or clone the project from the template.
3. Write site config from `templates/site.config.json`.
4. Keep `locales: ["en", "zh"]`, `primaryLanguage`, and `i18nRuntime: "paraglide-js"` in generator config. Site settings use `i18n` for localized text fields.
5. Confirm Cloudflare access. If a Cloudflare plugin, connector, MCP tool, or Wrangler login is missing, guide the user through installing or authorizing it, then continue.
6. Create or select Cloudflare resources:
   - Worker for the web app
   - D1 database for posts, comments, settings, users, sessions, and tokens
   - KV namespace for cache metadata and short-lived records
   - R2 bucket for images, imports, exports, and backups when R2 is enabled
7. If R2 cannot be activated because the account needs a payment method, ask the user to confirm the payment method or explicitly choose a reduced setup. Reduced setup must document that image upload, import, export, and ZIP backups are affected.
8. Generate required secrets, copy `apps/web/wrangler.example.jsonc` to `apps/web/wrangler.jsonc` when creating a new site, fill in the real D1/KV/R2/URL values, and apply D1 migrations. Never reuse the demo resource IDs from this repository's live `wrangler.jsonc`.
9. Deploy the Worker.
10. Bind the custom domain when provided. If the domain is not on Cloudflare, ask the user to complete domain purchase, zone setup, nameserver changes, or route confirmation.
11. Verify that the deployed Worker and custom domain route match the selected target.
12. Create the first admin user through the deployed API or admin UI.
13. Create a scoped API token from the admin settings, or create it through `POST /api/tokens` when an authenticated admin session is available.
14. Store the API token securely outside the repository.
15. Push settings through `PUT /api/site`.
16. Publish the first bilingual post through `POST /api/posts`.
17. Upload a media asset through `POST /api/assets` when R2 is enabled.
18. Submit a public comment and approve it through `POST /api/comments/:id/approve` when comments are enabled.
19. If Email Sending is enabled, request a password reset email. If it is disabled, verify that email verification, password-reset email, and notification copy do not block core publishing.
20. Export the site through `GET /api/export` and create a ZIP backup through `POST /api/backups` when R2 is enabled.
21. Verify public page, post page, admin login, RSS, sitemap, robots, OpenAPI, OG metadata, localized post API response, D1 data, R2 asset when enabled, JSON export, and ZIP backup when enabled.
22. Save an execution log for the generated site.

## Maintain Blog Workflow

1. Fetch `${siteUrl}/openapi.json` and use it as the source of truth for endpoints, request bodies, and scopes.
2. Use the scoped API token in the `Authorization: Bearer <token>` header.
3. Prefer the smallest scope set for the task:
   - Read or update posts: `posts:read`, `posts:write`
   - Publish or schedule posts: add `posts:publish`
   - Upload assets: `assets:write`
   - Moderate comments: `comments:moderate`
   - Read or update site settings: `site:read`, `site:write`
   - Export or create backups: `export:read`
4. For missing tokens, guide the user to create one in the admin settings under API tokens. If an authenticated admin session is available, `POST /api/tokens` may create the token.
5. Use these OpenAPI paths for common work:
   - `GET /api/posts`, `POST /api/posts`, `PATCH /api/posts/:id`, `DELETE /api/posts/:id`
   - `POST /api/import/markdown`, `POST /api/import/html`, `POST /api/import/zip`
   - `GET /api/assets`, `POST /api/assets`, `DELETE /api/assets/:id`
   - `GET /api/comments`, `POST /api/comments/:id/approve`, `POST /api/comments/:id/spam`, `POST /api/comments/:id/delete`
   - `GET /api/site`, `PUT /api/site`
   - `GET /api/export`, `POST /api/backups`
6. Return the changed resource URLs, ids, status, and any follow-up manual steps.

## I18n Contract

- Use Paraglide.js compiled messages from `apps/web/messages/{locale}.json`; do not replace it with i18next or next-intl.
- The generated site must support `en` and `zh` by default.
- The selected primary language controls initial site settings, feed copy, demo post defaults, and admin settings.
- The selected theme preset is saved as `themePreset` in site settings and applied through shared UI tokens.
- The selected layout preset is saved as `layoutPreset` in site settings and applied to the public home page. Use `maker` + `shelf` as the default combination.
- Public product introduction copy should include both English and Chinese.
- Blog content records should keep bilingual fields so switching language changes titles, excerpts, body HTML, tags, comments, and metrics.

## User Intervention Points

Ask the user to act only for Cloudflare login, account registration, Cloudflare account selection, payment-method confirmation, domain purchase, nameserver changes, OAuth app creation, email verification, first admin account creation, or API token creation when no authenticated session is available.

If the user targets mainland China readers, recommend a custom domain instead of relying only on `*.workers.dev`, because the default Workers domain is often unavailable or unreliable there. For long-term public operation, high traffic, or commercial usage in mainland China, remind the user to handle domain, access, and compliance requirements separately.

## Canonical Target

This repository's production site uses:

```txt
blog.01mvp.com
```

The Skill run must show that the site came from this workflow rather than manual setup. Use `examples/execution-log.md` as the evidence format.
