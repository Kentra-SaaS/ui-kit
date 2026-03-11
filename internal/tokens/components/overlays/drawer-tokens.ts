import { tokens } from "../../core";

const drawerBaseStyle = {
  backdrop: {
    color: tokens.theme.colors.overlay.backdrop,
    zIndex: tokens.global.baseStyle.zIndex.overlay,
  },
  panel: {
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    shadow: tokens.theme.elevation.shadow.lg,
    zIndex: tokens.global.baseStyle.zIndex.modal,
  },
  spacing: {
    paddingX: tokens.global.baseStyle.space.step4,
    paddingY: tokens.global.baseStyle.space.step4,
    contentGap: tokens.global.baseStyle.space.step4,
  },
  typography: {
    title: {
      family: tokens.global.typography.family.heading,
      fontSize: tokens.global.typography.semantic.h5.fontSize,
      lineHeight: tokens.global.typography.semantic.h5.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    body: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.body.md.fontSize,
      lineHeight: tokens.global.typography.semantic.body.md.lineHeight,
      fontWeight: tokens.global.typography.semantic.body.fontWeight,
    },
  },
  motion: {
    enterDuration: tokens.global.baseStyle.motion.duration.normal,
    exitDuration: tokens.global.baseStyle.motion.duration.fast,
    enterEasing: tokens.global.baseStyle.motion.ease.entrance,
    exitEasing: tokens.global.baseStyle.motion.ease.exit,
  },
} as const;

export const drawerTokens = {
  styles: {
    base: drawerBaseStyle,
    left: {
      closed: {
        panelWidth: "24rem",
        panelHeight: "100dvh",
        panelRadius: tokens.global.baseStyle.radius.none,
        transform: "translateX(-100%)",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      open: {
        panelWidth: "24rem",
        panelHeight: "100dvh",
        panelRadius: tokens.global.baseStyle.radius.none,
        transform: "translateX(0)",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      closing: {
        panelWidth: "24rem",
        panelHeight: "100dvh",
        panelRadius: tokens.global.baseStyle.radius.none,
        transform: "translateX(-100%)",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
    },
    right: {
      closed: {
        panelWidth: "24rem",
        panelHeight: "100dvh",
        panelRadius: tokens.global.baseStyle.radius.none,
        transform: "translateX(100%)",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      open: {
        panelWidth: "24rem",
        panelHeight: "100dvh",
        panelRadius: tokens.global.baseStyle.radius.none,
        transform: "translateX(0)",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      closing: {
        panelWidth: "24rem",
        panelHeight: "100dvh",
        panelRadius: tokens.global.baseStyle.radius.none,
        transform: "translateX(100%)",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
    },
    bottom: {
      closed: {
        panelWidth: "100dvw",
        panelHeight: "50dvh",
        panelRadius: tokens.global.baseStyle.radius.xl,
        transform: "translateY(100%)",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      open: {
        panelWidth: "100dvw",
        panelHeight: "50dvh",
        panelRadius: tokens.global.baseStyle.radius.xl,
        transform: "translateY(0)",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      closing: {
        panelWidth: "100dvw",
        panelHeight: "50dvh",
        panelRadius: tokens.global.baseStyle.radius.xl,
        transform: "translateY(100%)",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
    },
  },
} as const;

export type DrawerTokensContract = typeof drawerTokens;
export type DrawerVariant = Exclude<keyof DrawerTokensContract["styles"], "base">;
export type DrawerState = keyof DrawerTokensContract["styles"]["left"];
