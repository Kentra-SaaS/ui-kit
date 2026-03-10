import { tokens } from "../../tokens";

const baseFieldStyle = {
  label: {
    family: tokens.global.typography.family.base,
    size: tokens.global.typography.semantic.label.fontSize,
    weight: tokens.global.typography.semantic.label.fontWeight,
    lineHeight: tokens.global.typography.semantic.label.lineHeight,
  },
  hint: {
    family: tokens.global.typography.family.base,
    size: tokens.global.typography.semantic.caption.fontSize,
    weight: tokens.global.typography.semantic.body.fontWeight,
    lineHeight: tokens.global.typography.semantic.caption.lineHeight,
  },
  spacing: {
    labelToControl: tokens.global.baseStyle.space.step2,
    controlToHint: tokens.global.baseStyle.space.step2,
    hintToError: tokens.global.baseStyle.space.step1,
  },
} as const;

export const fieldTokens = {
  styles: {
    default: {
      default: {
        ...baseFieldStyle,
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.text.secondary,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      required: {
        ...baseFieldStyle,
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.text.secondary,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      error: {
        ...baseFieldStyle,
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.state.danger.fg,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      disabled: {
        ...baseFieldStyle,
        colors: {
          label: tokens.theme.interactionState.disabled.text,
          hint: tokens.theme.interactionState.disabled.text,
          error: tokens.theme.interactionState.disabled.text,
          required: tokens.theme.interactionState.disabled.text,
        },
      },
    },
    inlineLabel: {
      default: {
        ...baseFieldStyle,
        layout: {
          labelMinWidth: "11rem",
          align: "center",
          gap: tokens.global.baseStyle.space.step4,
        },
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.text.secondary,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      required: {
        ...baseFieldStyle,
        layout: {
          labelMinWidth: "11rem",
          align: "center",
          gap: tokens.global.baseStyle.space.step4,
        },
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.text.secondary,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      error: {
        ...baseFieldStyle,
        layout: {
          labelMinWidth: "11rem",
          align: "center",
          gap: tokens.global.baseStyle.space.step4,
        },
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.state.danger.fg,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      disabled: {
        ...baseFieldStyle,
        layout: {
          labelMinWidth: "11rem",
          align: "center",
          gap: tokens.global.baseStyle.space.step4,
        },
        colors: {
          label: tokens.theme.interactionState.disabled.text,
          hint: tokens.theme.interactionState.disabled.text,
          error: tokens.theme.interactionState.disabled.text,
          required: tokens.theme.interactionState.disabled.text,
        },
      },
    },
  },
} as const;

export type FieldTokensContract = typeof fieldTokens;
export type FieldVariant = keyof FieldTokensContract["styles"];
export type FieldState = keyof FieldTokensContract["styles"]["default"];
