import "@tanstack/react-start/server-only";
import {
  assertPassword,
  authErrorMessage,
  digestText,
  extractSetCookieHeaders,
  normalizeEmail,
  toIsoString,
  type CommentUserStatus,
  type EmailPreference,
} from "@repo/core";
import { createAuthDb } from "@repo/db";
import { user as authUserTable } from "@repo/db/schema";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";

import { auth } from "#/lib/auth";
import { callAuthEndpoint, readAuthPayload } from "#/lib/auth-endpoint";
import { getSetCookieValues } from "#/lib/auth-helpers";
import { isEmailPreference } from "#/lib/email-preferences";
import {
  deleteCommentEmailVerification,
  isCommentEmailVerificationRequired,
  sendCommentEmailVerification,
} from "#/lib/email-verification";
import {
  isSocialProviderConfigured,
  socialProviderDisplayName,
  type SocialProviderEnv,
} from "#/lib/social-providers";

export type CommentUser = {
  id: string;
  name: string;
  email: string;
  emailHash: string;
  avatarUrl: string | null;
  provider: CommentAuthProvider;
  commentStatus: CommentUserStatus;
  commentReplyNotificationsEnabled: boolean;
  emailPreference: EmailPreference;
  marketingOptOut: boolean;
  createdAt: string;
  lastLoginAt: string | null;
};

type SocialCommentProvider = "github" | "google";
type CommentAuthProvider = "email" | SocialCommentProvider;

type CommentUserInput = {
  email?: string;
  emailPreference?: unknown;
  name?: string;
  password?: string;
};

type BetterAuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string | null;
  commentStatus?: CommentUserStatus;
  commentReplyNotificationsEnabled?: boolean;
  emailPreference?: EmailPreference;
  marketingOptOut?: boolean;
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

const authDb = createAuthDb(env.CMS_DB as Parameters<typeof createAuthDb>[0]);

export async function getCommentUserFromRequest(request: Request) {
  const { user } = await getCommentSessionFromRequest(request);
  return user;
}

export async function getCommentSessionFromRequest(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
    returnHeaders: true,
  });
  const headers = extractSessionHeaders(session.headers);

  if (!session.response?.user) {
    return { headers, user: null };
  }

  const persistedUser = await getAuthUserById(session.response.user.id);

  if (!persistedUser) {
    return { headers, user: null };
  }

  const user = await toCommentUser({
    ...session.response.user,
    ...persistedUser,
  });

  if (
    user.provider === "email" &&
    !persistedUser.emailVerified &&
    (await isCommentEmailVerificationRequired())
  ) {
    return { headers, user: null };
  }

  return { headers, user };
}

export async function signupCommentUser(input: CommentUserInput, request: Request) {
  const email = normalizeEmail(input.email);
  const name = normalizeSignupName(input.name);
  const password = input.password ?? "";

  assertPassword(password);

  const context = await auth.$context;
  const existing = await context.internalAdapter.findUserByEmail(email);
  const verificationRequired = await isCommentEmailVerificationRequired();

  if (existing) {
    const existingUser = toBetterAuthUser(existing);

    if (verificationRequired && existingUser && !existingUser.emailVerified) {
      const verification = await sendCommentEmailVerification({
        email,
        name: existingUser.name || name,
        request,
        userId: existingUser.id,
      });

      if (!verification.sent) {
        await deleteCommentEmailVerification(existingUser.id).catch(() => undefined);
        return { error: "Verification email could not be sent" } as const;
      }

      return {
        data: await toCommentUser(existingUser),
        verificationRequired: true,
      } as const;
    }

    return { error: "Comment account already exists" } as const;
  }

  const hashedPassword = await context.password.hash(password);
  const user = await context.internalAdapter.createUser({
    name,
    email,
    emailVerified: !verificationRequired,
  });

  try {
    await authDb
      .update(authUserTable)
      .set({
        role: "reader",
        emailPreference: isEmailPreference(input.emailPreference) ? input.emailPreference : "none",
        emailPreferenceUpdatedAt: new Date().toISOString(),
      })
      .where(eq(authUserTable.id, user.id));
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

  if (verificationRequired) {
    const verification = await sendCommentEmailVerification({
      email,
      name,
      request,
      userId: user.id,
    });

    if (!verification.sent) {
      await deleteCommentEmailVerification(user.id).catch(() => undefined);
      await context.internalAdapter.deleteUser(user.id).catch(() => undefined);
      return { error: "Verification email could not be sent" } as const;
    }

    return {
      data: await toCommentUser({ ...user, emailVerified: false }),
      verificationRequired: true,
    } as const;
  }

  return loginCommentUser({ email, password }, request);
}

function normalizeSignupName(value: unknown) {
  const name = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

  if (!name) {
    throw new Error("Username is required");
  }

  return name;
}

export async function loginCommentUser(
  input: { email?: string; password?: string },
  request: Request,
) {
  const response = await callAuthEndpoint(
    "/api/auth/sign-in/email",
    { email: normalizeEmail(input.email), password: input.password ?? "", rememberMe: true },
    request,
  );
  const payload = await readAuthPayload<AuthUserPayload>(response);

  if (!response.ok || !payload?.user) {
    return { error: authErrorMessage(payload, "Invalid email or password") } as const;
  }

  if (!payload.user.emailVerified && (await isCommentEmailVerificationRequired())) {
    return {
      error: "Email verification is required. Check your inbox for the verification link.",
    } as const;
  }

  const persistedUser = await getAuthUserById(payload.user.id);

  return {
    data: await toCommentUser({ ...payload.user, ...persistedUser }),
    headers: extractSetCookieHeaders(response),
  } as const;
}

export async function logoutCommentUser(request: Request) {
  const response = await callAuthEndpoint("/api/auth/sign-out", {}, request);

  return {
    headers: extractSetCookieHeaders(response),
  };
}

export async function redirectToGitHubForCommentLogin(request: Request) {
  return redirectToSocialProviderForCommentLogin("github", request);
}

export async function redirectToGoogleForCommentLogin(request: Request) {
  return redirectToSocialProviderForCommentLogin("google", request);
}

async function redirectToSocialProviderForCommentLogin(
  provider: SocialCommentProvider,
  request: Request,
) {
  if (!isSocialProviderConfigured(provider, env as SocialProviderEnv)) {
    return Response.json(
      { error: `${socialProviderDisplayName(provider)} login is not configured` },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const redirectTo = safeRedirectPath(url.searchParams.get("redirectTo") ?? "/");
  const callbackURL = new URL(redirectTo, request.url).toString();
  const errorCallbackURL = new URL(redirectTo, request.url);

  errorCallbackURL.searchParams.set("commentAuth", `${provider}_error`);

  const response = await callAuthEndpoint(
    "/api/auth/sign-in/social",
    {
      callbackURL,
      errorCallbackURL: errorCallbackURL.toString(),
      provider,
    },
    request,
  );
  const payload = await readAuthPayload<SocialSignInPayload>(response);

  if (!response.ok || !payload?.url) {
    return Response.json(
      { error: authErrorMessage(payload, `${socialProviderDisplayName(provider)} login failed`) },
      { status: response.ok ? 500 : response.status },
    );
  }

  const redirect = Response.redirect(payload.url, 302);

  for (const cookie of getSetCookieValues(response.headers)) {
    redirect.headers.append("set-cookie", cookie);
  }

  return redirect;
}

export function publicCommentUser(user: CommentUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    provider: user.provider,
    commentStatus: user.commentStatus,
    commentReplyNotificationsEnabled: user.commentReplyNotificationsEnabled,
    emailPreference: user.emailPreference,
    marketingOptOut: user.marketingOptOut,
  };
}

async function toCommentUser(user: BetterAuthUser): Promise<CommentUser> {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailHash: await digestText(user.email),
    avatarUrl: user.image ?? null,
    provider: await resolvePrimaryProvider(user.id),
    commentStatus: user.commentStatus ?? "active",
    commentReplyNotificationsEnabled: user.commentReplyNotificationsEnabled ?? true,
    emailPreference: user.emailPreference ?? "none",
    marketingOptOut: user.marketingOptOut ?? false,
    createdAt: toIsoString(user.createdAt),
    lastLoginAt: null,
  };
}

async function getAuthUserById(id: string) {
  return (await authDb.select().from(authUserTable).where(eq(authUserTable.id, id)).limit(1))[0];
}

async function resolvePrimaryProvider(userId: string): Promise<CommentUser["provider"]> {
  const context = await auth.$context;
  const accounts = await context.internalAdapter.findAccounts(userId);

  if (accounts.some((account) => account.providerId === "github")) {
    return "github";
  }

  if (accounts.some((account) => account.providerId === "google")) {
    return "google";
  }

  return "email";
}

function toBetterAuthUser(value: unknown) {
  const record = value as ({ user?: BetterAuthUser } & Partial<BetterAuthUser>) | null;

  if (record?.user) {
    return record.user;
  }

  if (record?.id && record.email && record.name) {
    return record as BetterAuthUser;
  }

  return null;
}

function safeRedirectPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/";
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
