# Configuration

This repository is both the reusable template and the live demo at `https://blog.01mvp.com`. Keep those two roles separate when you change config.

## Surfaces

| Surface                           | What it stores                                                      | Who edits it                |
| --------------------------------- | ------------------------------------------------------------------- | --------------------------- |
| `apps/web/wrangler.jsonc`         | Live demo Worker name, custom domain, D1/R2/KV ids, public URL vars | 01MVP maintainers only      |
| `apps/web/wrangler.example.jsonc` | Placeholder Worker config for a new site                            | Copy this when forking      |
| `apps/web/.dev.vars`              | Local secrets (`BETTER_AUTH_SECRET`, OAuth, Turnstile, Resend)      | Each developer              |
| D1 `site_settings`                | Blog name, theme, layout, comments, SEO copy                        | Admin UI or `PUT /api/site` |
| `apps/web/messages/{en,zh}.json`  | Compiled UI strings (Paraglide)                                     | Code change + rebuild       |
| `apps/web/content/docs`           | Public Fumadocs source                                              | Git                         |

`pnpm deploy:web` refuses to ship placeholder URLs (`your-domain.example`, `example.com`) or all-zero D1/KV ids.

## Forking

1. Copy `apps/web/wrangler.example.jsonc` to `apps/web/wrangler.jsonc`.
2. Create D1, R2, and KV in the target Cloudflare account.
3. Replace the placeholder database id, KV id, Worker name, and `CMS_PUBLIC_SITE_URL` / `VITE_BASE_URL`.
4. Put secrets in the Cloudflare dashboard or `apps/web/.dev.vars` for local work. Start from `apps/web/.dev.vars.example`.
5. Generate `BETTER_AUTH_SECRET` with `pnpm auth:secret`.
6. Deploy with `pnpm deploy:web`.

Do not reuse the demo D1, KV, or R2 ids from this repository.

## Runtime URLs

Three values can represent the public origin:

- Wrangler `VITE_BASE_URL` — auth callback base and local Vite origin
- Wrangler `CMS_PUBLIC_SITE_URL` — canonical public site URL
- D1 `site_settings.url` — editable site URL shown in feeds and metadata

Server code reads them through `apps/web/src/lib/runtime-config.ts`. Prefer setting the two Wrangler vars to the same production origin, then let admin site settings override display copy.

## Optional integrations

All of these are off until configured. Core publishing works without them.

- Email: Cloudflare Email Service binding `CMS_EMAIL` or Resend (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`)
- GitHub / Google OAuth
- Turnstile (`VITE_TURNSTILE_SITE_KEY` + `CMS_TURNSTILE_SECRET_KEY`)
- Git notes sync after deploy (`CMS_API_TOKEN`, `OBSIDIAN_NOTES_DIR`)

See the public [Advanced configuration](../../apps/web/content/docs/advanced-configuration.md) guide for binding snippets.
