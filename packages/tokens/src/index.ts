export const kentraThemeNames = ["light", "dark"] as const;

export type KentraThemeName = (typeof kentraThemeNames)[number];

export const tokens = {
  color: {
    surface: "var(--kentra-color-surface)",
    text: "var(--kentra-color-text)",
    primary: "var(--kentra-color-primary)"
  }
} as const;
