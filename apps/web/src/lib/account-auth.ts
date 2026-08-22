import "@tanstack/react-start/server-only";
import { authErrorMessage, extractSetCookieHeaders, type CmsUser, type UserRole } from "@repo/core";
import { env } from "cloudflare:workers";

import { redirectForRole } from "#/lib/account-routing";
import { auth } from "#/lib/auth";
import { callAuthEndpoint, readAuthPayload } from "#/lib/auth-endpoint";
import { getSetCookieValues } from "#/lib/auth-helpers";
import { getCmsUserById } from "#/lib/cms-users";
import { loginCommentUser, signupCommentUser } from "#/lib/comment-auth";
import {
  isSocialProviderConfigured,
  socialProviderDisplayName,
  type SocialProviderEnv,
} from "#/lib/social-providers";

type SocialSignInPayload = {
  url?: string;
  message?: string;
  error?: string;
  code?: string;
};

type AccountSocialProvider = "github" | "google";

export type AccountUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt: string | null;
};

type AccountAuthResult =
  | {
      data: AccountUser;
      headers: Headers;
    }
  | {
      error: string;
    };

type AccountSignupResult = AccountAuthResult | { verificationRequired: true };

export async function getAccountUserFromRequest(
  request: Request,
  query?: {
    disableCookieCache?: boolean;
    disableRefresh?: boolean;
  },
) {
  const { user } = await getAccountSessionFromRequest(request, query);
  return user;
}

export async function getAccountSessionFromRequest(
  request: Request,
  query?: {
    disableCookieCache?: boolean;
    disableRefresh?: boolean;
  },
) {
  const session = await auth.api.getSession({
    headers: request.headers,
    query,
    returnHeaders: true,
  });
  const headers = extractSessionHeaders(session.headers);

  if (!session.response?.user?.id) {
    return { headers, user: null };
  }

  const user = await getCmsUserById(session.response.user.id);

  return { headers, user: user ? publicAccountUser(user) : null };
}

export async function loginAccount(
  input: { email?: string; password?: string },
  request: Request,
): Promise<AccountAuthResult> {
  const result = await loginCommentUser(input, request);

  if ("error" in result) {
    return { error: result.error ?? "Login failed" };
  }

  const user = await getCmsUserById(result.data.id);

  if (!user) {
    return { error: "Account could not be loaded" } as const;
  }

  return {
    data: publicAccountUser(user),
    headers: result.headers,
  } as const;
}

export async function logoutAccount(request: Request) {
  const response = await callAuthEndpoint("/api/auth/sign-out", {}, request);

  return {
    headers: extractSetCookieHeaders(response),
  };
}

export async function signupAccount(
  input: {
    email?: string;
    emailPreference?: unknown;
    name?: string;
    password?: string;
  },
  request: Request,
): Promise<AccountSignupResult> {
  const result = await signupCommentUser(input, request);

  if ("error" in result) {
    return { error: result.error ?? "Signup failed" };
  }

  if ("verificationRequired" in result) {
    return { verificationRequired: true } as const;
  }

  const user = await getCmsUserById(result.data.id);

  if (!user) {
    return { error: "Account could not be loaded" } as const;
  }

  return {
    data: publicAccountUser(user),
    headers: result.headers,
  } as const;
}

export async function redirectToAccountSocialLogin(
  provider: AccountSocialProvider,
  request: Request,
) {
  if (!isSocialProviderConfigured(provider, env as SocialProviderEnv)) {
    return {
      error: `${socialProviderDisplayName(provider)} login is not configured`,
      status: 503,
    } as const;
  }

  const url = new URL(request.url);
  const redirectTo = safeRedirectPath(url.searchParams.get("redirectTo") ?? "/app");
  const callbackURL = new URL("/api/account/login/social/complete", request.url);
  const errorCallbackURL = new URL("/login", request.url);

  callbackURL.searchParams.set("redirectTo", redirectTo);
  errorCallbackURL.searchParams.set("error", "1");

  const response = await callAuthEndpoint(
    "/api/auth/sign-in/social",
    {
      callbackURL: callbackURL.toString(),
      errorCallbackURL: errorCallbackURL.toString(),
      provider,
    },
    request,
  );
  const payload = await readAuthPayload<SocialSignInPayload>(response);

  if (!response.ok || !payload?.url) {
    return {
      error: authErrorMessage(payload, `${socialProviderDisplayName(provider)} login failed`),
    } as const;
  }

  return {
    data: payload.url,
    headers: extractSetCookieHeaders(response),
  } as const;
}

export async function completeAccountSocialLogin(request: Request) {
  const url = new URL(request.url);
  const redirectTo = safeRedirectPath(url.searchParams.get("redirectTo") ?? "/app");
  const user = await getAccountUserFromRequest(request);

  if (!user) {
    return {
      error: "Login failed",
      headers: new Headers(),
    } as const;
  }

  return {
    data: redirectForRole(user, redirectTo),
    headers: new Headers(),
  } as const;
}

export function publicAccountUser(user: CmsUser): AccountUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    lastLoginAt: null,
  };
}

function safeRedirectPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/app";
  }

  return value;
}

function extractSessionHeaders(source: Headers) {
  const headers = new Headers();

  for (const cookie of getSetCookieValues(source)) {
    headers.append("set-cookie", cookie);
  }

  return headers;
}
