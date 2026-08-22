import type { LayoutPreset, ThemePreset } from "./types";

const themePresets = ["maker", "apple", "editorial", "brutalist"] as const;
const themeAliases: Record<string, ThemePreset> = {
  claude: "editorial",
  "editorial-edge": "editorial",
};

export function normalizeThemePreset(
  value: string | undefined,
  fallback: ThemePreset,
): ThemePreset {
  if (value && themePresets.includes(value as ThemePreset)) {
    return value as ThemePreset;
  }

  if (value && value in themeAliases) {
    return themeAliases[value];
  }

  return fallback;
}

export function normalizeLayoutPreset(
  value: string | undefined,
  fallback: LayoutPreset,
): LayoutPreset {
  return value === "developer" || value === "journal" || value === "shelf" ? value : fallback;
}
