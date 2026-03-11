import { tokens } from "../../core";

const dropdownMenuBaseStyle = {
  panel: {
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    borderRadius: tokens.global.baseStyle.radius.md,
    paddingY: tokens.global.baseStyle.space.step1,
    minWidth: "14rem",
    shadow: tokens.theme.elevation.shadow.md,
    zIndex: tokens.global.baseStyle.zIndex.dropdown,
  },
  item: {
    minHeight: tokens.global.baseStyle.space.step8,
    paddingX: tokens.global.baseStyle.space.step3,
    paddingY: tokens.global.baseStyle.space.step2,
    gap: tokens.global.baseStyle.space.step2,
    radius: tokens.global.baseStyle.radius.sm,
    typography: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.body.sm.fontSize,
      lineHeight: tokens.global.typography.semantic.body.sm.lineHeight,
      fontWeight: tokens.global.typography.semantic.body.fontWeight,
    },
  },
  focus: {
    ringColor: tokens.theme.interactionState.focus.ring,
    outlineColor: tokens.theme.interactionState.focus.outline,
    shadow: tokens.theme.elevation.shadow.focus,
  },
  motion: {
    enterDuration: tokens.global.baseStyle.motion.duration.fast,
    exitDuration: tokens.global.baseStyle.motion.duration.fast,
    enterEasing: tokens.global.baseStyle.motion.ease.entrance,
    exitEasing: tokens.global.baseStyle.motion.ease.exit,
  },
} as const;

export const dropdownMenuTokens = {
  styles: {
    base: dropdownMenuBaseStyle,
    default: {
      closed: {
        opacity: "0",
        scale: "0.98",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.colors.text.primary,
          itemBg: tokens.theme.colors.background.elevated,
          itemHoverBg: tokens.theme.interactionState.hoverOverlay,
        },
      },
      open: {
        opacity: "1",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.colors.text.primary,
          itemBg: tokens.theme.colors.background.elevated,
          itemHoverBg: tokens.theme.interactionState.hoverOverlay,
        },
      },
      focusVisible: {
        opacity: "1",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.colors.text.primary,
          itemBg: tokens.theme.colors.background.elevated,
          itemHoverBg: tokens.theme.interactionState.hoverOverlay,
          itemFocusBorder: tokens.theme.interactionState.focus.ring,
        },
      },
      disabledItem: {
        opacity: "1",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.interactionState.disabled.text,
          itemBg: tokens.theme.interactionState.disabled.bg,
          itemHoverBg: tokens.theme.interactionState.disabled.bg,
          itemIcon: tokens.theme.interactionState.disabled.icon,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
    },
    dangerSection: {
      closed: {
        opacity: "0",
        scale: "0.98",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.colors.text.primary,
          itemBg: tokens.theme.colors.background.elevated,
          itemHoverBg: tokens.theme.interactionState.hoverOverlay,
          dangerText: tokens.theme.colors.state.danger.fg,
          dangerHoverBg: tokens.theme.colors.state.danger.bg,
        },
      },
      open: {
        opacity: "1",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.colors.text.primary,
          itemBg: tokens.theme.colors.background.elevated,
          itemHoverBg: tokens.theme.interactionState.hoverOverlay,
          dangerText: tokens.theme.colors.state.danger.fg,
          dangerHoverBg: tokens.theme.colors.state.danger.bg,
        },
      },
      focusVisible: {
        opacity: "1",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.colors.text.primary,
          itemBg: tokens.theme.colors.background.elevated,
          itemHoverBg: tokens.theme.interactionState.hoverOverlay,
          itemFocusBorder: tokens.theme.interactionState.focus.ring,
          dangerText: tokens.theme.colors.state.danger.fg,
          dangerHoverBg: tokens.theme.colors.state.danger.bg,
        },
      },
      disabledItem: {
        opacity: "1",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.interactionState.disabled.text,
          itemBg: tokens.theme.interactionState.disabled.bg,
          itemHoverBg: tokens.theme.interactionState.disabled.bg,
          itemIcon: tokens.theme.interactionState.disabled.icon,
          dangerText: tokens.theme.interactionState.disabled.text,
          dangerHoverBg: tokens.theme.interactionState.disabled.bg,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
    },
  },
} as const;

export type DropdownMenuTokensContract = typeof dropdownMenuTokens;
export type DropdownMenuVariant = Exclude<keyof DropdownMenuTokensContract["styles"], "base">;
export type DropdownMenuState = keyof DropdownMenuTokensContract["styles"]["default"];
