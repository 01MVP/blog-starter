import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { authQueryOptions, type AuthQueryResult } from "@repo/auth/tanstack/queries";
import { localizeSiteSettings } from "@repo/core";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpenIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { $getAccountLoginOptions, type AccountLoginOptions } from "#/lib/account-login-options";
import { redirectForRole } from "#/lib/account-routing";
import { getCurrentLocale } from "#/lib/i18n";
import type { SocialProvider } from "#/lib/social-providers";
import { m } from "#/paraglide/messages.js";

import { Route as GuestRoute } from "./route";

export const Route = createFileRoute("/_guest/login")({
  validateSearch: (search): { error?: boolean } => (search.error === "1" ? { error: true } : {}),
  loader: (): Promise<AccountLoginOptions> => $getAccountLoginOptions(),
  component: LoginForm,
});

type AccountUser = NonNullable<AuthQueryResult>;

function LoginForm() {
  const { redirectUrl } = Route.useRouteContext();
  const { socialProviders } = Route.useLoaderData();
  const search = Route.useSearch();
  const locale = getCurrentLocale();
  const siteSettings = localizeSiteSettings(GuestRoute.useLoaderData().siteSettings, locale);
  const copy = getLoginRecoveryCopy(locale);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "sending" | "sent">("idle");
  const availableSocialLogins = socialLoginOptions.filter((option) =>
    socialProviders.includes(option.provider),
  );

  const { mutate: emailLoginMutate, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch("/api/account/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as { data?: AccountUser; error?: string };

      if (!response.ok || !payload.data) {
        throw new Error(payload.error || m.login_error());
      }

      return payload.data;
    },
    onError: (error, variables) => {
      const message = error instanceof Error ? error.message : m.login_error();
      toast.error(message);

      if (/verification/i.test(message)) {
        setVerificationEmail(variables.email);
        setVerificationStatus("idle");
      }
    },
    onSuccess: async (user) => {
      queryClient.setQueryData(authQueryOptions().queryKey, user);
      await navigate({ to: redirectForRole(user, redirectUrl) });
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return;

    emailLoginMutate({ email, password });
  };

  const resendVerification = async () => {
    if (!verificationEmail || verificationStatus === "sending") {
      return;
    }

    setVerificationStatus("sending");
    const response = await fetch("/api/account/verification-email", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: verificationEmail }),
    }).catch(() => null);

    if (!response?.ok) {
      setVerificationStatus("idle");
      toast.error(copy.verificationResendError);
      return;
    }

    setVerificationStatus("sent");
    toast.success(copy.verificationResent);
  };

  return (
    <div className="flex flex-col gap-6">
      <form action="/api/account/login" method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="redirectTo" value={redirectUrl} />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link to="/" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-xs">
                <BookOpenIcon className="size-5" />
              </div>
              <span className="sr-only">{siteSettings.name}</span>
            </Link>
            <h1 className="text-xl font-bold">{m.login_greeting({ name: siteSettings.name })}</h1>
          </div>
          {search.error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {m.login_error()}
            </p>
          ) : null}
          {availableSocialLogins.length ? (
            <>
              <div className="grid gap-3">
                {availableSocialLogins.map(({ Icon, label, provider }) => (
                  <a
                    key={provider}
                    href={accountSocialLoginHref(provider, redirectUrl)}
                    aria-disabled={isPending}
                    className={buttonVariants({
                      variant: "secondary",
                      className: isPending
                        ? "w-full justify-center pointer-events-none opacity-45"
                        : "w-full justify-center",
                    })}
                  >
                    <Icon className="size-4" />
                    {m.login_with_provider({ provider: label })}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                {m.login_alternative()}
                <span className="h-px flex-1 bg-border" />
              </div>
            </>
          ) : null}
          <div className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">{m.login_email()}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={m.login_email_placeholder()}
                autoComplete="email"
                readOnly={isPending}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="password">{m.login_password()}</Label>
                <Link to="/reset-password" className="text-sm underline underline-offset-4">
                  {m.password_reset_link()}
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={m.login_password_placeholder()}
                autoComplete="current-password"
                readOnly={isPending}
                required
              />
            </div>
            <Button type="submit" className="mt-2 w-full" size="lg" disabled={isPending}>
              {isPending && <LoaderCircleIcon className="animate-spin" />}
              {isPending ? m.login_pending() : m.login()}
            </Button>
            {verificationEmail ? (
              <div className="rounded-md border border-border bg-muted/35 p-3 text-sm">
                <p className="text-muted-foreground">{copy.verificationPrompt}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full"
                  disabled={verificationStatus === "sending"}
                  onClick={() => void resendVerification()}
                >
                  {verificationStatus === "sending" ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : null}
                  {verificationStatus === "sent" ? copy.verificationSent : copy.verificationResend}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </form>

      <div className="text-center text-sm">
        {m.login_no_account()}{" "}
        <Link
          to="/signup"
          search={accountRedirectSearch(redirectUrl)}
          className="underline underline-offset-4"
        >
          {m.signup()}
        </Link>
      </div>
    </div>
  );
}

const socialLoginOptions = [
  { provider: "github", label: "GitHub", Icon: SiGithub },
  { provider: "google", label: "Google", Icon: SiGoogle },
] satisfies Array<{
  provider: SocialProvider;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}>;

function accountSocialLoginHref(provider: "github" | "google", redirectTo: string) {
  return `/api/account/login/${provider}/start?redirectTo=${encodeURIComponent(redirectTo)}`;
}

function accountRedirectSearch(redirectTo: string): { redirectTo?: string } {
  return redirectTo === "/app" ? {} : { redirectTo };
}

function getLoginRecoveryCopy(locale: ReturnType<typeof getCurrentLocale>) {
  if (locale === "zh") {
    return {
      verificationPrompt: "没有收到验证邮件？可以重新发送一次。",
      verificationResend: "重新发送验证邮件",
      verificationResendError: "验证邮件发送失败。",
      verificationResent: "验证邮件已发送。",
      verificationSent: "已发送",
    };
  }

  return {
    verificationPrompt: "Did not receive the verification email? Send it again.",
    verificationResend: "Resend verification email",
    verificationResendError: "Verification email could not be sent.",
    verificationResent: "Verification email sent.",
    verificationSent: "Sent",
  };
}
