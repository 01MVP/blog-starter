import { authQueryOptions } from "@repo/auth/tanstack/queries";
import { localizeSiteSettings } from "@repo/core";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { redirectForRole, safeAccountRedirectPath } from "#/lib/account-routing";
import { $getSiteSettingsPageData, type SiteSettingsPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { getServerAuthUser } from "#/lib/route-auth";

export const Route = createFileRoute("/_guest")({
  validateSearch: (search): { redirectTo?: string } => {
    const redirectTo = safeAccountRedirectPath(search.redirectTo);

    return redirectTo === "/app" ? {} : { redirectTo };
  },
  beforeLoad: async ({ context, search }) => {
    // Redirect path when user is already present,
    // or after successful login/signup
    const REDIRECT_URL = safeAccountRedirectPath(search.redirectTo);
    const serverUser = await getServerAuthUser();

    if (serverUser !== undefined) {
      if (serverUser) {
        throw redirect({
          to: redirectForRole(serverUser, REDIRECT_URL),
        });
      }

      return {
        redirectUrl: REDIRECT_URL,
      };
    }

    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    });
    if (user) {
      throw redirect({
        to: redirectForRole(user, REDIRECT_URL),
      });
    }

    return {
      redirectUrl: REDIRECT_URL,
    };
  },
  loader: (): Promise<SiteSettingsPageData> => $getSiteSettingsPageData(),
  component: RouteComponent,
});

function RouteComponent() {
  const { siteSettings } = Route.useLoaderData();
  const localizedSiteSettings = localizeSiteSettings(siteSettings, getCurrentLocale());

  return (
    <div
      data-theme-preset={localizedSiteSettings.themePreset}
      data-layout-preset={localizedSiteSettings.layoutPreset}
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10"
    >
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
