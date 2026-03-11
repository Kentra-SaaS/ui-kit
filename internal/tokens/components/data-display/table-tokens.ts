import { tokens } from "../../core";

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
    default: {
      default: {
        ...baseTableStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.primary,
          rowBorder: tokens.theme.colors.border.subtle,
        },
      },
      hoverRow: {
        ...baseTableStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.primary,
          rowBorder: tokens.theme.colors.border.subtle,
          rowHoverBg: tokens.theme.interactionState.hoverOverlay,
        },
      },
      selectedRow: {
        ...baseTableStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.interactionState.selected.text,
          rowBorder: tokens.theme.colors.border.subtle,
          rowSelectedBg: tokens.theme.interactionState.selected.bg,
        },
      },
      empty: {
        ...baseTableStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.secondary,
          rowBorder: tokens.theme.colors.border.subtle,
        },
      },
      loading: {
        ...baseTableStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.secondary,
          rowBorder: tokens.theme.colors.border.subtle,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
    },
    dense: {
      default: {
        ...baseTableStyle,
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
        },
      },
      hoverRow: {
        ...baseTableStyle,
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
        },
      },
      selectedRow: {
        ...baseTableStyle,
        cell: {
          ...baseTableStyle.cell,
          paddingX: tokens.global.baseStyle.space.step2,
          paddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.interactionState.selected.text,
          rowBorder: tokens.theme.colors.border.subtle,
          rowSelectedBg: tokens.theme.interactionState.selected.bg,
        },
      },
      empty: {
        ...baseTableStyle,
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
        ...baseTableStyle,
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
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
    },
    striped: {
      default: {
        ...baseTableStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.primary,
          rowBorder: tokens.theme.colors.border.subtle,
          oddRowBg: tokens.theme.colors.background.surface,
          evenRowBg: tokens.theme.colors.background.elevated,
        },
      },
      hoverRow: {
        ...baseTableStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.primary,
          rowBorder: tokens.theme.colors.border.subtle,
          oddRowBg: tokens.theme.colors.background.surface,
          evenRowBg: tokens.theme.colors.background.elevated,
          rowHoverBg: tokens.theme.interactionState.hoverOverlay,
        },
      },
      selectedRow: {
        ...baseTableStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.interactionState.selected.text,
          rowBorder: tokens.theme.colors.border.subtle,
          oddRowBg: tokens.theme.colors.background.surface,
          evenRowBg: tokens.theme.colors.background.elevated,
          rowSelectedBg: tokens.theme.interactionState.selected.bg,
        },
      },
      empty: {
        ...baseTableStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.secondary,
          rowBorder: tokens.theme.colors.border.subtle,
        },
      },
      loading: {
        ...baseTableStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          headerBg: tokens.theme.colors.background.elevated,
          headerText: tokens.theme.colors.text.secondary,
          rowText: tokens.theme.colors.text.secondary,
          rowBorder: tokens.theme.colors.border.subtle,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
    },
  },
} as const;

export type TableTokensContract = typeof tableTokens;
export type TableVariant = keyof TableTokensContract["styles"];
export type TableState = keyof TableTokensContract["styles"]["default"];
