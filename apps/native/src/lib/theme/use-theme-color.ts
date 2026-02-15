import { useCSSVariable } from "uniwind";

/**
 * Theme color names (suffix after --color-).
 * Ordered for efficient batch retrieval. Matches variables in src/tailwind.css.
 */
export const THEME_COLORS = [
  /* Static */
  "black",
  "white",
  "gray",
  /* Accents */
  "red",
  "orange",
  "yellow",
  "green",
  "mint",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "pink",
  "brown",
  /* Backgrounds */
  "background-primary",
  "background-secondary",
  "background-tertiary",
  "background-grouped-primary",
  "background-grouped-secondary",
  "background-grouped-tertiary",
  /* Fills */
  "fill-primary",
  "fill-secondary",
  "fill-tertiary",
  "fill-quaternary",
  /* Grays */
  "gray-2",
  "gray-3",
  "gray-4",
  "gray-5",
  "gray-6",
  /* Labels */
  "label-primary",
  "label-secondary",
  "label-tertiary",
  "label-quaternary",
  /* Separators */
  "separator-opaque",
  "separator-non-opaque",
] as const;

export type ThemeColor = (typeof THEME_COLORS)[number];

function toColorString(value: string | number | undefined): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);

  return "transparent";
}

/**
 * Retrieves theme color value(s) from CSS variables via Uniwind.
 * Use for Expo UI (background, foregroundStyle, etc.) so colors stay in sync with Tailwind.
 *
 * @param themeColor - Single theme color name or array (array is more efficient)
 * @returns Resolved color string(s)
 *
 * @example
 * const secondary = useThemeColor('background-secondary');
 * const [primary, label] = useThemeColor(['background-primary', 'label-secondary']);
 */
export function useThemeColor(themeColor: ThemeColor): string;
export function useThemeColor(themeColor: ThemeColor[]): string[];
export function useThemeColor(
  themeColor: ThemeColor | ThemeColor[],
): string | string[] {
  const isArray = Array.isArray(themeColor);
  const names = isArray ? themeColor : [themeColor];
  const cssVars = names.map((name) => `--color-${name}` as const);
  const resolved = useCSSVariable(cssVars);
  const processed = (Array.isArray(resolved) ? resolved : [resolved]).map(
    toColorString,
  );
  if (isArray) {
    return processed;
  }

  return processed[0] ?? "transparent";
}
