import { tokens } from "../../../core/tokens";

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
    base: baseFieldStyle,
    default: {
      default: {
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.text.secondary,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      required: {
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.text.secondary,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      error: {
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.state.danger.fg,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      disabled: {
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
        layout: {
          labelMinWidth: "11rem",
          align: "center",
          gap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.text.secondary,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      required: {
        layout: {
          labelMinWidth: "11rem",
          align: "center",
          gap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.text.secondary,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      error: {
        layout: {
          labelMinWidth: "11rem",
          align: "center",
          gap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          label: tokens.theme.colors.text.primary,
          hint: tokens.theme.colors.state.danger.fg,
          error: tokens.theme.colors.state.danger.fg,
          required: tokens.theme.colors.state.danger.fg,
        },
      },
      disabled: {
        layout: {
          labelMinWidth: "11rem",
          align: "center",
          gap: tokens.global.baseStyle.space.step2,
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
export type FieldVariant = Exclude<keyof FieldTokensContract["styles"], "base">;
export type FieldState = keyof FieldTokensContract["styles"]["default"];
