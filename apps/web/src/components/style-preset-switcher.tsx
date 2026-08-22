import {
  normalizeThemePreset,
  type LayoutPreset,
  type SupportedLocale,
  type ThemePreset,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { PaletteIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type StylePresetId = "maker-shelf" | "apple-shelf" | "editorial-shelf" | "brutalist-shelf";

export type StylePresetOption = {
  id: StylePresetId;
  themePreset: ThemePreset;
  layoutPreset: LayoutPreset;
  label: Record<SupportedLocale, string>;
};

const stylePresetStorageKey = "blogcms:style-preset";

const defaultStylePreset: StylePresetOption = {
  id: "maker-shelf",
  themePreset: "maker",
  layoutPreset: "shelf",
  label: {
    en: "Monochrome",
    zh: "黑白极简",
  },
};

export const stylePresetOptions: StylePresetOption[] = [
  defaultStylePreset,
  {
    id: "apple-shelf",
    themePreset: "apple",
    layoutPreset: "shelf",
    label: {
      en: "Apple Rounded",
      zh: "苹果圆角",
    },
  },
  {
    id: "editorial-shelf",
    themePreset: "editorial",
    layoutPreset: "shelf",
    label: {
      en: "Warm Editorial",
      zh: "暖调人文",
    },
  },
  {
    id: "brutalist-shelf",
    themePreset: "brutalist",
    layoutPreset: "shelf",
    label: {
      en: "Brutalist",
      zh: "野兽派",
    },
  },
];

export function StylePresetCycleButton({
  className,
  locale,
  nextPreset,
  onSelect,
}: {
  readonly className?: string;
  readonly locale: SupportedLocale;
  readonly nextPreset: StylePresetOption;
  readonly onSelect?: (preset: StylePresetOption) => void;
}) {
  const label = getStylePresetSwitchLabel(locale, nextPreset);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      data-style-preset-switcher
      onClick={() => onSelect?.(nextPreset)}
      className={className}
    >
      <PaletteIcon className="size-4" />
      <span data-style-preset-label className="sr-only">
        {nextPreset.label[locale]}
      </span>
    </Button>
  );
}

function getStylePresetSwitchLabel(locale: SupportedLocale, nextPreset: StylePresetOption) {
  return locale === "zh" ? `切换到 ${nextPreset.label.zh}` : `Switch to ${nextPreset.label.en}`;
}

function getPresetForAttributes(themePreset?: string, layoutPreset?: string) {
  const normalizedThemePreset = normalizeThemePreset(themePreset, defaultStylePreset.themePreset);

  return (
    stylePresetOptions.find(
      (preset) =>
        preset.themePreset === normalizedThemePreset && preset.layoutPreset === layoutPreset,
    ) ??
    stylePresetOptions.find((preset) => preset.themePreset === normalizedThemePreset) ??
    defaultStylePreset
  );
}

function getPresetForId(id?: string | null) {
  return stylePresetOptions.find((preset) => preset.id === id) ?? null;
}

function getStoredStylePreset() {
  if (typeof window === "undefined") return null;

  try {
    return getPresetForId(window.localStorage.getItem(stylePresetStorageKey));
  } catch {
    return null;
  }
}

function storeStylePreset(preset: StylePresetOption) {
  try {
    window.localStorage.setItem(stylePresetStorageKey, preset.id);
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

function clearStoredStylePreset() {
  try {
    window.localStorage.removeItem(stylePresetStorageKey);
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

export function useStylePreset(settingsPreset: StylePresetOption) {
  const [presetOverride, setPresetOverride] = useState<StylePresetOption | null>(null);
  const preset = presetOverride ?? settingsPreset;

  useEffect(() => {
    const syncId = window.setTimeout(() => {
      setPresetOverride(getStoredStylePreset());
    }, 0);

    return () => window.clearTimeout(syncId);
  }, []);

  const selectPreset = useCallback((nextPreset: StylePresetOption) => {
    setPresetOverride(nextPreset);

    if (typeof window !== "undefined") {
      storeStylePreset(nextPreset);
    }
  }, []);

  const resetPreset = useCallback(() => {
    setPresetOverride(null);

    if (typeof window !== "undefined") {
      clearStoredStylePreset();
    }
  }, []);

  return {
    preset,
    nextPreset: getNextStylePreset(preset),
    selectPreset,
    resetPreset,
  };
}

export function StylePresetRuntimeScript({
  initialPreset,
  locale,
}: {
  readonly initialPreset: StylePresetOption;
  readonly locale: SupportedLocale;
}) {
  const payload = JSON.stringify({
    initialId: initialPreset.id,
    locale,
    presets: stylePresetOptions,
    storageKey: stylePresetStorageKey,
  }).replaceAll("<", "\\u003c");

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(() => {
  const config = ${payload};
  const presets = config.presets;
  const labelLocale = config.locale === "zh" ? "zh" : "en";

  function getPreset(id) {
    return getPresetById(id) || presets[0];
  }

  function getPresetById(id) {
    return presets.find((preset) => preset.id === id) || null;
  }

  function getStoredPreset() {
    try {
      return getPresetById(localStorage.getItem(config.storageKey));
    } catch {
      return null;
    }
  }

  function storePreset(preset) {
    try {
      localStorage.setItem(config.storageKey, preset.id);
    } catch {}
  }

  function clearStoredPreset() {
    try {
      localStorage.removeItem(config.storageKey);
    } catch {}
  }

  function getPresetForAttributes(themePreset, layoutPreset) {
    const normalizedThemePreset =
      themePreset === "claude" || themePreset === "editorial-edge" ? "editorial" : themePreset;

    return (
      presets.find(
        (preset) =>
          preset.themePreset === normalizedThemePreset && preset.layoutPreset === layoutPreset,
      ) ||
      presets.find((preset) => preset.themePreset === normalizedThemePreset) ||
      presets[0]
    );
  }

  let activeId = (getStoredPreset() || getPreset(config.initialId)).id;

  function getCurrentPreset(root) {
    return (
      getPresetForAttributes(root.dataset.themePreset, root.dataset.layoutPreset) ||
      getPreset(activeId)
    );
  }

  function getNextPreset(preset) {
    const index = presets.findIndex((item) => item.id === preset.id);
    return presets[(index + 1) % presets.length] || presets[0];
  }

  function updateButton(button, nextPreset) {
    const label =
      labelLocale === "zh"
        ? "切换到 " + nextPreset.label.zh
        : "Switch to " + nextPreset.label.en;
    button.setAttribute("aria-label", label);
    button.removeAttribute("title");
    const visibleLabel = button.querySelector("[data-style-preset-label]");
    if (visibleLabel) {
      visibleLabel.textContent = nextPreset.label[labelLocale];
    }
  }

  function updateButtons(root) {
    const nextPreset = getNextPreset(getCurrentPreset(root));
    document.querySelectorAll("[data-style-preset-switcher]").forEach((button) =>
      updateButton(button, nextPreset),
    );
  }

  function applyPreset(root, preset, options) {
    root.dataset.themePreset = preset.themePreset;
    root.dataset.layoutPreset = preset.layoutPreset;
    activeId = preset.id;
    if (options && options.persist) storePreset(preset);
    if (!options || options.updateButtons !== false) updateButtons(root);
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest("[data-style-preset-switcher]");
    if (!button) return;

    const root = button.closest("[data-theme-preset][data-layout-preset]");
    if (!root) return;

    event.preventDefault();
    applyPreset(root, getNextPreset(getCurrentPreset(root)), {
      persist: true,
      updateButtons: false,
    });
  });

  window.addEventListener("blogcms:site-settings-updated", (event) => {
    const root = document.querySelector("[data-theme-preset][data-layout-preset]");
    const detail = event.detail || {};
    if (!root || !detail.themePreset) return;
    clearStoredPreset();
    applyPreset(root, getPresetForAttributes(detail.themePreset, detail.layoutPreset), {
      updateButtons: false,
    });
  });

  const root = document.querySelector("[data-theme-preset][data-layout-preset]");
  if (root) {
    const storedPreset = getStoredPreset();
    if (storedPreset) {
      applyPreset(root, storedPreset, { updateButtons: false });
    } else {
      updateButtons(root);
    }
  }
})();`,
      }}
    />
  );
}

export function resolveStylePreset(themePreset: ThemePreset, layoutPreset: LayoutPreset) {
  return getPresetForAttributes(themePreset, layoutPreset);
}

export function getNextStylePreset(currentPreset: StylePresetOption) {
  const currentIndex = stylePresetOptions.findIndex((preset) => preset.id === currentPreset.id);
  return stylePresetOptions[(currentIndex + 1) % stylePresetOptions.length] ?? defaultStylePreset;
}
