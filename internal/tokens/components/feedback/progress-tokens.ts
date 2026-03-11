import { tokens } from "../../core";

const progressBaseStyle = {
  track: {
    height: tokens.global.baseStyle.space.step2,
    borderRadius: tokens.global.baseStyle.radius.pill,
  },
  label: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.caption.fontSize,
    lineHeight: tokens.global.typography.semantic.caption.lineHeight,
    fontWeight: tokens.global.typography.semantic.label.fontWeight,
    gap: tokens.global.baseStyle.space.step2,
  },
  motion: {
    duration: tokens.global.baseStyle.motion.duration.normal,
    easing: tokens.global.baseStyle.motion.ease.standard,
  },
} as const;

export const progressTokens = {
  styles: {
    determinate: {
      default: {
        ...progressBaseStyle,
        colors: {
          track: tokens.theme.colors.background.elevated,
          indicator: tokens.theme.colors.action.primary.bg,
          label: tokens.theme.colors.text.secondary,
        },
      },
      paused: {
        ...progressBaseStyle,
        pausedOpacity: tokens.theme.interactionState.disabled.opacity,
        colors: {
          track: tokens.theme.colors.background.elevated,
          indicator: tokens.theme.interactionState.disabled.border,
          label: tokens.theme.interactionState.disabled.text,
        },
      },
    },
    indeterminate: {
      default: {
        ...progressBaseStyle,
        animation: {
          duration: tokens.global.baseStyle.motion.duration.slow,
          easing: tokens.global.baseStyle.motion.ease.standard,
        },
        colors: {
          track: tokens.theme.colors.background.elevated,
          indicator: tokens.theme.colors.action.primary.bg,
          label: tokens.theme.colors.text.secondary,
        },
      },
      paused: {
        ...progressBaseStyle,
        animation: {
          duration: tokens.global.baseStyle.motion.duration.slow,
          easing: tokens.global.baseStyle.motion.ease.standard,
          playState: "paused",
        },
        pausedOpacity: tokens.theme.interactionState.disabled.opacity,
        colors: {
          track: tokens.theme.colors.background.elevated,
          indicator: tokens.theme.interactionState.disabled.border,
          label: tokens.theme.interactionState.disabled.text,
        },
      },
    },
  },
} as const;

export type ProgressTokensContract = typeof progressTokens;
export type ProgressVariant = keyof ProgressTokensContract["styles"];
export type ProgressState = keyof ProgressTokensContract["styles"]["determinate"];
