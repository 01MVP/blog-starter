import "@tanstack/react-start/server-only";
import { assertPassword, digestText, extractSetCookieHeaders, normalizeEmail } from "@repo/core";
import { env } from "cloudflare:workers";

import { auth } from "#/lib/auth";
import { callAuthEndpoint, readAuthPayload } from "#/lib/auth-endpoint";
import { getD1SiteSettings } from "#/lib/cms-d1";
import { sendPasswordResetEmail } from "#/lib/cms-email";
import { getClientIp } from "#/lib/comment-guard";

const passwordResetWindowSeconds = 60 * 60;
const passwordResetIpLimit = 5;
const passwordResetEmailLimit = 3;

type BetterAuthUser = {
  id: string;
  name?: string;
  email: string;
};

type CredentialAccount = {
  id?: string;
  providerId: string;
  password?: string | null;
};

type AuthUserPayload = {
  user?: BetterAuthUser;
  message?: string;
  error?: string;
  code?: string;
};

export async function requestAccountPasswordReset(
  emailInput: string | undefined,
  request: Request,
) {
  const ttlMinutes = readPasswordResetTtlMinutes();
  const normalizedEmail = safeNormalizeEmail(emailInput);
  const rateLimited = await isPasswordResetRateLimited(normalizedEmail, request).catch(() => false);
  const user = normalizedEmail ? await getUserByEmail(normalizedEmail).catch(() => null) : null;

  if (user && !rateLimited) {
    await sendPasswordResetForUser(user, request, ttlMinutes);
  }

  return {
    accepted: true,
    expiresInMinutes: ttlMinutes,
  };
}

export async function requestAccountPasswordResetForUserId(userId: string, request: Request) {
  const context = await auth.$context;
  const user = (await context.internalAdapter.findUserById(userId)) as BetterAuthUser | null;

  if (!user?.email) {
    return { error: "User not found" } as const;
  }

  const ttlMinutes = readPasswordResetTtlMinutes();
  await sendPasswordResetForUser(user, request, ttlMinutes);

  return {
    data: {
      accepted: true,
      expiresInMinutes: ttlMinutes,
    },
  } as const;
}

export async function confirmAccountPasswordReset(
  token: string | undefined,
  password: string | undefined,
) {
  const normalizedToken = token?.trim() ?? "";

  if (!normalizedToken) {
    return { error: "Password reset link is invalid or expired." } as const;
  }

  const tokenKey = passwordResetKey(normalizedToken);
  const userId = await env.CMS_CACHE.get(tokenKey);

  if (!userId) {
    return { error: "Password reset link is invalid or expired." } as const;
  }

  try {
    await env.CMS_CACHE.delete(tokenKey);
  } catch {
    return {
      error: "Password reset could not be confirmed. Request a new reset link.",
    } as const;
  }

  return resetPasswordForUserId(userId, password);
}

export async function changeAccountPassword(
  input: {
    currentPassword?: string;
    newPassword?: string;
  },
  request: Request,
) {
  const session = await auth.api.getSession({
    headers: request.headers,
    query: { disableCookieCache: true },
  });

  if (!session?.user?.id || !session.user.email) {
    return { error: "Authentication required", status: 401 } as const;
  }

  const result = await resetPasswordForUserId(session.user.id, input.newPassword, {
    currentPassword: input.currentPassword,
  });

  if ("error" in result) {
    return result;
  }

  const response = await callAuthEndpoint(
    "/api/auth/sign-in/email",
    {
      email: session.user.email,
      password: input.newPassword ?? "",
      rememberMe: true,
    },
    request,
  );
  const payload = await readAuthPayload<AuthUserPayload>(response);

  if (!response.ok || !payload?.user) {
    return {
      error: "Password changed, but the session could not be refreshed.",
      status: 500,
    } as const;
  }

  return {
    data: { changed: true },
    headers: extractSetCookieHeaders(response),
  } as const;
}

export async function revokeAccountSessions(userId: string) {
  const context = await auth.$context;
  const user = await context.internalAdapter.findUserById(userId);

  if (!user) {
    return { error: "User not found" } as const;
  }

  await context.internalAdapter.deleteSessions(userId);

  return { data: { revoked: true } } as const;
}

async function sendPasswordResetForUser(
  user: BetterAuthUser,
  request: Request,
  ttlMinutes: number,
) {
  const token = `account_reset_${crypto.randomUUID().replace(/-/g, "")}`;
  await env.CMS_CACHE.put(passwordResetKey(token), user.id, {
    expirationTtl: ttlMinutes * 60,
  });

  const settings = await getD1SiteSettings();
  await sendPasswordResetEmail({
    email: user.email,
    siteName: settings.name,
    siteUrl: publicSiteUrl(request),
    token,
    ttlMinutes,
  });
}

async function resetPasswordForUserId(
  userId: string,
  password: string | undefined,
  options: {
    currentPassword?: string;
  } = {},
) {
  assertPassword(password ?? "");

  const context = await auth.$context;
  const user = await context.internalAdapter.findUserById(userId);

  if (!user) {
    return { error: "User not found" } as const;
  }

  const accounts = (await context.internalAdapter.findAccounts(userId)) as CredentialAccount[];
  const credentialAccount = accounts.find(
    (account) => account.providerId === "credential" && account.password,
  );

  if (options.currentPassword !== undefined) {
    if (!credentialAccount?.password) {
      await context.password.hash(options.currentPassword);
      return { error: "This account does not have a password sign-in method." } as const;
    }

    const currentPasswordOk = await context.password.verify({
      hash: credentialAccount.password,
      password: options.currentPassword,
    });

    if (!currentPasswordOk) {
      return { error: "Current password is incorrect." } as const;
    }
  }

  const hashedPassword = await context.password.hash(password ?? "");

  if (credentialAccount) {
    await context.internalAdapter.updatePassword(userId, hashedPassword);
  } else {
    await context.internalAdapter.createAccount({
      accountId: userId,
      password: hashedPassword,
      providerId: "credential",
      userId,
    });
  }

  await context.internalAdapter.deleteSessions(userId);

  return { data: { changed: true } } as const;
}

async function getUserByEmail(email: string) {
  const context = await auth.$context;
  const record = await context.internalAdapter.findUserByEmail(email);

  return record?.user && typeof record.user.id === "string" && typeof record.user.email === "string"
    ? (record.user as BetterAuthUser)
    : null;
}

function safeNormalizeEmail(value: string | undefined) {
  try {
    return normalizeEmail(value);
  } catch {
    return null;
  }
}

function passwordResetKey(token: string) {
  return `account-password-reset:${token}`;
}

function publicSiteUrl(request: Request) {
  return (
    env.CMS_PUBLIC_SITE_URL?.replace(/\/$/, "") || env.VITE_BASE_URL || new URL(request.url).origin
  );
}

function readPasswordResetTtlMinutes() {
  const value = Number(
    (env as unknown as CloudflareBindings).CMS_PASSWORD_RESET_TTL_MINUTES || "30",
  );

  if (!Number.isFinite(value) || value < 5) {
    return 30;
  }

  return Math.min(Math.floor(value), 120);
}

async function isPasswordResetRateLimited(email: string | null, request: Request) {
  const ip = getClientIp(request);
  const [ipLimited, emailLimited] = await Promise.all([
    consumePasswordResetBucket("ip", ip, passwordResetIpLimit),
    email ? consumePasswordResetBucket("email", email, passwordResetEmailLimit) : false,
  ]);

  return ipLimited || emailLimited;
}

async function consumePasswordResetBucket(kind: string, value: string, limit: number) {
  const key = `account-password-reset-rate:${kind}:${await digestText(value)}`;
  const current = Number(await env.CMS_CACHE.get(key).catch(() => null));

  if (Number.isFinite(current) && current >= limit) {
    return true;
  }

  await env.CMS_CACHE.put(key, String((Number.isFinite(current) ? current : 0) + 1), {
    expirationTtl: passwordResetWindowSeconds,
  });

  return false;
}
