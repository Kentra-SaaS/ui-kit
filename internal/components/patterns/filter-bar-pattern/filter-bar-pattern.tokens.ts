import { tokens } from "../../../core/tokens";

const baseFilterBarPatternStyle = {
  container: {
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    borderRadius: tokens.global.baseStyle.radius.md,
    paddingX: tokens.global.baseStyle.space.step4,
    paddingY: tokens.global.baseStyle.space.step3,
  },
  spacing: {
    sectionGap: tokens.global.baseStyle.space.step3,
    primaryGap: tokens.global.baseStyle.space.step2,
    secondaryGap: tokens.global.baseStyle.space.step2,
    chipsGap: tokens.global.baseStyle.space.step2,
  },
  slots: {
    minSearchWidth: "14rem",
    minFilterWidth: "10rem",
  },
  focus: {
    ringColor: tokens.theme.interactionState.focus.ring,
    outlineColor: tokens.theme.interactionState.focus.outline,
    shadow: tokens.theme.elevation.shadow.focus,
  },
  motion: {
    duration: tokens.global.baseStyle.motion.duration.fast,
    easing: tokens.global.baseStyle.motion.ease.standard,
  },
} as const;

const defaultColors = {
  bg: tokens.theme.colors.background.surface,
  border: tokens.theme.colors.border.subtle,
  text: tokens.theme.colors.text.primary,
  mutedText: tokens.theme.colors.text.secondary,
} as const;

const disabledColors = {
  bg: tokens.theme.interactionState.disabled.bg,
  border: tokens.theme.interactionState.disabled.border,
  text: tokens.theme.interactionState.disabled.text,
  mutedText: tokens.theme.interactionState.disabled.text,
} as const;

export const filterBarPatternTokens = {
  styles: {
    base: baseFilterBarPatternStyle,
    inline: {
      default: {
        layout: {
          wrap: "nowrap",
          secondaryJustify: "flex-end",
        },
        colors: defaultColors,
      },
      disabled: {
        layout: {
          wrap: "nowrap",
          secondaryJustify: "flex-end",
        },
        colors: disabledColors,
      },
    },
    wrap: {
      default: {
        layout: {
          wrap: "wrap",
          secondaryJustify: "flex-start",
        },
        colors: defaultColors,
      },
      disabled: {
        layout: {
          wrap: "wrap",
          secondaryJustify: "flex-start",
        },
        colors: disabledColors,
      },
    },
    withChips: {
      default: {
        layout: {
          wrap: "wrap",
          secondaryJustify: "flex-start",
          chipsDisplay: "flex",
        },
        colors: defaultColors,
      },
      disabled: {
        layout: {
          wrap: "wrap",
          secondaryJustify: "flex-start",
          chipsDisplay: "flex",
        },
        colors: disabledColors,
      },
    },
  },
} as const;

export type FilterBarPatternTokensContract = typeof filterBarPatternTokens;
export type FilterBarPatternVariant = Exclude<
  keyof FilterBarPatternTokensContract["styles"],
  "base"
>;
export type FilterBarPatternState =
  keyof FilterBarPatternTokensContract["styles"]["inline"];
