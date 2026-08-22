import "@tanstack/react-start/server-only";
import { createBlogAuth } from "@repo/auth/auth";
import { createAuthDb } from "@repo/db";
import { env } from "cloudflare:workers";

import { getAuthBaseURL, getBetterAuthSecret } from "#/lib/runtime-config";

const database = env.CMS_DB as Parameters<typeof createAuthDb>[0];

export const auth = createBlogAuth(createAuthDb(database), {
  baseURL: getAuthBaseURL(),
  githubClientId: env.GITHUB_CLIENT_ID,
  githubClientSecret: env.GITHUB_CLIENT_SECRET,
  googleClientId: env.GOOGLE_CLIENT_ID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET,
  secret: getBetterAuthSecret(),
});
