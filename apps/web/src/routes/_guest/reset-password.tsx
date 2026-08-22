import { localizeSiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

import { Route as GuestRoute } from "./route";

export const Route = createFileRoute("/_guest/reset-password")({
  component: ResetPasswordForm,
});

function ResetPasswordForm() {
  const siteSettings = localizeSiteSettings(
    GuestRoute.useLoaderData().siteSettings,
    getCurrentLocale(),
  );
  const token =
    typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("token");
  const requestReset = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/account/password-reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || m.password_reset_request_error());
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.password_reset_request_error());
    },
    onSuccess: () => {
      toast.success(m.password_reset_request_success());
    },
  });
  const confirmReset = useMutation({
    mutationFn: async (password: string) => {
      const response = await fetch("/api/account/password-reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || m.password_reset_confirm_error());
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.password_reset_confirm_error());
    },
    onSuccess: () => {
      toast.success(m.password_reset_confirm_success());
    },
  });

  const isPending = requestReset.isPending || confirmReset.isPending;

  const handleRequest = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    if (!email || isPending) {
      return;
    }

    requestReset.mutate(email);
  };

  const handleConfirm = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    if (!password || isPending) {
      return;
    }

    if (password !== confirmPassword) {
      toast.error(m.signup_password_mismatch());
      return;
    }

    confirmReset.mutate(password);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Link to="/" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-xs">
            <BookOpenIcon className="size-5" />
          </div>
          <span className="sr-only">{siteSettings.name}</span>
        </Link>
        <h1 className="text-xl font-bold">{m.password_reset_title()}</h1>
      </div>

      {token ? (
        <form method="post" onSubmit={handleConfirm} className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="password">{m.password_reset_new_password()}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={m.login_password_placeholder()}
              readOnly={isPending}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm_password">{m.signup_confirm_password()}</Label>
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder={m.login_password_placeholder()}
              readOnly={isPending}
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending && <LoaderCircleIcon className="animate-spin" />}
            {isPending ? m.password_reset_confirm_pending() : m.password_reset_confirm()}
          </Button>
        </form>
      ) : (
        <form method="post" onSubmit={handleRequest} className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="email">{m.login_email()}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={m.login_email_placeholder()}
              readOnly={isPending}
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending && <LoaderCircleIcon className="animate-spin" />}
            {isPending ? m.password_reset_request_pending() : m.password_reset_request()}
          </Button>
        </form>
      )}

      <div className="text-center text-sm">
        <Link to="/login" className="underline underline-offset-4">
          {m.login()}
        </Link>
      </div>
    </div>
  );
}
