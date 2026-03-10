import { tokens } from "../../tokens";

const baseTextInputStyle = {
  size: {
    minHeight: tokens.global.baseStyle.space.step10,
    paddingY: tokens.global.baseStyle.space.step2,
    paddingX: tokens.global.baseStyle.space.step3,
    gap: tokens.global.baseStyle.space.step2,
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

export const textInputTokens = {
  styles: {
    default: {
      default: {
        ...baseTextInputStyle,
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.colors.input.border,
          placeholder: tokens.theme.colors.input.placeholder,
        },
      },
      focusVisible: {
        ...baseTextInputStyle,
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.interactionState.focus.ring,
          placeholder: tokens.theme.colors.input.placeholder,
        },
      },
      disabled: {
        ...baseTextInputStyle,
        colors: {
          bg: tokens.theme.colors.input.disabledBg,
          text: tokens.theme.colors.input.disabledText,
          border: tokens.theme.colors.input.disabledBorder,
          placeholder: tokens.theme.interactionState.disabled.text,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      readonly: {
        ...baseTextInputStyle,
        colors: {
          bg: tokens.theme.colors.background.elevated,
          text: tokens.theme.colors.text.secondary,
          border: tokens.theme.colors.border.subtle,
          placeholder: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        ...baseTextInputStyle,
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.colors.state.danger.fg,
          placeholder: tokens.theme.colors.input.placeholder,
        },
      },
    },
    withPrefix: {
      default: {
        ...baseTextInputStyle,
        size: {
          ...baseTextInputStyle.size,
          paddingX: tokens.global.baseStyle.space.step2,
          prefixGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.colors.input.border,
          placeholder: tokens.theme.colors.input.placeholder,
          prefix: tokens.theme.colors.text.secondary,
        },
      },
      focusVisible: {
        ...baseTextInputStyle,
        size: {
          ...baseTextInputStyle.size,
          paddingX: tokens.global.baseStyle.space.step2,
          prefixGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.interactionState.focus.ring,
          placeholder: tokens.theme.colors.input.placeholder,
          prefix: tokens.theme.colors.text.secondary,
        },
      },
      disabled: {
        ...baseTextInputStyle,
        size: {
          ...baseTextInputStyle.size,
          paddingX: tokens.global.baseStyle.space.step2,
          prefixGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          bg: tokens.theme.colors.input.disabledBg,
          text: tokens.theme.colors.input.disabledText,
          border: tokens.theme.colors.input.disabledBorder,
          placeholder: tokens.theme.interactionState.disabled.text,
          prefix: tokens.theme.interactionState.disabled.icon,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      readonly: {
        ...baseTextInputStyle,
        size: {
          ...baseTextInputStyle.size,
          paddingX: tokens.global.baseStyle.space.step2,
          prefixGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          text: tokens.theme.colors.text.secondary,
          border: tokens.theme.colors.border.subtle,
          placeholder: tokens.theme.colors.text.secondary,
          prefix: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        ...baseTextInputStyle,
        size: {
          ...baseTextInputStyle.size,
          paddingX: tokens.global.baseStyle.space.step2,
          prefixGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.colors.state.danger.fg,
          placeholder: tokens.theme.colors.input.placeholder,
          prefix: tokens.theme.colors.state.danger.fg,
        },
      },
    },
    withSuffix: {
      default: {
        ...baseTextInputStyle,
        size: {
          ...baseTextInputStyle.size,
          paddingX: tokens.global.baseStyle.space.step2,
          suffixGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.colors.input.border,
          placeholder: tokens.theme.colors.input.placeholder,
          suffix: tokens.theme.colors.text.secondary,
        },
      },
      focusVisible: {
        ...baseTextInputStyle,
        size: {
          ...baseTextInputStyle.size,
          paddingX: tokens.global.baseStyle.space.step2,
          suffixGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.interactionState.focus.ring,
          placeholder: tokens.theme.colors.input.placeholder,
          suffix: tokens.theme.colors.text.secondary,
        },
      },
      disabled: {
        ...baseTextInputStyle,
        size: {
          ...baseTextInputStyle.size,
          paddingX: tokens.global.baseStyle.space.step2,
          suffixGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          bg: tokens.theme.colors.input.disabledBg,
          text: tokens.theme.colors.input.disabledText,
          border: tokens.theme.colors.input.disabledBorder,
          placeholder: tokens.theme.interactionState.disabled.text,
          suffix: tokens.theme.interactionState.disabled.icon,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      readonly: {
        ...baseTextInputStyle,
        size: {
          ...baseTextInputStyle.size,
          paddingX: tokens.global.baseStyle.space.step2,
          suffixGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          text: tokens.theme.colors.text.secondary,
          border: tokens.theme.colors.border.subtle,
          placeholder: tokens.theme.colors.text.secondary,
          suffix: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        ...baseTextInputStyle,
        size: {
          ...baseTextInputStyle.size,
          paddingX: tokens.global.baseStyle.space.step2,
          suffixGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          bg: tokens.theme.colors.input.bg,
          text: tokens.theme.colors.input.text,
          border: tokens.theme.colors.state.danger.fg,
          placeholder: tokens.theme.colors.input.placeholder,
          suffix: tokens.theme.colors.state.danger.fg,
        },
      },
    },
  },
} as const;

export type TextInputTokensContract = typeof textInputTokens;
export type TextInputVariant = keyof TextInputTokensContract["styles"];
export type TextInputState = keyof TextInputTokensContract["styles"]["default"];
