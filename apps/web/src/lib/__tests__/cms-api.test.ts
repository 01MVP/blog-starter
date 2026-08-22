import { describe, it, expect, vi } from "vitest";

// Mock @repo/core to avoid pulling in the full demo-data store
vi.mock("@repo/core", () => ({
  siteSettings: { primaryLanguage: "en", url: "https://example.com" },
  resolveLocale: (locale?: string) => (locale === "zh" ? "zh" : "en"),
  slugify: (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9一-龥]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 96),
  findPost: vi.fn(),
  localizePost: vi.fn((_post: any, _locale: string) => _post),
  createPost: vi.fn((input: any) => ({
    id: "post-123",
    slug: input.slug ?? "default-slug",
    title: input.title,
    status: input.status ?? "draft",
    locale: input.locale ?? "en",
  })),
  posts: [],
  comments: [],
  assets: [],
  getApprovedCommentsForPostForLocale: vi.fn(() => []),
  getSiteSettingsForLocale: vi.fn(() => ({})),
  getTagsForLocale: vi.fn(() => []),
}));

// Mock cms-d1 to prevent it from loading @repo/db/schema/cms
vi.mock("#/lib/cms-d1", () => ({
  buildD1SiteExport: vi.fn(),
  getD1PostByIdOrSlug: vi.fn(),
}));

import { createPostPreview, jsonResponse, readJsonBody, getApiLocale } from "../cms-api";

describe("jsonResponse", () => {
  it("returns a Response with JSON body", async () => {
    const res = jsonResponse({ ok: true });
    expect(res).toBeInstanceOf(Response);
    const body = await res.json();
    expect(body).toEqual({ ok: true });
  });

  it("sets cache-control: no-store by default", () => {
    const res = jsonResponse({ data: 1 });
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("sets status code from init", () => {
    const res = jsonResponse({ error: "not found" }, { status: 404 });
    expect(res.status).toBe(404);
  });

  it("merges custom headers", () => {
    const res = jsonResponse({}, { headers: { "x-request-id": "abc" } });
    expect(res.headers.get("x-request-id")).toBe("abc");
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("handles Set-Cookie headers via getSetCookie()", () => {
    const cookieHeaders = new Headers();
    cookieHeaders.append("set-cookie", "session=abc; Path=/");
    cookieHeaders.append("set-cookie", "csrf=xyz; Path=/; HttpOnly");
    (cookieHeaders as any).getSetCookie = () => [
      "session=abc; Path=/",
      "csrf=xyz; Path=/; HttpOnly",
    ];

    const res = jsonResponse({ ok: true }, { headers: cookieHeaders });
    const setCookieValues = res.headers.getSetCookie();
    expect(setCookieValues).toHaveLength(2);
    expect(setCookieValues[0]).toContain("session=abc");
    expect(setCookieValues[1]).toContain("csrf=xyz");
  });
});

describe("readJsonBody", () => {
  it("parses valid JSON body", async () => {
    const request = new Request("http://localhost/api", {
      method: "POST",
      body: JSON.stringify({ title: "Hello" }),
      headers: { "content-type": "application/json" },
    });
    const body = await readJsonBody(request);
    expect(body).toEqual({ title: "Hello" });
  });

  it("rejects invalid JSON with a 400 response", async () => {
    const request = new Request("http://localhost/api", {
      method: "POST",
      body: "not-json{{{",
    });
    const response = await readJsonBody(request).catch((error: unknown) => error);

    expect(response).toBeInstanceOf(Response);
    expect((response as Response).status).toBe(400);
    await expect((response as Response).json()).resolves.toEqual({
      error: "Malformed JSON body",
    });
  });

  it("returns empty object for empty body", async () => {
    const request = new Request("http://localhost/api", {
      method: "POST",
      body: "",
    });
    const body = await readJsonBody(request);
    expect(body).toEqual({});
  });

  it("handles nested JSON objects", async () => {
    const data = { user: { name: "Alice", tags: ["a", "b"] } };
    const request = new Request("http://localhost/api", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const body = await readJsonBody(request);
    expect(body).toEqual(data);
  });

  it("returns empty object for JSON null", async () => {
    const request = new Request("http://localhost/api", {
      method: "POST",
      body: "null",
    });
    const body = await readJsonBody(request);
    expect(body).toEqual({});
  });

  it("returns empty object for JSON arrays", async () => {
    const request = new Request("http://localhost/api", {
      method: "POST",
      body: JSON.stringify([{ title: "Hello" }]),
    });
    const body = await readJsonBody(request);
    expect(body).toEqual({});
  });

  it("returns empty object for JSON strings", async () => {
    const request = new Request("http://localhost/api", {
      method: "POST",
      body: JSON.stringify("hello"),
    });
    const body = await readJsonBody(request);
    expect(body).toEqual({});
  });
});

describe("getApiLocale", () => {
  it('returns "zh" when lang=zh query param is present', () => {
    const request = new Request("http://localhost/api?lang=zh");
    expect(getApiLocale(request)).toBe("zh");
  });

  it('returns "en" when lang=en query param is present', () => {
    const request = new Request("http://localhost/api?lang=en");
    expect(getApiLocale(request)).toBe("en");
  });

  it('returns "zh" when Accept-Language contains zh', () => {
    const request = new Request("http://localhost/api", {
      headers: { "accept-language": "zh-CN,zh;q=0.9,en;q=0.8" },
    });
    expect(getApiLocale(request)).toBe("zh");
  });

  it("falls back to primaryLanguage when no locale hints", () => {
    const request = new Request("http://localhost/api", {
      headers: { "accept-language": "en-US,en;q=0.9" },
    });
    expect(getApiLocale(request)).toBe("en");
  });

  it("query param takes priority over Accept-Language", () => {
    const request = new Request("http://localhost/api?lang=zh", {
      headers: { "accept-language": "en-US,en;q=0.9" },
    });
    expect(getApiLocale(request)).toBe("zh");
  });

  it("honors Accept-Language q-values", () => {
    const request = new Request("http://localhost/api", {
      headers: { "accept-language": "en-US,en;q=0.9,zh-CN;q=0.4" },
    });
    expect(getApiLocale(request)).toBe("en");
  });

  it("ignores languages with q=0", () => {
    const request = new Request("http://localhost/api", {
      headers: { "accept-language": "zh-CN;q=0,en-US;q=0.8" },
    });
    expect(getApiLocale(request)).toBe("en");
  });

  it("falls back when Accept-Language has no supported locale", () => {
    const request = new Request("http://localhost/api", {
      headers: { "accept-language": "fr-FR,fr;q=0.9" },
    });
    expect(getApiLocale(request)).toBe("en");
  });
});

describe("createPostPreview", () => {
  it("slugifies English titles", () => {
    const preview = createPostPreview({ title: "Hello World" });
    expect(preview.slug).toBe("hello-world");
  });

  it("preserves Chinese characters in generated slugs", () => {
    const preview = createPostPreview({ title: "你好世界" });
    expect(preview.slug).toBe("你好世界");
  });

  it("uses an explicit slug when provided", () => {
    const preview = createPostPreview({ title: "Hello World", slug: "custom-slug" });
    expect(preview.slug).toBe("custom-slug");
  });
});
