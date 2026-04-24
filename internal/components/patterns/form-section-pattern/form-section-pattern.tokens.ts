import { tokens } from "../../../core/tokens";

const baseFormSectionPatternStyle = {
  container: {
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    borderRadius: tokens.global.baseStyle.radius.lg,
    paddingX: tokens.global.baseStyle.space.step5,
    paddingY: tokens.global.baseStyle.space.step4,
  },
  spacing: {
    headerGap: tokens.global.baseStyle.space.step2,
    sectionGap: tokens.global.baseStyle.space.step4,
    fieldsGap: tokens.global.baseStyle.space.step3,
    footerGap: tokens.global.baseStyle.space.step3,
  },
  typography: {
    titleFamily: tokens.global.typography.family.heading,
    titleSize: tokens.global.typography.semantic.h4.fontSize,
    titleLineHeight: tokens.global.typography.semantic.h4.lineHeight,
    titleWeight: tokens.global.typography.semantic.heading.fontWeight,
    descriptionFamily: tokens.global.typography.family.base,
    descriptionSize: tokens.global.typography.semantic.body.md.fontSize,
    descriptionLineHeight: tokens.global.typography.semantic.body.md.lineHeight,
    descriptionWeight: tokens.global.typography.semantic.body.fontWeight,
  },
  layout: {
    bodyTemplate: "minmax(0, 1fr)",
    fieldsTemplate: "minmax(0, 1fr)",
    asideWidth: "18rem",
  },
} as const;

const defaultColors = {
  bg: tokens.theme.colors.background.surface,
  border: tokens.theme.colors.border.subtle,
  title: tokens.theme.colors.text.primary,
  description: tokens.theme.colors.text.secondary,
} as const;

const errorColors = {
  bg: tokens.theme.colors.background.surface,
  border: tokens.theme.colors.state.danger.fg,
  title: tokens.theme.colors.text.primary,
  description: tokens.theme.colors.state.danger.fg,
} as const;

const disabledColors = {
  bg: tokens.theme.interactionState.disabled.bg,
  border: tokens.theme.interactionState.disabled.border,
  title: tokens.theme.interactionState.disabled.text,
  description: tokens.theme.interactionState.disabled.text,
} as const;

export const formSectionPatternTokens = {
  styles: {
    base: baseFormSectionPatternStyle,
    default: {
      default: {
        layout: {
          bodyTemplate: "minmax(0, 1fr)",
          fieldsTemplate: "minmax(0, 1fr)",
          asideWidth: "18rem",
        },
        colors: defaultColors,
      },
      error: {
        layout: {
          bodyTemplate: "minmax(0, 1fr)",
          fieldsTemplate: "minmax(0, 1fr)",
          asideWidth: "18rem",
        },
        colors: errorColors,
      },
      disabled: {
        layout: {
          bodyTemplate: "minmax(0, 1fr)",
          fieldsTemplate: "minmax(0, 1fr)",
          asideWidth: "18rem",
        },
        colors: disabledColors,
      },
    },
    twoColumn: {
      default: {
        layout: {
          bodyTemplate: "minmax(0, 1fr)",
          fieldsTemplate: "repeat(2, minmax(0, 1fr))",
          asideWidth: "18rem",
        },
        colors: defaultColors,
      },
      error: {
        layout: {
          bodyTemplate: "minmax(0, 1fr)",
          fieldsTemplate: "repeat(2, minmax(0, 1fr))",
          asideWidth: "18rem",
        },
        colors: errorColors,
      },
      disabled: {
        layout: {
          bodyTemplate: "minmax(0, 1fr)",
          fieldsTemplate: "repeat(2, minmax(0, 1fr))",
          asideWidth: "18rem",
        },
        colors: disabledColors,
      },
    },
    withAsideHelp: {
      default: {
        layout: {
          bodyTemplate: "minmax(0, 1fr) minmax(14rem, var(--k-form-section-pattern-layout-aside-width, 18rem))",
          fieldsTemplate: "minmax(0, 1fr)",
          asideWidth: "18rem",
        },
        colors: defaultColors,
      },
      error: {
        layout: {
          bodyTemplate: "minmax(0, 1fr) minmax(14rem, var(--k-form-section-pattern-layout-aside-width, 18rem))",
          fieldsTemplate: "minmax(0, 1fr)",
          asideWidth: "18rem",
        },
        colors: errorColors,
      },
      disabled: {
        layout: {
          bodyTemplate: "minmax(0, 1fr) minmax(14rem, var(--k-form-section-pattern-layout-aside-width, 18rem))",
          fieldsTemplate: "minmax(0, 1fr)",
          asideWidth: "18rem",
        },
        colors: disabledColors,
      },
    },
  },
} as const;

export type FormSectionPatternTokensContract = typeof formSectionPatternTokens;
export type FormSectionPatternVariant = Exclude<
  keyof FormSectionPatternTokensContract["styles"],
  "base"
>;
export type FormSectionPatternState =
  keyof FormSectionPatternTokensContract["styles"]["default"];
