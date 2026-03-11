import { tokens } from "../../core";

const baseTextareaStyle = {
  size: {
    minHeight: tokens.global.baseStyle.space.step16,
    paddingY: tokens.global.baseStyle.space.step3,
    paddingX: tokens.global.baseStyle.space.step3,
  },
  border: {
    width: tokens.global.baseStyle.borderWidth.thin,
    radius: tokens.global.baseStyle.radius.md,
  },
  typography: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.body.md.fontSize,
    lineHeight: tokens.global.typography.semantic.body.md.lineHeight,
    fontWeight: tokens.global.typography.semantic.body.fontWeight,
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

export const textareaTokens = {
  styles: {
    default: {
      default: {
        ...baseTextareaStyle,
        resize: "vertical",
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.colors.input.border,
          placeholder: tokens.theme.colors.input.placeholder,
        },
      },
      focusVisible: {
        ...baseTextareaStyle,
        resize: "vertical",
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.interactionState.focus.ring,
          placeholder: tokens.theme.colors.input.placeholder,
        },
      },
      disabled: {
        ...baseTextareaStyle,
        resize: "none",
        colors: {
          bg: tokens.theme.colors.input.disabledBg,
          text: tokens.theme.colors.input.disabledText,
          border: tokens.theme.colors.input.disabledBorder,
          placeholder: tokens.theme.interactionState.disabled.text,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      readonly: {
        ...baseTextareaStyle,
        resize: "none",
        colors: {
          bg: tokens.theme.colors.background.elevated,
          text: tokens.theme.colors.text.secondary,
          border: tokens.theme.colors.border.subtle,
          placeholder: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        ...baseTextareaStyle,
        resize: "vertical",
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.colors.state.danger.fg,
          placeholder: tokens.theme.colors.input.placeholder,
        },
      },
    },
    autoResize: {
      default: {
        ...baseTextareaStyle,
        resize: "none",
        autoResize: true,
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.colors.input.border,
          placeholder: tokens.theme.colors.input.placeholder,
        },
      },
      focusVisible: {
        ...baseTextareaStyle,
        resize: "none",
        autoResize: true,
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.interactionState.focus.ring,
          placeholder: tokens.theme.colors.input.placeholder,
        },
      },
      disabled: {
        ...baseTextareaStyle,
        resize: "none",
        autoResize: true,
        colors: {
          bg: tokens.theme.colors.input.disabledBg,
          text: tokens.theme.colors.input.disabledText,
          border: tokens.theme.colors.input.disabledBorder,
          placeholder: tokens.theme.interactionState.disabled.text,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      readonly: {
        ...baseTextareaStyle,
        resize: "none",
        autoResize: true,
        colors: {
          bg: tokens.theme.colors.background.elevated,
          text: tokens.theme.colors.text.secondary,
          border: tokens.theme.colors.border.subtle,
          placeholder: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        ...baseTextareaStyle,
        resize: "none",
        autoResize: true,
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.colors.state.danger.fg,
          placeholder: tokens.theme.colors.input.placeholder,
        },
      },
    },
  },
} as const;

export type TextareaTokensContract = typeof textareaTokens;
export type TextareaVariant = keyof TextareaTokensContract["styles"];
export type TextareaState = keyof TextareaTokensContract["styles"]["default"];
