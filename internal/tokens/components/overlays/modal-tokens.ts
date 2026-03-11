import { tokens } from "../../core";

const modalBaseStyle = {
  backdrop: {
    color: tokens.theme.colors.overlay.backdrop,
    zIndex: tokens.global.baseStyle.zIndex.overlay,
  },
  panel: {
    borderRadius: tokens.global.baseStyle.radius.lg,
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    shadow: tokens.theme.elevation.shadow.lg,
    zIndex: tokens.global.baseStyle.zIndex.modal,
  },
  spacing: {
    headerPaddingX: tokens.global.baseStyle.space.step5,
    headerPaddingY: tokens.global.baseStyle.space.step4,
    bodyPaddingX: tokens.global.baseStyle.space.step5,
    bodyPaddingY: tokens.global.baseStyle.space.step4,
    footerPaddingX: tokens.global.baseStyle.space.step5,
    footerPaddingY: tokens.global.baseStyle.space.step4,
    sectionGap: tokens.global.baseStyle.space.step4,
  },
  typography: {
    title: {
      family: tokens.global.typography.family.heading,
      fontSize: tokens.global.typography.semantic.h4.fontSize,
      lineHeight: tokens.global.typography.semantic.h4.lineHeight,
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

export const modalTokens = {
  styles: {
    sm: {
      closed: {
        ...modalBaseStyle,
        panelWidth: "32rem",
        panelMaxHeight: "80dvh",
        opacity: "0",
        scale: "0.98",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      open: {
        ...modalBaseStyle,
        panelWidth: "32rem",
        panelMaxHeight: "80dvh",
        opacity: "1",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      closing: {
        ...modalBaseStyle,
        panelWidth: "32rem",
        panelMaxHeight: "80dvh",
        opacity: "0",
        scale: "0.99",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
    },
    md: {
      closed: {
        ...modalBaseStyle,
        panelWidth: "44rem",
        panelMaxHeight: "82dvh",
        opacity: "0",
        scale: "0.98",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      open: {
        ...modalBaseStyle,
        panelWidth: "44rem",
        panelMaxHeight: "82dvh",
        opacity: "1",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      closing: {
        ...modalBaseStyle,
        panelWidth: "44rem",
        panelMaxHeight: "82dvh",
        opacity: "0",
        scale: "0.99",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
    },
    lg: {
      closed: {
        ...modalBaseStyle,
        panelWidth: "60rem",
        panelMaxHeight: "86dvh",
        opacity: "0",
        scale: "0.98",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      open: {
        ...modalBaseStyle,
        panelWidth: "60rem",
        panelMaxHeight: "86dvh",
        opacity: "1",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      closing: {
        ...modalBaseStyle,
        panelWidth: "60rem",
        panelMaxHeight: "86dvh",
        opacity: "0",
        scale: "0.99",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
    },
    fullscreen: {
      closed: {
        ...modalBaseStyle,
        panelWidth: "100dvw",
        panelMaxHeight: "100dvh",
        panelRadius: tokens.global.baseStyle.radius.none,
        opacity: "0",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      open: {
        ...modalBaseStyle,
        panelWidth: "100dvw",
        panelMaxHeight: "100dvh",
        panelRadius: tokens.global.baseStyle.radius.none,
        opacity: "1",
        scale: "1",
        colors: {
          panelBg: tokens.theme.colors.background.elevated,
          panelBorder: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          body: tokens.theme.colors.text.secondary,
        },
      },
      closing: {
        ...modalBaseStyle,
        panelWidth: "100dvw",
        panelMaxHeight: "100dvh",
        panelRadius: tokens.global.baseStyle.radius.none,
        opacity: "0",
        scale: "1",
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

export type ModalTokensContract = typeof modalTokens;
export type ModalVariant = keyof ModalTokensContract["styles"];
export type ModalState = keyof ModalTokensContract["styles"]["sm"];
