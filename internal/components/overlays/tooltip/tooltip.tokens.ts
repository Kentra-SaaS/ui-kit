import { tokens } from "../../../core/tokens";

const tooltipBaseStyle = {
  panel: {
    borderRadius: tokens.global.baseStyle.radius.sm,
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    paddingX: tokens.global.baseStyle.space.step2,
    paddingY: tokens.global.baseStyle.space.step1,
    shadow: tokens.theme.elevation.shadow.sm,
    zIndex: tokens.global.baseStyle.zIndex.tooltip,
    maxWidth: "20rem",
  },
  arrow: {
    size: "0.5rem",
  },
  typography: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.caption.fontSize,
    lineHeight: tokens.global.typography.semantic.caption.lineHeight,
    fontWeight: tokens.global.typography.semantic.body.fontWeight,
  },
  motion: {
    enterDuration: tokens.global.baseStyle.motion.duration.fast,
    exitDuration: tokens.global.baseStyle.motion.duration.fast,
    enterEasing: tokens.global.baseStyle.motion.ease.entrance,
    exitEasing: tokens.global.baseStyle.motion.ease.exit,
  },
} as const;

export const tooltipTokens = {
  styles: {
    base: tooltipBaseStyle,
    top: {
      hidden: {
        offset: "0.5rem",
        opacity: "0",
        transform: "translateY(0.25rem)",
        colors: {
          bg: tokens.theme.colors.background.inverse,
          text: tokens.theme.colors.text.inverse,
          border: tokens.theme.colors.background.inverse,
          arrow: tokens.theme.colors.background.inverse,
        },
      },
      visible: {
        offset: "0.5rem",
        opacity: "1",
        transform: "translateY(0)",
        colors: {
          bg: tokens.theme.colors.background.inverse,
          text: tokens.theme.colors.text.inverse,
          border: tokens.theme.colors.background.inverse,
          arrow: tokens.theme.colors.background.inverse,
        },
      },
    },
    right: {
      hidden: {
        offset: "0.5rem",
        opacity: "0",
        transform: "translateX(-0.25rem)",
        colors: {
          bg: tokens.theme.colors.background.inverse,
          text: tokens.theme.colors.text.inverse,
          border: tokens.theme.colors.background.inverse,
          arrow: tokens.theme.colors.background.inverse,
        },
      },
      visible: {
        offset: "0.5rem",
        opacity: "1",
        transform: "translateX(0)",
        colors: {
          bg: tokens.theme.colors.background.inverse,
          text: tokens.theme.colors.text.inverse,
          border: tokens.theme.colors.background.inverse,
          arrow: tokens.theme.colors.background.inverse,
        },
      },
    },
    bottom: {
      hidden: {
        offset: "0.5rem",
        opacity: "0",
        transform: "translateY(-0.25rem)",
        colors: {
          bg: tokens.theme.colors.background.inverse,
          text: tokens.theme.colors.text.inverse,
          border: tokens.theme.colors.background.inverse,
          arrow: tokens.theme.colors.background.inverse,
        },
      },
      visible: {
        offset: "0.5rem",
        opacity: "1",
        transform: "translateY(0)",
        colors: {
          bg: tokens.theme.colors.background.inverse,
          text: tokens.theme.colors.text.inverse,
          border: tokens.theme.colors.background.inverse,
          arrow: tokens.theme.colors.background.inverse,
        },
      },
    },
    left: {
      hidden: {
        offset: "0.5rem",
        opacity: "0",
        transform: "translateX(0.25rem)",
        colors: {
          bg: tokens.theme.colors.background.inverse,
          text: tokens.theme.colors.text.inverse,
          border: tokens.theme.colors.background.inverse,
          arrow: tokens.theme.colors.background.inverse,
        },
      },
      visible: {
        offset: "0.5rem",
        opacity: "1",
        transform: "translateX(0)",
        colors: {
          bg: tokens.theme.colors.background.inverse,
          text: tokens.theme.colors.text.inverse,
          border: tokens.theme.colors.background.inverse,
          arrow: tokens.theme.colors.background.inverse,
        },
      },
    },
  },
} as const;

export type TooltipTokensContract = typeof tooltipTokens;
export type TooltipVariant = Exclude<keyof TooltipTokensContract["styles"], "base">;
export type TooltipState = keyof TooltipTokensContract["styles"]["top"];
