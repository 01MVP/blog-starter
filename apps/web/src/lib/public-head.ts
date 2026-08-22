import { localizeSiteSettings, type SiteSettings } from "@repo/core";

import { getCurrentLocale } from "#/lib/i18n";

export function publicSiteHead(siteSettings?: SiteSettings | null) {
  const locale = getCurrentLocale();
  const localized = siteSettings ? localizeSiteSettings(siteSettings, locale) : null;

  if (!localized) {
    return { meta: [] as Array<Record<string, string>> };
  }

  const ogImage = localized.defaultOgImage.trim() || "/og-default.svg";

  return {
    meta: [
      {
        title: localized.name,
      },
      {
        name: "description",
        content: localized.description,
      },
      {
        property: "og:title",
        content: localized.name,
      },
      {
        property: "og:description",
        content: localized.description,
      },
      {
        property: "og:image",
        content: ogImage,
      },
      {
        name: "robots",
        content: localized.indexingEnabled ? "index,follow" : "noindex,nofollow",
      },
    ],
  };
}
