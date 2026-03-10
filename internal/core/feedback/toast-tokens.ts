import { tokens } from "../../tokens";

const toastBaseStyle = {
  stack: {
    gap: tokens.global.baseStyle.space.step2,
    zIndex: tokens.global.baseStyle.zIndex.toast,
  },
  item: {
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    borderRadius: tokens.global.baseStyle.radius.md,
    paddingX: tokens.global.baseStyle.space.step4,
    paddingY: tokens.global.baseStyle.space.step3,
    gap: tokens.global.baseStyle.space.step3,
    shadow: tokens.theme.elevation.shadow.lg,
  },
  icon: {
    size: tokens.global.icon.size.md,
  },
  title: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.label.fontSize,
    lineHeight: tokens.global.typography.semantic.label.lineHeight,
    fontWeight: tokens.global.typography.semantic.label.fontWeight,
  },
  message: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.body.sm.fontSize,
    lineHeight: tokens.global.typography.semantic.body.sm.lineHeight,
    fontWeight: tokens.global.typography.semantic.body.fontWeight,
  },
  motion: {
    enterDuration: tokens.global.baseStyle.motion.duration.fast,
    visibleDuration: tokens.global.baseStyle.motion.duration.normal,
    exitDuration: tokens.global.baseStyle.motion.duration.fast,
    enterEasing: tokens.global.baseStyle.motion.ease.entrance,
    exitEasing: tokens.global.baseStyle.motion.ease.exit,
  },
} as const;

export const toastTokens = {
  styles: {
    info: {
      enter: {
        ...toastBaseStyle,
        opacity: "0",
        translateY: "0.75rem",
        colors: {
          bg: tokens.theme.colors.state.info.bg,
          border: tokens.theme.colors.state.info.fg,
          icon: tokens.theme.colors.state.info.fg,
          title: tokens.theme.colors.state.info.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      visible: {
        ...toastBaseStyle,
        opacity: "1",
        translateY: "0",
        colors: {
          bg: tokens.theme.colors.state.info.bg,
          border: tokens.theme.colors.state.info.fg,
          icon: tokens.theme.colors.state.info.fg,
          title: tokens.theme.colors.state.info.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      exit: {
        ...toastBaseStyle,
        opacity: "0",
        translateY: "-0.5rem",
        colors: {
          bg: tokens.theme.colors.state.info.bg,
          border: tokens.theme.colors.state.info.fg,
          icon: tokens.theme.colors.state.info.fg,
          title: tokens.theme.colors.state.info.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
    },
    success: {
      enter: {
        ...toastBaseStyle,
        opacity: "0",
        translateY: "0.75rem",
        colors: {
          bg: tokens.theme.colors.state.success.bg,
          border: tokens.theme.colors.state.success.fg,
          icon: tokens.theme.colors.state.success.fg,
          title: tokens.theme.colors.state.success.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      visible: {
        ...toastBaseStyle,
        opacity: "1",
        translateY: "0",
        colors: {
          bg: tokens.theme.colors.state.success.bg,
          border: tokens.theme.colors.state.success.fg,
          icon: tokens.theme.colors.state.success.fg,
          title: tokens.theme.colors.state.success.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      exit: {
        ...toastBaseStyle,
        opacity: "0",
        translateY: "-0.5rem",
        colors: {
          bg: tokens.theme.colors.state.success.bg,
          border: tokens.theme.colors.state.success.fg,
          icon: tokens.theme.colors.state.success.fg,
          title: tokens.theme.colors.state.success.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
    },
    warning: {
      enter: {
        ...toastBaseStyle,
        opacity: "0",
        translateY: "0.75rem",
        colors: {
          bg: tokens.theme.colors.state.warning.bg,
          border: tokens.theme.colors.state.warning.fg,
          icon: tokens.theme.colors.state.warning.fg,
          title: tokens.theme.colors.state.warning.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      visible: {
        ...toastBaseStyle,
        opacity: "1",
        translateY: "0",
        colors: {
          bg: tokens.theme.colors.state.warning.bg,
          border: tokens.theme.colors.state.warning.fg,
          icon: tokens.theme.colors.state.warning.fg,
          title: tokens.theme.colors.state.warning.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      exit: {
        ...toastBaseStyle,
        opacity: "0",
        translateY: "-0.5rem",
        colors: {
          bg: tokens.theme.colors.state.warning.bg,
          border: tokens.theme.colors.state.warning.fg,
          icon: tokens.theme.colors.state.warning.fg,
          title: tokens.theme.colors.state.warning.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
    },
    danger: {
      enter: {
        ...toastBaseStyle,
        opacity: "0",
        translateY: "0.75rem",
        colors: {
          bg: tokens.theme.colors.state.danger.bg,
          border: tokens.theme.colors.state.danger.fg,
          icon: tokens.theme.colors.state.danger.fg,
          title: tokens.theme.colors.state.danger.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      visible: {
        ...toastBaseStyle,
        opacity: "1",
        translateY: "0",
        colors: {
          bg: tokens.theme.colors.state.danger.bg,
          border: tokens.theme.colors.state.danger.fg,
          icon: tokens.theme.colors.state.danger.fg,
          title: tokens.theme.colors.state.danger.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      exit: {
        ...toastBaseStyle,
        opacity: "0",
        translateY: "-0.5rem",
        colors: {
          bg: tokens.theme.colors.state.danger.bg,
          border: tokens.theme.colors.state.danger.fg,
          icon: tokens.theme.colors.state.danger.fg,
          title: tokens.theme.colors.state.danger.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
    },
  },
} as const;

export type ToastTokensContract = typeof toastTokens;
export type ToastVariant = keyof ToastTokensContract["styles"];
export type ToastState = keyof ToastTokensContract["styles"]["info"];
