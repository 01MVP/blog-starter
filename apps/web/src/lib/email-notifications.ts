import "@tanstack/react-start/server-only";
import { digestText, escapeHtml, type EmailPreference, type SiteSettings } from "@repo/core";
import { createAuthDb } from "@repo/db";
import { user as authUserTable } from "@repo/db/schema";
import * as cmsSchema from "@repo/db/schema/cms";
import { env } from "cloudflare:workers";
import { and, desc, eq, gt, lte, or } from "drizzle-orm";

import { getD1SiteSettings } from "./cms-d1-settings";
import { getCmsDb } from "./cms-db";
import { getEmailDeliveryStatus, sendCmsEmail } from "./cms-email";

const weeklyBlogUpdateWindowDays = 7;
const emailSendConcurrency = 5;

type NotificationRecipient = {
  id: string;
  name: string;
  email: string;
};

type BroadcastInput = {
  subject: string;
  message: string;
  createdByUserId?: string | null;
};

const authDb = createAuthDb(env.CMS_DB as Parameters<typeof createAuthDb>[0]);

export async function sendDueWeeklyBlogUpdates() {
  const [settings, delivery] = await Promise.all([
    getD1SiteSettings(),
    Promise.resolve(getEmailDeliveryStatus()),
  ]);

  if (!settings.emailNotificationsEnabled) {
    return { skipped: true, reason: "disabled" as const };
  }

  if (!delivery.configured) {
    return { skipped: true, reason: "not_configured" as const };
  }

  const now = new Date();
  const latestRun = await getLatestWeeklyBlogUpdateRun();
  const lastPeriodEnd = latestRun ? new Date(latestRun.periodEnd) : null;

  if (
    lastPeriodEnd &&
    now.getTime() - lastPeriodEnd.getTime() < weeklyBlogUpdateWindowDays * 86400000
  ) {
    return { skipped: true, reason: "not_due" as const };
  }

  const periodStart =
    lastPeriodEnd && !Number.isNaN(lastPeriodEnd.getTime())
      ? lastPeriodEnd
      : new Date(now.getTime() - weeklyBlogUpdateWindowDays * 86400000);
  const periodEnd = now;
  const posts = await listPostsForWeeklyBlogUpdate(
    periodStart.toISOString(),
    periodEnd.toISOString(),
  );
  const recipients = await listRecipientsByPreference("weekly_blog_updates");
  const runId = `weekly_update_${crypto.randomUUID()}`;
  const createdAt = now.toISOString();

  if (!posts.length || !recipients.length) {
    await getCmsDb().insert(cmsSchema.weeklyBlogUpdateRuns).values({
      id: runId,
      periodStart: periodStart.toISOString(),
      periodEnd: periodEnd.toISOString(),
      status: "skipped",
      postCount: posts.length,
      recipientCount: 0,
      createdAt,
      completedAt: new Date().toISOString(),
    });

    return { postCount: posts.length, recipientCount: 0, skipped: true, reason: "empty" as const };
  }

  const subject = `${settings.name}: ${posts.length} new ${posts.length === 1 ? "post" : "posts"}`;
  const totals = await runEmailTasks(recipients, async (recipient) => {
    const deliveryId = await createDelivery({
      notificationType: "weekly_blog_updates",
      subject,
      userId: recipient.id,
    });
    const result = await sendCmsEmail({
      to: recipient.email,
      subject,
      ...buildWeeklyBlogUpdateEmail({
        posts,
        recipient,
        settings,
        unsubscribeUrl: await issueUnsubscribeUrl(recipient.id, settings),
      }),
    });

    if (result.sent) {
      await markDeliverySent(deliveryId, result.messageId);
      return { failed: 0, sent: 1 };
    } else {
      await markDeliveryFailed(deliveryId, result.error ?? result.reason);
      return { failed: 1, sent: 0 };
    }
  });

  await getCmsDb()
    .insert(cmsSchema.weeklyBlogUpdateRuns)
    .values({
      id: runId,
      periodStart: periodStart.toISOString(),
      periodEnd: periodEnd.toISOString(),
      status: totals.failed && !totals.sent ? "failed" : "sent",
      postCount: posts.length,
      recipientCount: totals.sent,
      error: totals.failed
        ? `${totals.failed} recipient${totals.failed === 1 ? "" : "s"} failed`
        : null,
      createdAt,
      completedAt: new Date().toISOString(),
    });

  return {
    failed: totals.failed,
    postCount: posts.length,
    recipientCount: totals.sent,
    skipped: false,
  };
}

export async function getBroadcastAudienceCount() {
  return (await listBroadcastRecipients()).length;
}

export async function sendBroadcastPreview(input: {
  email: string;
  message: string;
  subject: string;
}) {
  const [settings, delivery] = await Promise.all([
    getD1SiteSettings(),
    Promise.resolve(getEmailDeliveryStatus()),
  ]);

  if (!settings.manualEmailBroadcastsEnabled || !delivery.configured) {
    return { sent: false, reason: "disabled" as const };
  }

  return sendCmsEmail({
    to: input.email,
    subject: `[Preview] ${input.subject}`,
    ...buildBroadcastEmail({
      message: input.message,
      recipient: { id: "preview", name: "Preview", email: input.email },
      settings,
      unsubscribeUrl: `${settings.url.replace(/\/$/, "")}/app`,
    }),
  });
}

export async function sendManualBroadcast(input: BroadcastInput) {
  const [settings, delivery] = await Promise.all([
    getD1SiteSettings(),
    Promise.resolve(getEmailDeliveryStatus()),
  ]);

  if (!settings.manualEmailBroadcastsEnabled) {
    return { error: "Manual broadcasts are disabled" } as const;
  }

  if (!delivery.configured) {
    return { error: "Email delivery is not configured" } as const;
  }

  const subject = input.subject.trim();
  const message = input.message.trim();

  if (!subject || !message) {
    return { error: "Subject and message are required" } as const;
  }

  const recipients = await listBroadcastRecipients();
  const broadcastId = `broadcast_${crypto.randomUUID()}`;
  const createdAt = new Date().toISOString();
  const totals = await runEmailTasks(recipients, async (recipient) => {
    const deliveryId = await createDelivery({
      notificationType: "manual_broadcast",
      subject,
      userId: recipient.id,
    });
    const result = await sendCmsEmail({
      to: recipient.email,
      subject,
      ...buildBroadcastEmail({
        message,
        recipient,
        settings,
        unsubscribeUrl: await issueUnsubscribeUrl(recipient.id, settings),
      }),
    });

    if (result.sent) {
      await markDeliverySent(deliveryId, result.messageId);
      return { failed: 0, sent: 1 };
    } else {
      await markDeliveryFailed(deliveryId, result.error ?? result.reason);
      return { failed: 1, sent: 0 };
    }
  });

  await getCmsDb()
    .insert(cmsSchema.emailBroadcasts)
    .values({
      id: broadcastId,
      subject,
      message,
      status: totals.failed && !totals.sent ? "failed" : "sent",
      recipientCount: totals.sent,
      error: totals.failed
        ? `${totals.failed} recipient${totals.failed === 1 ? "" : "s"} failed`
        : null,
      createdByUserId: input.createdByUserId ?? null,
      createdAt,
      sentAt: new Date().toISOString(),
    });

  return { broadcastId, failed: totals.failed, recipientCount: totals.sent };
}

export async function unsubscribeOptionalEmails(token: string) {
  const tokenHash = await digestText(token.trim());
  const [user] = await authDb
    .select({ id: authUserTable.id })
    .from(authUserTable)
    .where(eq(authUserTable.unsubscribeTokenHash, tokenHash))
    .limit(1);

  if (!user) {
    return false;
  }

  await authDb
    .update(authUserTable)
    .set({
      emailPreference: "none",
      emailPreferenceUpdatedAt: new Date().toISOString(),
      marketingOptOut: true,
      unsubscribeTokenHash: null,
    })
    .where(eq(authUserTable.id, user.id));

  return true;
}

async function listRecipientsByPreference(
  emailPreference: Exclude<EmailPreference, "none">,
): Promise<NotificationRecipient[]> {
  return authDb
    .select({
      id: authUserTable.id,
      name: authUserTable.name,
      email: authUserTable.email,
    })
    .from(authUserTable)
    .where(
      and(
        eq(authUserTable.emailVerified, true),
        eq(authUserTable.marketingOptOut, false),
        eq(authUserTable.emailPreference, emailPreference),
      ),
    );
}

async function listBroadcastRecipients(): Promise<NotificationRecipient[]> {
  return authDb
    .select({
      id: authUserTable.id,
      name: authUserTable.name,
      email: authUserTable.email,
    })
    .from(authUserTable)
    .where(and(eq(authUserTable.emailVerified, true), eq(authUserTable.marketingOptOut, false)));
}

async function runEmailTasks<TRecipient>(
  recipients: TRecipient[],
  task: (recipient: TRecipient) => Promise<{ failed: number; sent: number }>,
) {
  const totals = { failed: 0, sent: 0 };

  for (let index = 0; index < recipients.length; index += emailSendConcurrency) {
    const results = await Promise.all(
      recipients.slice(index, index + emailSendConcurrency).map((recipient) => task(recipient)),
    );

    for (const result of results) {
      totals.failed += result.failed;
      totals.sent += result.sent;
    }
  }

  return totals;
}

async function createDelivery(input: {
  notificationType: "weekly_blog_updates" | "manual_broadcast";
  subject: string;
  userId: string;
}) {
  const id = `email_${crypto.randomUUID()}`;

  await getCmsDb().insert(cmsSchema.emailNotificationDeliveries).values({
    id,
    userId: input.userId,
    notificationType: input.notificationType,
    subject: input.subject,
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  return id;
}

async function markDeliverySent(id: string, messageId: string) {
  await getCmsDb()
    .update(cmsSchema.emailNotificationDeliveries)
    .set({ status: "sent", messageId, sentAt: new Date().toISOString(), error: null })
    .where(eq(cmsSchema.emailNotificationDeliveries.id, id));
}

async function markDeliveryFailed(id: string, error: string) {
  await getCmsDb()
    .update(cmsSchema.emailNotificationDeliveries)
    .set({ status: "failed", error, sentAt: new Date().toISOString() })
    .where(eq(cmsSchema.emailNotificationDeliveries.id, id));
}

async function issueUnsubscribeUrl(userId: string, settings: SiteSettings) {
  const token = randomToken();
  await authDb
    .update(authUserTable)
    .set({ unsubscribeTokenHash: await digestText(token) })
    .where(eq(authUserTable.id, userId));

  const url = new URL("/api/email/unsubscribe", settings.url.replace(/\/$/, ""));
  url.searchParams.set("token", token);
  return url.toString();
}

async function getLatestWeeklyBlogUpdateRun() {
  const [run] = await getCmsDb()
    .select()
    .from(cmsSchema.weeklyBlogUpdateRuns)
    .where(
      or(
        eq(cmsSchema.weeklyBlogUpdateRuns.status, "sent"),
        eq(cmsSchema.weeklyBlogUpdateRuns.status, "failed"),
      ),
    )
    .orderBy(desc(cmsSchema.weeklyBlogUpdateRuns.periodEnd))
    .limit(1);

  return run;
}

async function listPostsForWeeklyBlogUpdate(periodStart: string, periodEnd: string) {
  const rows = await getCmsDb()
    .select()
    .from(cmsSchema.posts)
    .where(
      and(
        gt(cmsSchema.posts.publishedAt, periodStart),
        lte(cmsSchema.posts.publishedAt, periodEnd),
        or(eq(cmsSchema.posts.status, "published"), eq(cmsSchema.posts.status, "scheduled")),
      ),
    )
    .orderBy(desc(cmsSchema.posts.publishedAt));
  const settings = await getD1SiteSettings();

  return rows.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt ?? post.createdAt,
    url: `${settings.url.replace(/\/$/, "")}/blog/${post.slug}`,
  }));
}

function buildWeeklyBlogUpdateEmail(input: {
  posts: Array<{ excerpt: string; publishedAt: string; title: string; url: string }>;
  recipient: NotificationRecipient;
  settings: SiteSettings;
  unsubscribeUrl: string;
}) {
  const text = [
    `Hi ${input.recipient.name},`,
    "",
    `${input.settings.name} published ${input.posts.length} new ${
      input.posts.length === 1 ? "post" : "posts"
    } in the last ${weeklyBlogUpdateWindowDays} days:`,
    "",
    ...input.posts.flatMap((post) => [
      `- ${post.title}`,
      `  ${post.url}`,
      post.excerpt ? `  ${post.excerpt}` : "",
    ]),
    "",
    `You are receiving this because you subscribed to weekly blog updates on ${input.settings.name}.`,
    `Unsubscribe: ${input.unsubscribeUrl}`,
  ].join("\n");
  const html = [
    `<p>Hi ${escapeHtml(input.recipient.name)},</p>`,
    `<p>${escapeHtml(input.settings.name)} published ${input.posts.length} new ${
      input.posts.length === 1 ? "post" : "posts"
    } in the last ${weeklyBlogUpdateWindowDays} days.</p>`,
    "<ul>",
    ...input.posts.map(
      (post) =>
        `<li><a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a>${
          post.excerpt ? `<br><span>${escapeHtml(post.excerpt)}</span>` : ""
        }</li>`,
    ),
    "</ul>",
    optionalEmailFooter(input.settings, input.unsubscribeUrl),
  ].join("");

  return { html, text };
}

function buildBroadcastEmail(input: {
  message: string;
  recipient: NotificationRecipient;
  settings: SiteSettings;
  unsubscribeUrl: string;
}) {
  const text = [
    `Hi ${input.recipient.name},`,
    "",
    input.message,
    "",
    `You are receiving this because you have an account on ${input.settings.name}.`,
    `Unsubscribe: ${input.unsubscribeUrl}`,
  ].join("\n");
  const paragraphs = input.message
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`);
  const html = [
    `<p>Hi ${escapeHtml(input.recipient.name)},</p>`,
    ...paragraphs,
    optionalEmailFooter(input.settings, input.unsubscribeUrl),
  ].join("");

  return { html, text };
}

function optionalEmailFooter(settings: SiteSettings, unsubscribeUrl: string) {
  return [
    `<hr>`,
    `<p style="font-size:12px;color:#666">You are receiving this optional email from ${escapeHtml(
      settings.name,
    )}. <a href="${escapeHtml(unsubscribeUrl)}">Unsubscribe</a>.</p>`,
  ].join("");
}

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
