import { authQueryOptions, type AuthQueryResult } from "@repo/auth/tanstack/queries";
import { localizeSiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpenIcon, EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { redirectForRole } from "#/lib/account-routing";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

import { Route as GuestRoute } from "./route";

export const Route = createFileRoute("/_guest/signup")({
  validateSearch: (search): { error?: boolean } => (search.error === "1" ? { error: true } : {}),
  component: SignupForm,
});

type AccountUser = NonNullable<AuthQueryResult>;

function SignupForm() {
  const { redirectUrl } = Route.useRouteContext();
  const search = Route.useSearch();
  const locale = getCurrentLocale();
  const siteSettings = localizeSiteSettings(GuestRoute.useLoaderData().siteSettings, locale);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signupMutate, isPending } = useMutation({
    mutationFn: async (data: { name: string; email: string; password: string }) => {
      const response = await fetch("/api/account/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as {
        data?: AccountUser | null;
        error?: string;
        verificationRequired?: boolean;
      };

      if (payload.verificationRequired) {
        return { verificationRequired: true as const };
      }

      if (!response.ok || !payload.data) {
        throw new Error(payload.error || m.signup_error());
      }

      return payload.data;
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.signup_error());
    },
    onSuccess: async (result) => {
      if ("verificationRequired" in result) {
        toast.success(m.comment_email_verification_sent());
        await navigate({ to: "/login" });
        return;
      }

      const user = result;
      queryClient.setQueryData(authQueryOptions().queryKey, user);
      await navigate({ to: redirectForRole(user, redirectUrl) });
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const formData = new FormData(e.currentTarget);
    const nameInput = formData.get("name");
    const name = typeof nameInput === "string" ? nameInput.trim() : "";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    if (!name) {
      toast.error(m.signup_name_required());
      return;
    }

    if (!email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      toast.error(m.signup_password_mismatch());
      return;
    }

    signupMutate({ name, email, password });
  };

  return (
    <div className="flex flex-col gap-6">
      <form action="/api/account/signup" method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="redirectTo" value={redirectUrl} />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link to="/" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-xs">
                <BookOpenIcon className="size-5" />
              </div>
              <span className="sr-only">{siteSettings.name}</span>
            </Link>
            <h1 className="text-xl font-bold">{m.signup_greeting({ name: siteSettings.name })}</h1>
          </div>
          {search.error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {m.signup_error()}
            </p>
          ) : null}
          <div className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">{m.signup_name()}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={m.signup_name_placeholder()}
                autoComplete="username"
                maxLength={80}
                readOnly={isPending}
                required
              />
            </div>
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
              <Label htmlFor="password">{m.login_password()}</Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder={m.login_password_placeholder()}
                readOnly={isPending}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm_password">{m.signup_confirm_password()}</Label>
              <PasswordInput
                id="confirm_password"
                name="confirm_password"
                placeholder={m.signup_confirm_password_placeholder()}
                readOnly={isPending}
                autoComplete="new-password"
                required
              />
            </div>
            <Button type="submit" className="mt-2 w-full" size="lg" disabled={isPending}>
              {isPending && <LoaderCircleIcon className="animate-spin" />}
              {isPending ? m.signup_pending() : m.signup()}
            </Button>
          </div>
        </div>
      </form>

      <div className="text-center text-sm">
        {m.signup_has_account()}{" "}
        <Link
          to="/login"
          search={accountRedirectSearch(redirectUrl)}
          className="underline underline-offset-4"
        >
          {m.login()}
        </Link>
      </div>
    </div>
  );
}

function PasswordInput(props: React.ComponentProps<typeof Input>) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleLabel = isVisible ? m.signup_password_hide() : m.signup_password_show();
  const Icon = isVisible ? EyeOffIcon : EyeIcon;

  return (
    <div className="relative">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        className={`relative z-0 pr-10 ${props.className ?? ""}`}
      />
      <button
        type="button"
        className="absolute inset-y-1 right-1 z-20 inline-flex w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45"
        aria-label={toggleLabel}
        aria-pressed={isVisible}
        disabled={props.readOnly || props.disabled}
        onClick={() => {
          setIsVisible((value) => !value);
        }}
      >
        <Icon className="size-4" />
      </button>
    </div>
  );
}

function accountRedirectSearch(redirectTo: string): { redirectTo?: string } {
  return redirectTo === "/app" ? {} : { redirectTo };
}
