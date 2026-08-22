import "@tanstack/react-start/server-only";
import {
  getCommentInitialStatus,
  type Comment,
  type CommentStatus,
  countLinks,
  digestText,
} from "@repo/core";
import * as schema from "@repo/db/schema/cms";
import { eq, and, desc, asc } from "drizzle-orm";

import { getD1PostBySlug } from "./cms-d1-posts";
import { getD1SiteSettings } from "./cms-d1-settings";
import {
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
  MAX_COMMENT_LINKS,
  type CommentInput,
  type D1Result,
  drizzleRowToComment,
} from "./cms-d1-shared";
import { getCmsDb } from "./cms-db";
import { resolveAiCommentModerationOutcome } from "./comment-ai-moderation.server";

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

export type D1CommentAiModerationTask = {
  baseStatus: CommentStatus;
  body: string;
  requireApproval: boolean;
  rules: string;
};

export type D1CommentCreateResult = {
  comment: Comment;
  postTitle: string;
  aiModeration: D1CommentAiModerationTask | null;
};

export async function createD1Comment(
  input: CommentInput,
): Promise<D1Result<D1CommentCreateResult>> {
  const currentSettings = await getD1SiteSettings();
  const post = await getD1PostBySlug(input.postSlug);

  if (!post || !post.commentsEnabled || !currentSettings.commentsEnabled) {
    return { error: "Post not found or comments are disabled" };
  }

  const body = input.body?.trim() ?? "";
  const authorName = input.authorName?.trim() ?? "";
  const authorEmail = input.authorEmail?.trim().toLowerCase() ?? "";
  const authorWebsite = input.authorWebsite?.trim() || null;

  if (!authorName || !authorEmail || !body) {
    return { error: "Name, email, and comment body are required" };
  }

  if (body.length < MIN_COMMENT_LENGTH || body.length > MAX_COMMENT_LENGTH) {
    return {
      error: `Comment body must be between ${MIN_COMMENT_LENGTH} and ${MAX_COMMENT_LENGTH} characters`,
    };
  }

  if (countLinks(body) > MAX_COMMENT_LINKS) {
    return { error: "Comment contains too many links" };
  }

  const parentId = input.parentId ?? null;
  const db = getCmsDb();
  const parentComment = parentId
    ? (
        await db
          .select({ parentId: schema.comments.parentId })
          .from(schema.comments)
          .where(
            and(
              eq(schema.comments.id, parentId),
              eq(schema.comments.postId, post.id),
              eq(schema.comments.status, "approved"),
            ),
          )
          .limit(1)
      )[0]
    : null;

  if (parentId && !parentComment) {
    return { error: "Reply target not found" };
  }

  if (parentComment?.parentId) {
    return { error: "Comment replies are limited to two levels" };
  }

  const now = new Date().toISOString();
  const baseStatus = getCommentInitialStatus({ body, settings: currentSettings });
  const aiModeration =
    currentSettings.aiCommentModerationEnabled && baseStatus !== "spam" && baseStatus !== "deleted"
      ? {
          baseStatus,
          body,
          requireApproval: currentSettings.commentsRequireApproval,
          rules: currentSettings.aiCommentModerationRules,
        }
      : null;
  const status = aiModeration ? "pending" : baseStatus;
  const aiModerationRecord = aiModeration
    ? {
        status: "pending" as const,
        decision: null,
        reason: null,
        error: null,
        reviewedAt: null,
      }
    : {
        status: "not_requested" as const,
        decision: null,
        reason: null,
        error: null,
        reviewedAt: null,
      };
  const comment: Comment = {
    id: `comment_${crypto.randomUUID()}`,
    postId: post.id,
    parentId,
    authorUserId: input.authorUserId ?? null,
    authorName,
    authorEmailHash: await digestText(authorEmail),
    authorWebsite,
    body,
    status,
    aiModeration: aiModerationRecord,
    createdAt: now,
  };

  if (input.locale === "zh") {
    comment.i18n = {
      body: { zh: body },
    };
  }

  await db.insert(schema.comments).values({
    id: comment.id,
    postId: comment.postId,
    parentId: comment.parentId,
    authorUserId: comment.authorUserId,
    authorName: comment.authorName,
    authorEmailHash: comment.authorEmailHash,
    authorWebsite: comment.authorWebsite,
    body: comment.body,
    i18n: comment.i18n ?? null,
    status: comment.status,
    aiModerationStatus: aiModerationRecord.status,
    aiModerationDecision: aiModerationRecord.decision,
    aiModerationReason: aiModerationRecord.reason,
    aiModerationError: aiModerationRecord.error,
    aiModerationReviewedAt: aiModerationRecord.reviewedAt,
    createdAt: comment.createdAt,
    updatedAt: now,
  });

  return {
    data: {
      comment,
      postTitle: post.title,
      aiModeration,
    },
  };
}

export async function listD1ApprovedComments(postId: string) {
  const db = getCmsDb();
  const rows = await db
    .select()
    .from(schema.comments)
    .where(and(eq(schema.comments.postId, postId), eq(schema.comments.status, "approved")))
    .orderBy(asc(schema.comments.createdAt));

  const comments = rows.map(drizzleRowToComment);
  const approvedIds = new Set(comments.map((comment) => comment.id));

  return comments.filter((comment) => !comment.parentId || approvedIds.has(comment.parentId));
}

export async function updateD1CommentStatus(id: string, status: CommentStatus) {
  const db = getCmsDb();

  await db
    .update(schema.comments)
    .set({ status, updatedAt: new Date().toISOString() })
    .where(eq(schema.comments.id, id));

  const rows = await db.select().from(schema.comments).where(eq(schema.comments.id, id)).limit(1);

  return rows[0] ? drizzleRowToComment(rows[0]) : undefined;
}

export function moderateD1Comment(id: string, status: Exclude<CommentStatus, "pending">) {
  return updateD1CommentStatus(id, status);
}

export async function resolveD1CommentAiModeration({
  comment,
  moderation,
}: {
  comment: Comment;
  moderation: D1CommentAiModerationTask;
}) {
  const outcome = await resolveAiCommentModerationOutcome({
    baseStatus: moderation.baseStatus,
    body: moderation.body,
    requireApproval: moderation.requireApproval,
    rules: moderation.rules,
  });
  const db = getCmsDb();

  await db
    .update(schema.comments)
    .set({
      status: outcome.status,
      aiModerationStatus: outcome.audit.status,
      aiModerationDecision: outcome.audit.decision,
      aiModerationReason: outcome.audit.reason,
      aiModerationError: outcome.audit.error,
      aiModerationReviewedAt: outcome.audit.reviewedAt,
      updatedAt: outcome.audit.reviewedAt,
    })
    .where(eq(schema.comments.id, comment.id));

  const rows = await db
    .select()
    .from(schema.comments)
    .where(eq(schema.comments.id, comment.id))
    .limit(1);

  return rows[0]
    ? drizzleRowToComment(rows[0])
    : { ...comment, status: outcome.status, aiModeration: outcome.audit };
}

export async function listD1Comments() {
  const db = getCmsDb();
  const rows = await db.select().from(schema.comments).orderBy(desc(schema.comments.createdAt));

  return rows.map(drizzleRowToComment);
}
