import { tokens } from "../../../core/tokens";

const linkBaseStyle = {
  family: tokens.global.typography.family.base,
  fontSize: tokens.global.typography.semantic.body.md.fontSize,
  lineHeight: tokens.global.typography.semantic.body.md.lineHeight,
  fontWeight: tokens.global.typography.semantic.body.fontWeight,
  borderRadius: tokens.global.baseStyle.radius.sm,
  motionDuration: tokens.global.baseStyle.motion.duration.fast,
  motionEasing: tokens.global.baseStyle.motion.ease.standard,
  focus: {
    ringColor: tokens.theme.interactionState.focus.ring,
    outlineColor: tokens.theme.interactionState.focus.outline,
    shadow: tokens.theme.elevation.shadow.focus,
  },
} as const;

export const linkTokens = {
  styles: {
    base: linkBaseStyle,
    default: {
      default: {
        color: tokens.theme.colors.link.default,
        decorationColor: tokens.theme.colors.link.default,
      },
      hover: {
        color: tokens.theme.colors.link.hover,
        decorationColor: tokens.theme.colors.link.hover,
      },
      focusVisible: {
        color: tokens.theme.colors.link.default,
        decorationColor: tokens.theme.colors.link.default,
      },
      visited: {
        color: tokens.theme.colors.link.visited,
        decorationColor: tokens.theme.colors.link.visited,
      },
      disabled: {
        color: tokens.theme.interactionState.disabled.text,
        decorationColor: tokens.theme.interactionState.disabled.text,
      },
    },
    subtle: {
      default: {
        color: tokens.theme.colors.text.secondary,
        decorationColor: tokens.theme.colors.border.subtle,
      },
      hover: {
        color: tokens.theme.colors.link.hover,
        decorationColor: tokens.theme.colors.link.hover,
      },
      focusVisible: {
        color: tokens.theme.colors.text.secondary,
        decorationColor: tokens.theme.colors.text.secondary,
      },
      visited: {
        color: tokens.theme.colors.link.visited,
        decorationColor: tokens.theme.colors.link.visited,
      },
      disabled: {
        color: tokens.theme.interactionState.disabled.text,
        decorationColor: tokens.theme.interactionState.disabled.text,
      },
    },
    inlineStrong: {
      default: {
        color: tokens.theme.colors.link.default,
        decorationColor: tokens.theme.colors.link.default,
        fontWeight: tokens.global.typography.weight.semibold,
      },
      hover: {
        color: tokens.theme.colors.link.hover,
        decorationColor: tokens.theme.colors.link.hover,
        fontWeight: tokens.global.typography.weight.semibold,
      },
      focusVisible: {
        color: tokens.theme.colors.link.default,
        decorationColor: tokens.theme.colors.link.default,
        fontWeight: tokens.global.typography.weight.semibold,
      },
      visited: {
        color: tokens.theme.colors.link.visited,
        decorationColor: tokens.theme.colors.link.visited,
        fontWeight: tokens.global.typography.weight.semibold,
      },
      disabled: {
        color: tokens.theme.interactionState.disabled.text,
        decorationColor: tokens.theme.interactionState.disabled.text,
        fontWeight: tokens.global.typography.weight.semibold,
      },
    },
  },
} as const;

export type LinkTokensContract = typeof linkTokens;
export type LinkVariant = Exclude<keyof LinkTokensContract["styles"], "base">;
export type LinkState = keyof LinkTokensContract["styles"]["default"];
