import { tokens } from "../../../core/tokens";

const alertBaseStyle = {
  container: {
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    borderRadius: tokens.global.baseStyle.radius.md,
    paddingX: tokens.global.baseStyle.space.step4,
    paddingY: tokens.global.baseStyle.space.step3,
    gap: tokens.global.baseStyle.space.step3,
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
  closeAction: {
    size: tokens.global.baseStyle.space.step8,
    radius: tokens.global.baseStyle.radius.sm,
  },
  focus: {
    ringColor: tokens.theme.interactionState.focus.ring,
    outlineColor: tokens.theme.interactionState.focus.outline,
    shadow: tokens.theme.elevation.shadow.focus,
  },
} as const;

export const alertTokens = {
  styles: {
    base: alertBaseStyle,
    info: {
      default: {
        colors: {
          bg: tokens.theme.colors.state.info.bg,
          border: tokens.theme.colors.state.info.fg,
          icon: tokens.theme.colors.state.info.fg,
          title: tokens.theme.colors.state.info.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      dismissible: {
        closeAction: {
          ...alertBaseStyle.closeAction,
          hoverOverlay: tokens.theme.interactionState.hoverOverlay,
        },
        colors: {
          bg: tokens.theme.colors.state.info.bg,
          border: tokens.theme.colors.state.info.fg,
          icon: tokens.theme.colors.state.info.fg,
          title: tokens.theme.colors.state.info.fg,
          message: tokens.theme.colors.text.primary,
          closeIcon: tokens.theme.colors.state.info.fg,
        },
      },
    },
    success: {
      default: {
        colors: {
          bg: tokens.theme.colors.state.success.bg,
          border: tokens.theme.colors.state.success.fg,
          icon: tokens.theme.colors.state.success.fg,
          title: tokens.theme.colors.state.success.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      dismissible: {
        closeAction: {
          ...alertBaseStyle.closeAction,
          hoverOverlay: tokens.theme.interactionState.hoverOverlay,
        },
        colors: {
          bg: tokens.theme.colors.state.success.bg,
          border: tokens.theme.colors.state.success.fg,
          icon: tokens.theme.colors.state.success.fg,
          title: tokens.theme.colors.state.success.fg,
          message: tokens.theme.colors.text.primary,
          closeIcon: tokens.theme.colors.state.success.fg,
        },
      },
    },
    warning: {
      default: {
        colors: {
          bg: tokens.theme.colors.state.warning.bg,
          border: tokens.theme.colors.state.warning.fg,
          icon: tokens.theme.colors.state.warning.fg,
          title: tokens.theme.colors.state.warning.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      dismissible: {
        closeAction: {
          ...alertBaseStyle.closeAction,
          hoverOverlay: tokens.theme.interactionState.hoverOverlay,
        },
        colors: {
          bg: tokens.theme.colors.state.warning.bg,
          border: tokens.theme.colors.state.warning.fg,
          icon: tokens.theme.colors.state.warning.fg,
          title: tokens.theme.colors.state.warning.fg,
          message: tokens.theme.colors.text.primary,
          closeIcon: tokens.theme.colors.state.warning.fg,
        },
      },
    },
    danger: {
      default: {
        colors: {
          bg: tokens.theme.colors.state.danger.bg,
          border: tokens.theme.colors.state.danger.fg,
          icon: tokens.theme.colors.state.danger.fg,
          title: tokens.theme.colors.state.danger.fg,
          message: tokens.theme.colors.text.primary,
        },
      },
      dismissible: {
        closeAction: {
          ...alertBaseStyle.closeAction,
          hoverOverlay: tokens.theme.interactionState.hoverOverlay,
        },
        colors: {
          bg: tokens.theme.colors.state.danger.bg,
          border: tokens.theme.colors.state.danger.fg,
          icon: tokens.theme.colors.state.danger.fg,
          title: tokens.theme.colors.state.danger.fg,
          message: tokens.theme.colors.text.primary,
          closeIcon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
  },
} as const;

export type AlertTokensContract = typeof alertTokens;
export type AlertVariant = Exclude<keyof AlertTokensContract["styles"], "base">;
export type AlertState = keyof AlertTokensContract["styles"]["info"];
