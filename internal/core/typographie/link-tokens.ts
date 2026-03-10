import { tokens } from "../../tokens";

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
    default: {
      default: {
        ...linkBaseStyle,
        color: tokens.theme.colors.link.default,
        decorationColor: tokens.theme.colors.link.default,
      },
      hover: {
        ...linkBaseStyle,
        color: tokens.theme.colors.link.hover,
        decorationColor: tokens.theme.colors.link.hover,
      },
      focusVisible: {
        ...linkBaseStyle,
        color: tokens.theme.colors.link.default,
        decorationColor: tokens.theme.colors.link.default,
      },
      visited: {
        ...linkBaseStyle,
        color: tokens.theme.colors.link.visited,
        decorationColor: tokens.theme.colors.link.visited,
      },
      disabled: {
        ...linkBaseStyle,
        color: tokens.theme.interactionState.disabled.text,
        decorationColor: tokens.theme.interactionState.disabled.text,
      },
    },
    subtle: {
      default: {
        ...linkBaseStyle,
        color: tokens.theme.colors.text.secondary,
        decorationColor: tokens.theme.colors.border.subtle,
      },
      hover: {
        ...linkBaseStyle,
        color: tokens.theme.colors.link.hover,
        decorationColor: tokens.theme.colors.link.hover,
      },
      focusVisible: {
        ...linkBaseStyle,
        color: tokens.theme.colors.text.secondary,
        decorationColor: tokens.theme.colors.text.secondary,
      },
      visited: {
        ...linkBaseStyle,
        color: tokens.theme.colors.link.visited,
        decorationColor: tokens.theme.colors.link.visited,
      },
      disabled: {
        ...linkBaseStyle,
        color: tokens.theme.interactionState.disabled.text,
        decorationColor: tokens.theme.interactionState.disabled.text,
      },
    },
    inlineStrong: {
      default: {
        ...linkBaseStyle,
        color: tokens.theme.colors.link.default,
        decorationColor: tokens.theme.colors.link.default,
        fontWeight: tokens.global.typography.weight.semibold,
      },
      hover: {
        ...linkBaseStyle,
        color: tokens.theme.colors.link.hover,
        decorationColor: tokens.theme.colors.link.hover,
        fontWeight: tokens.global.typography.weight.semibold,
      },
      focusVisible: {
        ...linkBaseStyle,
        color: tokens.theme.colors.link.default,
        decorationColor: tokens.theme.colors.link.default,
        fontWeight: tokens.global.typography.weight.semibold,
      },
      visited: {
        ...linkBaseStyle,
        color: tokens.theme.colors.link.visited,
        decorationColor: tokens.theme.colors.link.visited,
        fontWeight: tokens.global.typography.weight.semibold,
      },
      disabled: {
        ...linkBaseStyle,
        color: tokens.theme.interactionState.disabled.text,
        decorationColor: tokens.theme.interactionState.disabled.text,
        fontWeight: tokens.global.typography.weight.semibold,
      },
    },
  },
} as const;

export type LinkTokensContract = typeof linkTokens;
export type LinkVariant = keyof LinkTokensContract["styles"];
export type LinkState = keyof LinkTokensContract["styles"]["default"];
