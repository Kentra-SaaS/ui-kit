import { tokens } from "../../core";

const breadcrumbsBaseStyle = {
  typography: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.body.sm.fontSize,
    lineHeight: tokens.global.typography.semantic.body.sm.lineHeight,
    fontWeight: tokens.global.typography.semantic.body.fontWeight,
  },
  separator: {
    color: tokens.theme.colors.text.secondary,
  },
  focus: {
    ringColor: tokens.theme.interactionState.focus.ring,
    outlineColor: tokens.theme.interactionState.focus.outline,
    shadow: tokens.theme.elevation.shadow.focus,
  },
} as const;

export const breadcrumbsTokens = {
  styles: {
    default: {
      default: {
        ...breadcrumbsBaseStyle,
        spacing: {
          itemGap: tokens.global.baseStyle.space.step2,
          separatorGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          link: tokens.theme.colors.link.default,
          linkHover: tokens.theme.colors.link.hover,
          current: tokens.theme.colors.text.primary,
          separator: tokens.theme.colors.text.secondary,
        },
      },
      focusVisible: {
        ...breadcrumbsBaseStyle,
        spacing: {
          itemGap: tokens.global.baseStyle.space.step2,
          separatorGap: tokens.global.baseStyle.space.step2,
        },
        colors: {
          link: tokens.theme.colors.link.default,
          linkHover: tokens.theme.colors.link.hover,
          current: tokens.theme.colors.text.primary,
          separator: tokens.theme.colors.text.secondary,
        },
      },
    },
    compact: {
      default: {
        ...breadcrumbsBaseStyle,
        spacing: {
          itemGap: tokens.global.baseStyle.space.step1,
          separatorGap: tokens.global.baseStyle.space.step1,
        },
        colors: {
          link: tokens.theme.colors.link.default,
          linkHover: tokens.theme.colors.link.hover,
          current: tokens.theme.colors.text.primary,
          separator: tokens.theme.colors.text.secondary,
        },
      },
      focusVisible: {
        ...breadcrumbsBaseStyle,
        spacing: {
          itemGap: tokens.global.baseStyle.space.step1,
          separatorGap: tokens.global.baseStyle.space.step1,
        },
        colors: {
          link: tokens.theme.colors.link.default,
          linkHover: tokens.theme.colors.link.hover,
          current: tokens.theme.colors.text.primary,
          separator: tokens.theme.colors.text.secondary,
        },
      },
    },
  },
} as const;

export type BreadcrumbsTokensContract = typeof breadcrumbsTokens;
export type BreadcrumbsVariant = keyof BreadcrumbsTokensContract["styles"];
export type BreadcrumbsState = keyof BreadcrumbsTokensContract["styles"]["default"];
