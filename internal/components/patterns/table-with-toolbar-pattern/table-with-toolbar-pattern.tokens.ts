import { tokens } from "../../../core/tokens";

const baseTableWithToolbarPatternStyle = {
  container: {
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    borderRadius: tokens.global.baseStyle.radius.lg,
    paddingX: tokens.global.baseStyle.space.step4,
    paddingY: tokens.global.baseStyle.space.step4,
  },
  spacing: {
    headerGap: tokens.global.baseStyle.space.step2,
    sectionGap: tokens.global.baseStyle.space.step3,
    toolbarGap: tokens.global.baseStyle.space.step2,
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
  motion: {
    duration: tokens.global.baseStyle.motion.duration.fast,
    easing: tokens.global.baseStyle.motion.ease.standard,
  },
} as const;

const sharedDefaultColors = {
  bg: tokens.theme.colors.background.surface,
  border: tokens.theme.colors.border.subtle,
  title: tokens.theme.colors.text.primary,
  description: tokens.theme.colors.text.secondary,
  toolbarBorder: tokens.theme.colors.border.subtle,
  statusBg: tokens.theme.colors.background.surface,
  statusBorder: tokens.theme.colors.border.subtle,
  statusTitle: tokens.theme.colors.text.primary,
  statusDescription: tokens.theme.colors.text.secondary,
} as const;

const blockedStateColors = {
  ...sharedDefaultColors,
  statusBorder: tokens.global.palette.accent.orange.c500,
  statusTitle: tokens.theme.colors.text.primary,
  statusDescription: tokens.theme.colors.text.secondary,
} as const;

const errorStateColors = {
  ...sharedDefaultColors,
  statusBorder: tokens.theme.colors.state.danger.fg,
  statusTitle: tokens.theme.colors.state.danger.fg,
  statusDescription: tokens.theme.colors.state.danger.fg,
} as const;

const loadingStateColors = {
  ...sharedDefaultColors,
  statusBg: tokens.theme.colors.background.elevated,
} as const;

const emptyStateColors = {
  ...sharedDefaultColors,
  statusBg: tokens.theme.colors.background.elevated,
  statusTitle: tokens.theme.colors.text.secondary,
} as const;

export const tableWithToolbarPatternTokens = {
  styles: {
    base: baseTableWithToolbarPatternStyle,
    default: {
      default: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step4,
          tableVariant: "default",
        },
        colors: sharedDefaultColors,
      },
      loading: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step4,
          tableVariant: "default",
        },
        colors: loadingStateColors,
      },
      empty: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step4,
          tableVariant: "default",
        },
        colors: emptyStateColors,
      },
      error: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step4,
          tableVariant: "default",
        },
        colors: errorStateColors,
      },
      blocked: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step4,
          tableVariant: "default",
        },
        colors: blockedStateColors,
      },
    },
    selectable: {
      default: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step4,
          tableVariant: "default",
        },
        colors: sharedDefaultColors,
      },
      loading: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step4,
          tableVariant: "default",
        },
        colors: loadingStateColors,
      },
      empty: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step4,
          tableVariant: "default",
        },
        colors: emptyStateColors,
      },
      error: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step4,
          tableVariant: "default",
        },
        colors: errorStateColors,
      },
      blocked: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step4,
          tableVariant: "default",
        },
        colors: blockedStateColors,
      },
    },
    dense: {
      default: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step3,
          tableVariant: "dense",
        },
        colors: sharedDefaultColors,
      },
      loading: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step3,
          tableVariant: "dense",
        },
        colors: loadingStateColors,
      },
      empty: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step3,
          tableVariant: "dense",
        },
        colors: emptyStateColors,
      },
      error: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step3,
          tableVariant: "dense",
        },
        colors: errorStateColors,
      },
      blocked: {
        layout: {
          compactPadding: tokens.global.baseStyle.space.step3,
          tableVariant: "dense",
        },
        colors: blockedStateColors,
      },
    },
  },
} as const;

export type TableWithToolbarPatternTokensContract =
  typeof tableWithToolbarPatternTokens;
export type TableWithToolbarPatternVariant = Exclude<
  keyof TableWithToolbarPatternTokensContract["styles"],
  "base"
>;
export type TableWithToolbarPatternState =
  keyof TableWithToolbarPatternTokensContract["styles"]["default"];
