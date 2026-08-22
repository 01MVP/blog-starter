import "@tanstack/react-start/server-only";
import { localizeSiteSettings, parseJson, type SupportedLocale } from "@repo/core";
import * as schema from "@repo/db/schema/cms";
import { eq } from "drizzle-orm";

import { cachedGet, invalidateCache } from "./cms-cache";
import {
  type SiteSettingsInput,
  normalizeSiteSettings,
  runtimeDefaultSiteSettings,
} from "./cms-d1-shared";
import { getCmsDb } from "./cms-db";

const siteSettingsKey = "site";

export async function getD1SiteSettings(locale?: SupportedLocale) {
  const settings = await cachedGet("site:settings", () =>
    readD1SiteSettings().catch(() => runtimeDefaultSiteSettings()),
  );

  return locale ? localizeSiteSettings(settings, locale) : settings;
}

async function readD1SiteSettings() {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.siteSettings)
    .where(eq(schema.siteSettings.key, siteSettingsKey))
    .limit(1);
  const row = rows[0];

  return normalizeSiteSettings(parseStoredSiteSettings(row?.value));
}

export async function updateD1SiteSettings(input: SiteSettingsInput) {
  const current = await getD1SiteSettings();
  const settings = normalizeSiteSettings(input, current);
  const now = new Date().toISOString();

  const db = getCmsDb();
  await db
    .insert(schema.siteSettings)
    .values({ key: siteSettingsKey, value: settings, updatedAt: now })
    .onConflictDoUpdate({
      target: schema.siteSettings.key,
      set: { value: settings, updatedAt: now },
    });

  await invalidateCache("site:settings", "sitemap:paths");

  return settings;
}

function parseStoredSiteSettings(value: unknown): SiteSettingsInput {
  if (typeof value === "string") {
    return parseJson<SiteSettingsInput>(value) ?? {};
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as SiteSettingsInput;
  }

  return {};
}
