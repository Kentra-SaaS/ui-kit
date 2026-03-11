import { tokens } from "../../core";

const baseRadioGroupStyle = {
  item: {
    controlSize: tokens.global.baseStyle.space.step5,
    indicatorSize: tokens.global.baseStyle.space.step2,
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
  },
  border: {
    radius: tokens.global.baseStyle.radius.pill,
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

export const radioGroupTokens = {
  styles: {
    vertical: {
      default: {
        ...baseRadioGroupStyle,
        layout: {
          direction: "column",
          itemGap: tokens.global.baseStyle.space.step3,
          controlLabelGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          controlBg: tokens.theme.colors.input.bg,
          controlBorder: tokens.theme.colors.input.border,
          indicator: tokens.theme.colors.action.primary.bg,
          label: tokens.theme.colors.text.primary,
        },
      },
      focusVisible: {
        ...baseRadioGroupStyle,
        layout: {
          direction: "column",
          itemGap: tokens.global.baseStyle.space.step3,
          controlLabelGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          controlBg: tokens.theme.colors.input.bg,
          controlBorder: tokens.theme.interactionState.focus.ring,
          indicator: tokens.theme.colors.action.primary.bg,
          label: tokens.theme.colors.text.primary,
        },
      },
      disabled: {
        ...baseRadioGroupStyle,
        layout: {
          direction: "column",
          itemGap: tokens.global.baseStyle.space.step3,
          controlLabelGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          controlBg: tokens.theme.interactionState.disabled.bg,
          controlBorder: tokens.theme.interactionState.disabled.border,
          indicator: tokens.theme.interactionState.disabled.icon,
          label: tokens.theme.interactionState.disabled.text,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      error: {
        ...baseRadioGroupStyle,
        layout: {
          direction: "column",
          itemGap: tokens.global.baseStyle.space.step3,
          controlLabelGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          controlBg: tokens.theme.colors.input.bg,
          controlBorder: tokens.theme.colors.state.danger.fg,
          indicator: tokens.theme.colors.state.danger.fg,
          label: tokens.theme.colors.state.danger.fg,
        },
      },
    },
    horizontal: {
      default: {
        ...baseRadioGroupStyle,
        layout: {
          direction: "row",
          itemGap: tokens.global.baseStyle.space.step4,
          controlLabelGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          controlBg: tokens.theme.colors.input.bg,
          controlBorder: tokens.theme.colors.input.border,
          indicator: tokens.theme.colors.action.primary.bg,
          label: tokens.theme.colors.text.primary,
        },
      },
      focusVisible: {
        ...baseRadioGroupStyle,
        layout: {
          direction: "row",
          itemGap: tokens.global.baseStyle.space.step4,
          controlLabelGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          controlBg: tokens.theme.colors.input.bg,
          controlBorder: tokens.theme.interactionState.focus.ring,
          indicator: tokens.theme.colors.action.primary.bg,
          label: tokens.theme.colors.text.primary,
        },
      },
      disabled: {
        ...baseRadioGroupStyle,
        layout: {
          direction: "row",
          itemGap: tokens.global.baseStyle.space.step4,
          controlLabelGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          controlBg: tokens.theme.interactionState.disabled.bg,
          controlBorder: tokens.theme.interactionState.disabled.border,
          indicator: tokens.theme.interactionState.disabled.icon,
          label: tokens.theme.interactionState.disabled.text,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      error: {
        ...baseRadioGroupStyle,
        layout: {
          direction: "row",
          itemGap: tokens.global.baseStyle.space.step4,
          controlLabelGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          controlBg: tokens.theme.colors.input.bg,
          controlBorder: tokens.theme.colors.state.danger.fg,
          indicator: tokens.theme.colors.state.danger.fg,
          label: tokens.theme.colors.state.danger.fg,
        },
      },
    },
  },
} as const;

export type RadioGroupTokensContract = typeof radioGroupTokens;
export type RadioGroupVariant = keyof RadioGroupTokensContract["styles"];
export type RadioGroupState = keyof RadioGroupTokensContract["styles"]["vertical"];
