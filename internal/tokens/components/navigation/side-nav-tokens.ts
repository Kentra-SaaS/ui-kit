import { tokens } from "../../core";

const sideNavBaseStyle = {
  nav: {
    radius: tokens.global.baseStyle.radius.lg,
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    padding: tokens.global.baseStyle.space.step2,
  },
  item: {
    minHeight: tokens.global.baseStyle.space.step10,
    paddingX: tokens.global.baseStyle.space.step3,
    paddingY: tokens.global.baseStyle.space.step2,
    gap: tokens.global.baseStyle.space.step2,
    radius: tokens.global.baseStyle.radius.md,
    typography: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.body.sm.fontSize,
      lineHeight: tokens.global.typography.semantic.body.sm.lineHeight,
      fontWeight: tokens.global.typography.semantic.label.fontWeight,
    },
  },
  sectionTitle: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.caption.fontSize,
    lineHeight: tokens.global.typography.semantic.caption.lineHeight,
    fontWeight: tokens.global.typography.semantic.label.fontWeight,
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

export const sideNavTokens = {
  styles: {
    expanded: {
      default: {
        ...sideNavBaseStyle,
        navWidth: "17rem",
        colors: {
          navBg: tokens.theme.colors.background.elevated,
          navBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.colors.text.secondary,
          itemBg: tokens.theme.colors.background.elevated,
          sectionTitle: tokens.theme.colors.text.secondary,
          icon: tokens.theme.colors.text.secondary,
        },
      },
      active: {
        ...sideNavBaseStyle,
        navWidth: "17rem",
        colors: {
          navBg: tokens.theme.colors.background.elevated,
          navBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.interactionState.selected.text,
          itemBg: tokens.theme.interactionState.selected.bg,
          sectionTitle: tokens.theme.colors.text.secondary,
          icon: tokens.theme.interactionState.selected.text,
        },
      },
      focusVisible: {
        ...sideNavBaseStyle,
        navWidth: "17rem",
        colors: {
          navBg: tokens.theme.colors.background.elevated,
          navBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.colors.text.primary,
          itemBg: tokens.theme.colors.background.elevated,
          sectionTitle: tokens.theme.colors.text.secondary,
          icon: tokens.theme.colors.text.primary,
        },
      },
      disabled: {
        ...sideNavBaseStyle,
        navWidth: "17rem",
        colors: {
          navBg: tokens.theme.colors.background.elevated,
          navBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.interactionState.disabled.text,
          itemBg: tokens.theme.interactionState.disabled.bg,
          sectionTitle: tokens.theme.interactionState.disabled.text,
          icon: tokens.theme.interactionState.disabled.icon,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
    },
    collapsed: {
      default: {
        ...sideNavBaseStyle,
        navWidth: "4.5rem",
        item: {
          ...sideNavBaseStyle.item,
          paddingX: tokens.global.baseStyle.space.step2,
          justify: "center",
        },
        colors: {
          navBg: tokens.theme.colors.background.elevated,
          navBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.colors.text.secondary,
          itemBg: tokens.theme.colors.background.elevated,
          sectionTitle: tokens.theme.colors.text.secondary,
          icon: tokens.theme.colors.text.secondary,
        },
      },
      active: {
        ...sideNavBaseStyle,
        navWidth: "4.5rem",
        item: {
          ...sideNavBaseStyle.item,
          paddingX: tokens.global.baseStyle.space.step2,
          justify: "center",
        },
        colors: {
          navBg: tokens.theme.colors.background.elevated,
          navBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.interactionState.selected.text,
          itemBg: tokens.theme.interactionState.selected.bg,
          sectionTitle: tokens.theme.colors.text.secondary,
          icon: tokens.theme.interactionState.selected.text,
        },
      },
      focusVisible: {
        ...sideNavBaseStyle,
        navWidth: "4.5rem",
        item: {
          ...sideNavBaseStyle.item,
          paddingX: tokens.global.baseStyle.space.step2,
          justify: "center",
        },
        colors: {
          navBg: tokens.theme.colors.background.elevated,
          navBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.colors.text.primary,
          itemBg: tokens.theme.colors.background.elevated,
          sectionTitle: tokens.theme.colors.text.secondary,
          icon: tokens.theme.colors.text.primary,
        },
      },
      disabled: {
        ...sideNavBaseStyle,
        navWidth: "4.5rem",
        item: {
          ...sideNavBaseStyle.item,
          paddingX: tokens.global.baseStyle.space.step2,
          justify: "center",
        },
        colors: {
          navBg: tokens.theme.colors.background.elevated,
          navBorder: tokens.theme.colors.border.subtle,
          itemText: tokens.theme.interactionState.disabled.text,
          itemBg: tokens.theme.interactionState.disabled.bg,
          sectionTitle: tokens.theme.interactionState.disabled.text,
          icon: tokens.theme.interactionState.disabled.icon,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
    },
  },
} as const;

export type SideNavTokensContract = typeof sideNavTokens;
export type SideNavVariant = keyof SideNavTokensContract["styles"];
export type SideNavState = keyof SideNavTokensContract["styles"]["expanded"];
