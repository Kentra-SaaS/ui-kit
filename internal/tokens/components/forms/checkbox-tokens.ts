import { tokens } from "../../core";

const checkboxBaseStyle = {
  size: {
    control: tokens.global.baseStyle.space.step5,
    indicator: tokens.global.icon.size.sm,
    gap: tokens.global.baseStyle.space.step2,
  },
  border: {
    width: tokens.global.baseStyle.borderWidth.thin,
    radius: tokens.global.baseStyle.radius.sm,
  },
  label: {
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

export const checkboxTokens = {
  styles: {
    base: checkboxBaseStyle,
    default: {
      unchecked: {
        colors: {
          bg: tokens.theme.colors.input.bg,
          border: tokens.theme.colors.input.border,
          indicator: tokens.theme.colors.input.bg,
          label: tokens.theme.colors.text.primary,
        },
      },
      checked: {
        colors: {
          bg: tokens.theme.colors.action.primary.bg,
          border: tokens.theme.colors.action.primary.bg,
          indicator: tokens.theme.colors.action.primary.text,
          label: tokens.theme.colors.text.primary,
        },
      },
      indeterminate: {
        colors: {
          bg: tokens.theme.colors.action.primary.bg,
          border: tokens.theme.colors.action.primary.bg,
          indicator: tokens.theme.colors.action.primary.text,
          label: tokens.theme.colors.text.primary,
        },
      },
      focusVisible: {
        colors: {
          bg: tokens.theme.colors.input.bg,
          border: tokens.theme.interactionState.focus.ring,
          indicator: tokens.theme.colors.input.bg,
          label: tokens.theme.colors.text.primary,
        },
      },
      disabled: {
        colors: {
          bg: tokens.theme.interactionState.disabled.bg,
          border: tokens.theme.interactionState.disabled.border,
          indicator: tokens.theme.interactionState.disabled.icon,
          label: tokens.theme.interactionState.disabled.text,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      error: {
        colors: {
          bg: tokens.theme.colors.input.bg,
          border: tokens.theme.colors.state.danger.fg,
          indicator: tokens.theme.colors.state.danger.fg,
          label: tokens.theme.colors.state.danger.fg,
        },
      },
    },
    indeterminate: {
      unchecked: {
        colors: {
          bg: tokens.theme.colors.input.bg,
          border: tokens.theme.colors.input.border,
          indicator: tokens.theme.colors.input.bg,
          label: tokens.theme.colors.text.primary,
        },
      },
      checked: {
        colors: {
          bg: tokens.theme.colors.action.primary.bg,
          border: tokens.theme.colors.action.primary.bg,
          indicator: tokens.theme.colors.action.primary.text,
          label: tokens.theme.colors.text.primary,
        },
      },
      indeterminate: {
        colors: {
          bg: tokens.theme.colors.action.primary.bg,
          border: tokens.theme.colors.action.primary.bg,
          indicator: tokens.theme.colors.action.primary.text,
          label: tokens.theme.colors.text.primary,
        },
      },
      focusVisible: {
        colors: {
          bg: tokens.theme.colors.input.bg,
          border: tokens.theme.interactionState.focus.ring,
          indicator: tokens.theme.colors.input.bg,
          label: tokens.theme.colors.text.primary,
        },
      },
      disabled: {
        colors: {
          bg: tokens.theme.interactionState.disabled.bg,
          border: tokens.theme.interactionState.disabled.border,
          indicator: tokens.theme.interactionState.disabled.icon,
          label: tokens.theme.interactionState.disabled.text,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      error: {
        colors: {
          bg: tokens.theme.colors.input.bg,
          border: tokens.theme.colors.state.danger.fg,
          indicator: tokens.theme.colors.state.danger.fg,
          label: tokens.theme.colors.state.danger.fg,
        },
      },
    },
  },
} as const;

export type CheckboxTokensContract = typeof checkboxTokens;
export type CheckboxVariant = Exclude<keyof CheckboxTokensContract["styles"], "base">;
export type CheckboxState = keyof CheckboxTokensContract["styles"]["default"];
