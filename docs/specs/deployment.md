# Deployment

Canonical production target:

- Production site: `https://blog.01mvp.com`

## Prerequisites

- Node.js 24+
- pnpm 11+
- Vite+ `vp`
- Wrangler authenticated against the target Cloudflare account

## Cloudflare Resources

- Worker: `blog-starter`
- D1: `blog-starter-cms`, id `b267c97c-72a5-45a1-9f5a-cfd0b8e8067c`
- R2 storage: `blog-starter-assets`
- KV: `CMS_CACHE`, id `c1150cc286374ba9919f48f48a985f36`
- Backup retention: 30 days
- Wrangler config: `apps/web/wrangler.jsonc`
- Current verified version: `bd7113d3-4755-4c3c-82fb-c78e2531af58`
- Email Sending: disabled by default
- Password reset TTL: 30 minutes

R2 must be enabled on the target Cloudflare account before this bucket can be
created. New accounts may need to complete the R2 subscription checkout and add
a valid payment method because R2 uses usage-based billing with a free monthly
allowance.

Deploy commands run `scripts/check-r2-buckets.mjs` before building. The preflight
uses Wrangler to list R2 buckets and fails early when `blog-starter-assets` is
missing from the target account. Create the missing bucket with:

```sh
pnpm --filter @repo/web exec wrangler r2 bucket create blog-starter-assets --config wrangler.jsonc
```

The app uses one R2 bucket by default. Object prefixes keep responsibilities
separate: `uploads/` for public assets, `imports/` for import packages, and
`exports/` for JSON/ZIP backups.

## Migrations

```sh
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-starter-cms --remote
```

The remote databases have applied:

- `0001_cloud_blog_cms.sql`
- `0002_better_auth_d1.sql`
- `0003_pages_projects_management.sql`
- `0004_comment_moderation.sql`
- `0005_drop_projects.sql`
- `0006_drop_legacy_auth_tables.sql`
- `0007_drop_pages.sql`
- `0008_post_series.sql`
- `0009_user_comment_status.sql`
- `0010_analytics_events.sql`
- `0011_server_settings.sql`
- `0012_email_subscriptions.sql`
- `0013_comment_reply_notifications.sql`
- `0014_post_sources.sql`
- `0015_repair_weekly_blog_update_runs.sql`
- `0016_comment_ai_moderation_audit.sql`

## Build And Deploy

Production:

```sh
pnpm deploy:web
```

`pnpm deploy:web` runs the matching Vite+ build, applies remote D1 migrations, and deploys with the generated Cloudflare Vite config. The underlying commands remain available for targeted maintenance:

```sh
pnpm build:web
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-starter-cms --remote --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler deploy --config dist/server/wrangler.json
```

The Cloudflare Vite plugin writes the effective deploy config into `apps/web/dist/server/wrangler.json`. Wrangler must use that generated config so the production bindings, assets, and custom domain are deployed together.

Because the custom domain is configured in Wrangler, use `https://blog.01mvp.com` for verification.

Wrangler uses `apps/web/src/server.ts` as the Worker entry. It delegates HTTP requests to TanStack Start. Backups are manual through `/admin/settings` or `POST /api/backups`.

## Social Comment Login

Create GitHub and Google OAuth apps/clients and set callback URLs for each environment:

```txt
http://localhost:3000/api/auth/callback/github
http://localhost:3000/api/auth/callback/google
https://blog.01mvp.com/api/auth/callback/github
https://blog.01mvp.com/api/auth/callback/google
```

Store the auth secret and each enabled OAuth provider value with Wrangler:

```sh
pnpm --filter @repo/web exec wrangler secret put BETTER_AUTH_SECRET --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_ID --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GOOGLE_CLIENT_ID --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GOOGLE_CLIENT_SECRET --config wrangler.jsonc
```

For local development, set `BETTER_AUTH_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` in `apps/web/.env`. Email/password login works without either OAuth provider.

## Optional Email Sending

Email is disabled by default. To enable comment, import, export, backup, and password reset notifications, set:

```jsonc
{
  "vars": {
    "CMS_EMAIL_SENDING_ENABLED": "true",
    "CMS_EMAIL_FROM": "noreply@example.com",
    "CMS_EMAIL_TO": "admin@example.com",
    "CMS_PASSWORD_RESET_TTL_MINUTES": "30",
  },
  "send_email": [
    {
      "name": "CMS_EMAIL",
      "allowed_sender_addresses": ["noreply@example.com"],
    },
  ],
}
```

The sender address and domain must be verified in Cloudflare Email Service before production mail is sent.

Email Sending is a paid optional feature. Cloudflare's current pricing requires Workers Paid for outbound Email Sending, includes 3,000 outbound emails per month, and bills additional outbound email at $0.35 per 1,000 emails. Email Routing inbound forwarding is unlimited.

Resend can be used for outbound email by setting `RESEND_API_KEY` and `RESEND_FROM_EMAIL` instead of the Cloudflare `send_email` binding. `CMS_EMAIL_FROM` is also accepted as the Resend sender fallback.

Email verification remains disabled by default. It can be enabled from `/admin/settings` only when Cloudflare Email Sending or Resend is configured. The free core keeps social OAuth, email/password login, direct admin password reset, publishing, comments, moderation, imports, exports, and backups usable without outbound email.

Operational limits to account for before enabling production email:

- new accounts may initially send only to verified email addresses in the Cloudflare account
- paid accounts can send to arbitrary recipients, subject to daily sending limits
- one email can include up to 50 total `to`, `cc`, and `bcc` recipients
- one email can be up to 5 MiB including attachments
- Workers binding sends are also constrained by standard Workers CPU, subrequest, and memory limits

The `blog.01mvp.com` deployment uses Cloudflare Email Sending with `CMS_EMAIL_FROM=noreply@01mvp.com`, `CMS_EMAIL_TO=contact@01mvp.com`, and a `CMS_EMAIL` binding restricted to that sender.
