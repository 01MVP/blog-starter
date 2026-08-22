import "@tanstack/react-start/server-only";
import { digestText, type ApiTokenScope } from "@repo/core";
import * as schema from "@repo/db/schema/cms";
import { and, desc, eq, or, sql } from "drizzle-orm";

import { drizzleRowToApiToken } from "./cms-d1-shared";
import { getCmsDb } from "./cms-db";

export async function createD1ApiToken(input: {
  name?: string;
  scopes?: ApiTokenScope[];
  expiresAt?: string | null;
}) {
  const secret = `blogcms_${crypto.randomUUID().replace(/-/g, "")}`;
  const token = {
    id: `token_${crypto.randomUUID()}`,
    name: input.name?.trim() || "Automation token",
    tokenPrefix: secret.slice(0, 16),
    scopes: input.scopes?.length ? input.scopes : ["posts:read", "posts:write"],
    expiresAt: input.expiresAt ?? null,
    lastUsedAt: null,
    revokedAt: null,
    createdAt: new Date().toISOString(),
  };

  const db = getCmsDb();
  await db.insert(schema.apiTokens).values({
    id: token.id,
    name: token.name,
    tokenHash: await digestText(secret),
    scopes: token.scopes,
    expiresAt: token.expiresAt,
    lastUsedAt: token.lastUsedAt,
    revokedAt: token.revokedAt,
    createdAt: token.createdAt,
  });

  return { token, secret };
}

export async function listD1ApiTokens() {
  const db = getCmsDb();
  const rows = await db.select().from(schema.apiTokens).orderBy(desc(schema.apiTokens.createdAt));

  return rows.map(drizzleRowToApiToken);
}

export async function revokeD1ApiToken(id: string) {
  const db = getCmsDb();

  await db
    .update(schema.apiTokens)
    .set({ revokedAt: new Date().toISOString() })
    .where(and(eq(schema.apiTokens.id, id), sql`${schema.apiTokens.revokedAt} is null`));

  const rows = await db.select().from(schema.apiTokens).where(eq(schema.apiTokens.id, id)).limit(1);

  return rows[0] ? drizzleRowToApiToken(rows[0]) : undefined;
}

export async function verifyD1ApiToken(secret: string, requiredScope: ApiTokenScope) {
  const db = getCmsDb();
  const now = new Date().toISOString();
  const rows = await db
    .select()
    .from(schema.apiTokens)
    .where(
      and(
        eq(schema.apiTokens.tokenHash, await digestText(secret)),
        sql`${schema.apiTokens.revokedAt} is null`,
        or(sql`${schema.apiTokens.expiresAt} is null`, sql`${schema.apiTokens.expiresAt} > ${now}`),
      ),
    )
    .limit(1);

  const row = rows[0];

  if (!row) {
    return null;
  }

  const token = drizzleRowToApiToken(row);

  if (!token.scopes.includes(requiredScope)) {
    return null;
  }

  await db
    .update(schema.apiTokens)
    .set({ lastUsedAt: now })
    .where(eq(schema.apiTokens.id, token.id));

  return token;
}
