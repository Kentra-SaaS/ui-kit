import { tokens } from "../../../core/tokens";

const baseTableStyle = {
  table: {
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    borderRadius: tokens.global.baseStyle.radius.md,
  },
  header: {
    fontFamily: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.label.fontSize,
    lineHeight: tokens.global.typography.semantic.label.lineHeight,
    fontWeight: tokens.global.typography.semantic.label.fontWeight,
  },
  cell: {
    fontFamily: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.body.sm.fontSize,
    lineHeight: tokens.global.typography.semantic.body.sm.lineHeight,
    fontWeight: tokens.global.typography.semantic.body.fontWeight,
    paddingX: tokens.global.baseStyle.space.step3,
    paddingY: tokens.global.baseStyle.space.step2,
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

export const tableTokens = {
  styles: {
    base: baseTableStyle,
    default: {
      default: {
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.primary,
          rowBorder: tokens.theme.colors.border.subtle,
          rowHoverBg: tokens.theme.interactionState.hoverOverlay,
          rowSelectedBg: tokens.theme.interactionState.selected.bg,
        },
      },
      empty: {
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.secondary,
          rowBorder: tokens.theme.colors.border.subtle,
        },
      },
      loading: {
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.secondary,
          rowBorder: tokens.theme.colors.border.subtle,
          skeleton: tokens.theme.colors.border.default,
        },
      },
    },
    dense: {
      default: {
        cell: {
          ...baseTableStyle.cell,
          paddingX: tokens.global.baseStyle.space.step2,
          paddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.primary,
          rowBorder: tokens.theme.colors.border.subtle,
          rowHoverBg: tokens.theme.interactionState.hoverOverlay,
          rowSelectedBg: tokens.theme.interactionState.selected.bg,
        },
      },
      empty: {
        cell: {
          ...baseTableStyle.cell,
          paddingX: tokens.global.baseStyle.space.step2,
          paddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.secondary,
          rowBorder: tokens.theme.colors.border.subtle,
        },
      },
      loading: {
        cell: {
          ...baseTableStyle.cell,
          paddingX: tokens.global.baseStyle.space.step2,
          paddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.secondary,
          rowBorder: tokens.theme.colors.border.subtle,
          skeleton: tokens.theme.colors.border.default,
        },
      },
    },
    striped: {
      default: {
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.primary,
          rowBorder: tokens.theme.colors.border.subtle,
          oddRowBg: tokens.theme.colors.background.surface,
          evenRowBg: tokens.theme.colors.background.elevated,
          rowHoverBg: tokens.theme.interactionState.hoverOverlay,
          rowSelectedBg: tokens.theme.interactionState.selected.bg,
        },
      },
      empty: {
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.secondary,
          rowBorder: tokens.theme.colors.border.subtle,
        },
      },
      loading: {
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.secondary,
          rowBorder: tokens.theme.colors.border.subtle,
          skeleton: tokens.theme.colors.border.default,
        },
      },
    },
  },
} as const;

export type TableTokensContract = typeof tableTokens;
export type TableVariant = Exclude<keyof TableTokensContract["styles"], "base">;
export type TableState = keyof TableTokensContract["styles"]["default"];
