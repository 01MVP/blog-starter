import "@tanstack/react-start/server-only";
import { digestText, escapeHtml, type Comment, type SiteSettings } from "@repo/core";
import { createAuthDb } from "@repo/db";
import { user as authUserTable } from "@repo/db/schema";
import * as cmsSchema from "@repo/db/schema/cms";
import { env } from "cloudflare:workers";
import { and, eq } from "drizzle-orm";

import { getD1SiteSettings } from "./cms-d1-settings";
import { getCmsDb } from "./cms-db";
import { getEmailDeliveryStatus, sendCmsEmail } from "./cms-email";

type CommentReplyRecipient = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  commentReplyNotificationsEnabled: boolean;
};

const authDb = createAuthDb(env.CMS_DB as Parameters<typeof createAuthDb>[0]);

export async function notifyCommentReplyCreated(reply: Comment) {
  if (!reply.parentId) {
    return { skipped: true, reason: "not_reply" as const };
  }

  if (reply.status !== "approved") {
    return { skipped: true, reason: "not_approved" as const };
  }

  const parent = await getParentComment(reply);

  if (!parent?.authorUserId) {
    return { skipped: true, reason: "missing_parent" as const };
  }

  if (parent.authorUserId === reply.authorUserId) {
    return { skipped: true, reason: "self_reply" as const };
  }

  const [settings, delivery, post, recipient] = await Promise.all([
    getD1SiteSettings(),
    Promise.resolve(getEmailDeliveryStatus()),
    getPostForComment(reply),
    getReplyRecipient(parent.authorUserId),
  ]);

  if (!post) {
    return { skipped: true, reason: "missing_post" as const };
  }

  if (!recipient) {
    return { skipped: true, reason: "missing_recipient" as const };
  }

  if (!recipient.emailVerified) {
    return { skipped: true, reason: "unverified" as const };
  }

  if (!recipient.commentReplyNotificationsEnabled) {
    return { skipped: true, reason: "disabled" as const };
  }

  if (!delivery.configured) {
    return { skipped: true, reason: "not_configured" as const };
  }

  const subject = `New reply to your comment on: ${post.title}`;
  const deliveryId = await reserveCommentReplyDelivery({
    commentId: reply.id,
    subject,
    userId: recipient.id,
  });

  if (!deliveryId) {
    return { skipped: true, reason: "duplicate" as const };
  }

  const result = await sendCmsEmail({
    to: recipient.email,
    subject,
    ...buildCommentReplyEmail({
      parentBody: parent.body,
      postSlug: post.slug,
      postTitle: post.title,
      recipient,
      reply,
      settings,
      unsubscribeUrl: await issueCommentReplyUnsubscribeUrl(recipient.id, settings),
    }),
  });

  if (result.sent) {
    await markDeliverySent(deliveryId, result.messageId);
    return { skipped: false, sent: true as const };
  }

  await markDeliveryFailed(deliveryId, result.error ?? result.reason);
  return { skipped: false, sent: false as const };
}

export async function unsubscribeCommentReplyEmails(token: string) {
  const tokenHash = await digestText(token.trim());
  const [user] = await authDb
    .select({ id: authUserTable.id })
    .from(authUserTable)
    .where(eq(authUserTable.commentReplyUnsubscribeTokenHash, tokenHash))
    .limit(1);

  if (!user) {
    return false;
  }

  await authDb
    .update(authUserTable)
    .set({
      commentReplyNotificationsEnabled: false,
      commentReplyUnsubscribeTokenHash: null,
    })
    .where(eq(authUserTable.id, user.id));

  return true;
}

async function getParentComment(reply: Comment) {
  if (!reply.parentId) {
    return null;
  }

  return (
    await getCmsDb()
      .select({
        authorUserId: cmsSchema.comments.authorUserId,
        body: cmsSchema.comments.body,
      })
      .from(cmsSchema.comments)
      .where(
        and(
          eq(cmsSchema.comments.id, reply.parentId),
          eq(cmsSchema.comments.postId, reply.postId),
          eq(cmsSchema.comments.status, "approved"),
        ),
      )
      .limit(1)
  )[0];
}

async function getPostForComment(reply: Comment) {
  return (
    await getCmsDb()
      .select({
        slug: cmsSchema.posts.slug,
        title: cmsSchema.posts.title,
      })
      .from(cmsSchema.posts)
      .where(eq(cmsSchema.posts.id, reply.postId))
      .limit(1)
  )[0];
}

async function getReplyRecipient(userId: string): Promise<CommentReplyRecipient | undefined> {
  return (
    await authDb
      .select({
        id: authUserTable.id,
        name: authUserTable.name,
        email: authUserTable.email,
        emailVerified: authUserTable.emailVerified,
        commentReplyNotificationsEnabled: authUserTable.commentReplyNotificationsEnabled,
      })
      .from(authUserTable)
      .where(eq(authUserTable.id, userId))
      .limit(1)
  )[0];
}

async function reserveCommentReplyDelivery(input: {
  commentId: string;
  subject: string;
  userId: string;
}) {
  const existing = await getCmsDb()
    .select({ id: cmsSchema.emailNotificationDeliveries.id })
    .from(cmsSchema.emailNotificationDeliveries)
    .where(
      and(
        eq(cmsSchema.emailNotificationDeliveries.userId, input.userId),
        eq(cmsSchema.emailNotificationDeliveries.commentId, input.commentId),
        eq(cmsSchema.emailNotificationDeliveries.notificationType, "comment_reply"),
      ),
    )
    .limit(1);

  if (existing[0]) {
    return null;
  }

  const id = `email_${crypto.randomUUID()}`;

  await getCmsDb().insert(cmsSchema.emailNotificationDeliveries).values({
    id,
    userId: input.userId,
    commentId: input.commentId,
    notificationType: "comment_reply",
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

async function issueCommentReplyUnsubscribeUrl(userId: string, settings: SiteSettings) {
  const token = randomToken();
  await authDb
    .update(authUserTable)
    .set({ commentReplyUnsubscribeTokenHash: await digestText(token) })
    .where(eq(authUserTable.id, userId));

  const url = new URL("/api/email/unsubscribe", settings.url.replace(/\/$/, ""));
  url.searchParams.set("type", "comment_replies");
  url.searchParams.set("token", token);
  return url.toString();
}

function buildCommentReplyEmail(input: {
  parentBody: string;
  postSlug: string;
  postTitle: string;
  recipient: CommentReplyRecipient;
  reply: Comment;
  settings: SiteSettings;
  unsubscribeUrl: string;
}) {
  const postUrl = `${input.settings.url.replace(/\/$/, "")}/blog/${input.postSlug}#comments`;
  const text = [
    `Hi ${input.recipient.name},`,
    "",
    `${input.reply.authorName} replied to your comment on ${input.postTitle}:`,
    "",
    input.reply.body,
    "",
    `Your comment: ${input.parentBody}`,
    "",
    `Open the discussion: ${postUrl}`,
    "",
    `You are receiving this because comment reply notifications are enabled for your account on ${input.settings.name}.`,
    `Stop reply notifications: ${input.unsubscribeUrl}`,
  ].join("\n");
  const html = [
    `<p>Hi ${escapeHtml(input.recipient.name)},</p>`,
    `<p>${escapeHtml(input.reply.authorName)} replied to your comment on <strong>${escapeHtml(
      input.postTitle,
    )}</strong>:</p>`,
    `<blockquote>${escapeHtml(input.reply.body)}</blockquote>`,
    `<p><strong>Your comment:</strong></p>`,
    `<blockquote>${escapeHtml(input.parentBody)}</blockquote>`,
    `<p><a href="${escapeHtml(postUrl)}">Open the discussion</a></p>`,
    `<hr>`,
    `<p style="font-size:12px;color:#666">You are receiving this because comment reply notifications are enabled for your account on ${escapeHtml(
      input.settings.name,
    )}. <a href="${escapeHtml(input.unsubscribeUrl)}">Stop reply notifications</a>.</p>`,
  ].join("");

  return { html, text };
}

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
