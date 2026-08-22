import "@tanstack/react-start/server-only";
import {
  assertPassword,
  authErrorMessage,
  extractSetCookieHeaders,
  normalizeEmail,
  toIsoString,
} from "@repo/core";
import { createAuthDb } from "@repo/db";
import { user as authUserTable } from "@repo/db/schema";
import { env } from "cloudflare:workers";
import { count, eq } from "drizzle-orm";

import { auth } from "#/lib/auth";
import { callAuthEndpoint, readAuthPayload } from "#/lib/auth-endpoint";
import { getSetCookieValues } from "#/lib/auth-helpers";
import {
  isSocialProviderConfigured,
  socialProviderDisplayName,
  type SocialProviderEnv,
} from "#/lib/social-providers";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin";
  createdAt: string;
  lastLoginAt: string | null;
};

type AdminUserInput = {
  name?: string;
  email?: string;
  password?: string;
};

type BetterAuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: Date | string | number;
};

type AuthUserPayload = {
  user?: BetterAuthUser;
  message?: string;
  error?: string;
  code?: string;
};

type SocialSignInPayload = {
  url?: string;
  message?: string;
  error?: string;
  code?: string;
};

type AdminSocialProvider = "github" | "google";

const authDb = createAuthDb(env.CMS_DB as Parameters<typeof createAuthDb>[0]);

export async function countAdminUsers() {
  const [row] = await authDb
    .select({ value: count() })
    .from(authUserTable)
    .where(eq(authUserTable.role, "admin"));
  return Number(row?.value ?? 0);
}

export async function createAdminUser(input: AdminUserInput) {
  const email = normalizeEmail(input.email);
  const name = input.name?.trim() || email;
  const password = input.password ?? "";

  assertPassword(password);

  const context = await auth.$context;
  const existing = await context.internalAdapter.findUserByEmail(email);

  if (existing) {
    return { error: "Admin user already exists" } as const;
  }

  const hashedPassword = await context.password.hash(password);
  const user = await context.internalAdapter.createUser({
    name,
    email,
    emailVerified: true,
  });

  try {
    await authDb.update(authUserTable).set({ role: "admin" }).where(eq(authUserTable.id, user.id));
    await context.internalAdapter.linkAccount({
      userId: user.id,
      accountId: user.id,
      providerId: "credential",
      password: hashedPassword,
    });
  } catch (error) {
    await context.internalAdapter.deleteUser(user.id).catch(() => undefined);
    throw error;
  }

  return { data: toAdminUser({ ...user, role: "admin" }) } as const;
}

export async function resetAdminPassword(
  emailInput: string | undefined,
  password: string | undefined,
) {
  const email = normalizeEmail(emailInput);
  assertPassword(password ?? "");

  const context = await auth.$context;
  const record = await context.internalAdapter.findUserByEmail(email, {
    includeAccounts: true,
  });

  if (!record) {
    return { error: "Admin user not found" } as const;
  }

  if (!isAdminUser(record.user)) {
    return { error: "Admin user not found" } as const;
  }

  const hashedPassword = await context.password.hash(password ?? "");
  const credentialAccount = record.accounts.find((account) => account.providerId === "credential");

  if (credentialAccount) {
    await context.internalAdapter.updatePassword(record.user.id, hashedPassword);
  } else {
    await context.internalAdapter.createAccount({
      userId: record.user.id,
      accountId: record.user.id,
      providerId: "credential",
      password: hashedPassword,
    });
  }

  await context.internalAdapter.deleteSessions(record.user.id);

  return { data: toAdminUser(record.user) } as const;
}

export async function loginAdmin(input: { email?: string; password?: string }, request: Request) {
  const email = normalizeEmail(input.email);
  const response = await callAuthEndpoint(
    "/api/auth/sign-in/email",
    { email, password: input.password ?? "", rememberMe: true },
    request,
  );
  const payload = await readAuthPayload<AuthUserPayload>(response);

  if (!response.ok || !payload?.user || !isAdminUser(payload.user)) {
    if (response.ok && payload?.user) {
      await callAuthEndpoint("/api/auth/sign-out", {}, request);
    }

    return { error: authErrorMessage(payload, "Invalid email or password") } as const;
  }

  return {
    data: toAdminUser(payload.user),
    headers: extractSetCookieHeaders(response),
  } as const;
}

export async function redirectToAdminSocialLogin(provider: AdminSocialProvider, request: Request) {
  if (!isSocialProviderConfigured(provider, env as SocialProviderEnv)) {
    return { error: `${socialProviderDisplayName(provider)} login is not configured` } as const;
  }

  const url = new URL(request.url);
  const redirectTo = safeRedirectPath(url.searchParams.get("redirectTo") ?? "/admin");
  const callbackURL = new URL("/api/admin/login/social/complete", request.url);
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

export async function completeAdminSocialLogin(request: Request) {
  const url = new URL(request.url);
  const redirectTo = safeRedirectPath(url.searchParams.get("redirectTo") ?? "/admin");
  const user = await getAdminUserFromRequest(request);

  if (user) {
    return {
      data: redirectTo,
      headers: new Headers(),
    } as const;
  }

  const logout = await logoutAdmin(request);

  return {
    error: "Social login is not linked to an admin account",
    headers: logout.headers,
  } as const;
}

export async function logoutAdmin(request: Request) {
  const response = await callAuthEndpoint("/api/auth/sign-out", {}, request);

  return {
    headers: extractSetCookieHeaders(response),
  };
}

export async function getAdminUserFromRequest(
  request: Request,
  query?: {
    disableCookieCache?: boolean;
    disableRefresh?: boolean;
  },
) {
  const { user } = await getAdminSessionFromRequest(request, query);
  return user;
}

export async function getAdminSessionFromRequest(
  request: Request,
  query?: {
    disableCookieCache?: boolean;
    disableRefresh?: boolean;
  },
) {
  const session = await auth.api.getSession({
    headers: request.headers,
    query: { ...query, disableCookieCache: true },
    returnHeaders: true,
  });
  const headers = extractSessionHeaders(session.headers);

  return {
    headers,
    user:
      session.response?.user && isAdminUser(session.response.user)
        ? toAdminUser(session.response.user)
        : null,
  };
}

export function publicAdminUser(user: AdminUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
  };
}

export async function getAdminUserByEmail(emailInput: string | undefined) {
  const email = normalizeEmail(emailInput);
  const context = await auth.$context;
  const record = await context.internalAdapter.findUserByEmail(email);

  return record?.user && isAdminUser(record.user) ? toAdminUser(record.user) : null;
}

function isAdminUser(user: BetterAuthUser) {
  return user.role === "admin";
}

function toAdminUser(user: BetterAuthUser): AdminUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: "admin",
    createdAt: toIsoString(user.createdAt),
    lastLoginAt: null,
  };
}

function safeRedirectPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/admin";
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
