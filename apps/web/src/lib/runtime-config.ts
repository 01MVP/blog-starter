import "@tanstack/react-start/server-only";
import { env } from "cloudflare:workers";

const LOCAL_AUTH_SECRET = "blog-starter-local-dev-better-auth-secret-change-before-production";

export function getPublicSiteUrl(fallback = "") {
  return (env.CMS_PUBLIC_SITE_URL || env.VITE_BASE_URL || fallback).trim().replace(/\/$/, "");
}

export function getAuthBaseURL() {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BASE_URL?.trim() || "http://localhost:3000";
  }

  return env.VITE_BASE_URL || env.CMS_PUBLIC_SITE_URL;
}

export function getBetterAuthSecret() {
  const secret = env.BETTER_AUTH_SECRET?.trim();

  if (secret) {
    return secret;
  }

  if (import.meta.env.DEV) {
    return LOCAL_AUTH_SECRET;
  }

  return undefined;
}

export function getTurnstileSiteKey() {
  return env.VITE_TURNSTILE_SITE_KEY?.trim() || null;
}
