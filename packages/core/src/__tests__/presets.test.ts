import { describe, expect, it } from "vitest";

import { normalizeLayoutPreset, normalizeThemePreset } from "../presets";

describe("normalizeThemePreset", () => {
  it("keeps supported presets", () => {
    expect(normalizeThemePreset("maker", "editorial")).toBe("maker");
    expect(normalizeThemePreset("apple", "maker")).toBe("apple");
    expect(normalizeThemePreset("editorial", "maker")).toBe("editorial");
    expect(normalizeThemePreset("brutalist", "maker")).toBe("brutalist");
  });

  it("maps legacy aliases to editorial", () => {
    expect(normalizeThemePreset("claude", "maker")).toBe("editorial");
    expect(normalizeThemePreset("editorial-edge", "maker")).toBe("editorial");
  });

  it("falls back for unknown or empty values", () => {
    expect(normalizeThemePreset(undefined, "maker")).toBe("maker");
    expect(normalizeThemePreset("unknown", "apple")).toBe("apple");
  });
});

describe("normalizeLayoutPreset", () => {
  it("keeps supported layouts", () => {
    expect(normalizeLayoutPreset("shelf", "developer")).toBe("shelf");
    expect(normalizeLayoutPreset("developer", "shelf")).toBe("developer");
    expect(normalizeLayoutPreset("journal", "shelf")).toBe("journal");
  });

  it("falls back for unknown values", () => {
    expect(normalizeLayoutPreset(undefined, "shelf")).toBe("shelf");
    expect(normalizeLayoutPreset("grid", "journal")).toBe("journal");
  });
});
