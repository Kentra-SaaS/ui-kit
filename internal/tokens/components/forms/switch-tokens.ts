import { tokens } from "../../core";

const switchBaseStyle = {
  border: {
    width: tokens.global.baseStyle.borderWidth.thin,
    radius: tokens.global.baseStyle.radius.pill,
  },
  motion: {
    duration: tokens.global.baseStyle.motion.duration.fast,
    easing: tokens.global.baseStyle.motion.ease.standard,
  },
  focus: {
    ringColor: tokens.theme.interactionState.focus.ring,
    outlineColor: tokens.theme.interactionState.focus.outline,
    shadow: tokens.theme.elevation.shadow.focus,
  },
} as const;

export const switchTokens = {
  styles: {
    base: switchBaseStyle,
    default: {
      off: {
        size: {
          trackWidth: "2.75rem",
          trackHeight: "1.5rem",
          thumbSize: "1.125rem",
          padding: tokens.global.baseStyle.space.px,
        },
        colors: {
          trackBg: tokens.theme.colors.input.bg,
          trackBorder: tokens.theme.colors.input.border,
          thumb: tokens.theme.colors.background.surface,
        },
      },
      on: {
        size: {
          trackWidth: "2.75rem",
          trackHeight: "1.5rem",
          thumbSize: "1.125rem",
          padding: tokens.global.baseStyle.space.px,
        },
        colors: {
          trackBg: tokens.theme.colors.action.primary.bg,
          trackBorder: tokens.theme.colors.action.primary.bg,
          thumb: tokens.theme.colors.action.primary.text,
        },
      },
      focusVisible: {
        size: {
          trackWidth: "2.75rem",
          trackHeight: "1.5rem",
          thumbSize: "1.125rem",
          padding: tokens.global.baseStyle.space.px,
        },
        colors: {
          trackBg: tokens.theme.colors.input.bg,
          trackBorder: tokens.theme.interactionState.focus.ring,
          thumb: tokens.theme.colors.background.surface,
        },
      },
      disabled: {
        size: {
          trackWidth: "2.75rem",
          trackHeight: "1.5rem",
          thumbSize: "1.125rem",
          padding: tokens.global.baseStyle.space.px,
        },
        colors: {
          trackBg: tokens.theme.interactionState.disabled.bg,
          trackBorder: tokens.theme.interactionState.disabled.border,
          thumb: tokens.theme.interactionState.disabled.icon,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
    },
    compact: {
      off: {
        size: {
          trackWidth: "2.25rem",
          trackHeight: "1.25rem",
          thumbSize: "0.875rem",
          padding: tokens.global.baseStyle.space.px,
        },
        colors: {
          trackBg: tokens.theme.colors.input.bg,
          trackBorder: tokens.theme.colors.input.border,
          thumb: tokens.theme.colors.background.surface,
        },
      },
      on: {
        size: {
          trackWidth: "2.25rem",
          trackHeight: "1.25rem",
          thumbSize: "0.875rem",
          padding: tokens.global.baseStyle.space.px,
        },
        colors: {
          trackBg: tokens.theme.colors.action.primary.bg,
          trackBorder: tokens.theme.colors.action.primary.bg,
          thumb: tokens.theme.colors.action.primary.text,
        },
      },
      focusVisible: {
        size: {
          trackWidth: "2.25rem",
          trackHeight: "1.25rem",
          thumbSize: "0.875rem",
          padding: tokens.global.baseStyle.space.px,
        },
        colors: {
          trackBg: tokens.theme.colors.input.bg,
          trackBorder: tokens.theme.interactionState.focus.ring,
          thumb: tokens.theme.colors.background.surface,
        },
      },
      disabled: {
        size: {
          trackWidth: "2.25rem",
          trackHeight: "1.25rem",
          thumbSize: "0.875rem",
          padding: tokens.global.baseStyle.space.px,
        },
        colors: {
          trackBg: tokens.theme.interactionState.disabled.bg,
          trackBorder: tokens.theme.interactionState.disabled.border,
          thumb: tokens.theme.interactionState.disabled.icon,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
    },
  },
} as const;

export type SwitchTokensContract = typeof switchTokens;
export type SwitchVariant = Exclude<keyof SwitchTokensContract["styles"], "base">;
export type SwitchState = keyof SwitchTokensContract["styles"]["default"];
