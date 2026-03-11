import { tokens } from "../../core";

const baseSelectStyle = {
  border: {
    width: tokens.global.baseStyle.borderWidth.thin,
    radius: tokens.global.baseStyle.radius.md,
  },
  typography: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.body.md.fontSize,
    lineHeight: tokens.global.typography.semantic.body.md.lineHeight,
    fontWeight: tokens.global.typography.semantic.body.fontWeight,
  },
  trigger: {
    minHeight: tokens.global.baseStyle.space.step10,
    paddingX: tokens.global.baseStyle.space.step3,
    paddingY: tokens.global.baseStyle.space.step2,
    iconGap: tokens.global.baseStyle.space.step2,
  },
  menu: {
    radius: tokens.global.baseStyle.radius.md,
    paddingY: tokens.global.baseStyle.space.step1,
    itemPaddingX: tokens.global.baseStyle.space.step3,
    itemPaddingY: tokens.global.baseStyle.space.step2,
    shadow: tokens.theme.elevation.shadow.md,
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

export const selectTokens = {
  styles: {
    base: baseSelectStyle,
    default: {
      default: {
        colors: {
          triggerBg: tokens.theme.colors.input.bg,
          triggerText: tokens.theme.colors.input.text,
          triggerBorder: tokens.theme.colors.input.border,
          placeholder: tokens.theme.colors.input.placeholder,
          icon: tokens.theme.colors.text.secondary,
          menuBg: tokens.theme.colors.background.elevated,
          menuText: tokens.theme.colors.text.primary,
          menuBorder: tokens.theme.colors.border.subtle,
        },
      },
      open: {
        colors: {
          triggerBg: tokens.theme.colors.input.bg,
          triggerText: tokens.theme.colors.input.text,
          triggerBorder: tokens.theme.interactionState.focus.ring,
          placeholder: tokens.theme.colors.input.placeholder,
          icon: tokens.theme.colors.text.secondary,
          menuBg: tokens.theme.colors.background.elevated,
          menuText: tokens.theme.colors.text.primary,
          menuBorder: tokens.theme.colors.border.subtle,
        },
      },
      focusVisible: {
        colors: {
          triggerBg: tokens.theme.colors.input.bg,
          triggerText: tokens.theme.colors.input.text,
          triggerBorder: tokens.theme.interactionState.focus.ring,
          placeholder: tokens.theme.colors.input.placeholder,
          icon: tokens.theme.colors.text.secondary,
          menuBg: tokens.theme.colors.background.elevated,
          menuText: tokens.theme.colors.text.primary,
          menuBorder: tokens.theme.colors.border.subtle,
        },
      },
      disabled: {
        colors: {
          triggerBg: tokens.theme.colors.input.disabledBg,
          triggerText: tokens.theme.colors.input.disabledText,
          triggerBorder: tokens.theme.colors.input.disabledBorder,
          placeholder: tokens.theme.interactionState.disabled.text,
          icon: tokens.theme.interactionState.disabled.icon,
          menuBg: tokens.theme.colors.background.elevated,
          menuText: tokens.theme.interactionState.disabled.text,
          menuBorder: tokens.theme.colors.border.subtle,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      error: {
        colors: {
          triggerBg: tokens.theme.colors.input.bg,
          triggerText: tokens.theme.colors.input.text,
          triggerBorder: tokens.theme.colors.state.danger.fg,
          placeholder: tokens.theme.colors.input.placeholder,
          icon: tokens.theme.colors.state.danger.fg,
          menuBg: tokens.theme.colors.background.elevated,
          menuText: tokens.theme.colors.text.primary,
          menuBorder: tokens.theme.colors.state.danger.fg,
        },
      },
    },
    compact: {
      default: {
        trigger: {
          ...baseSelectStyle.trigger,
          minHeight: tokens.global.baseStyle.space.step8,
          paddingX: tokens.global.baseStyle.space.step2,
        },
        menu: {
          ...baseSelectStyle.menu,
          itemPaddingX: tokens.global.baseStyle.space.step2,
          itemPaddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          triggerBg: tokens.theme.colors.input.bg,
          triggerText: tokens.theme.colors.input.text,
          triggerBorder: tokens.theme.colors.input.border,
          placeholder: tokens.theme.colors.input.placeholder,
          icon: tokens.theme.colors.text.secondary,
          menuBg: tokens.theme.colors.background.elevated,
          menuText: tokens.theme.colors.text.primary,
          menuBorder: tokens.theme.colors.border.subtle,
        },
      },
      open: {
        trigger: {
          ...baseSelectStyle.trigger,
          minHeight: tokens.global.baseStyle.space.step8,
          paddingX: tokens.global.baseStyle.space.step2,
        },
        menu: {
          ...baseSelectStyle.menu,
          itemPaddingX: tokens.global.baseStyle.space.step2,
          itemPaddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          triggerBg: tokens.theme.colors.input.bg,
          triggerText: tokens.theme.colors.input.text,
          triggerBorder: tokens.theme.interactionState.focus.ring,
          placeholder: tokens.theme.colors.input.placeholder,
          icon: tokens.theme.colors.text.secondary,
          menuBg: tokens.theme.colors.background.elevated,
          menuText: tokens.theme.colors.text.primary,
          menuBorder: tokens.theme.colors.border.subtle,
        },
      },
      focusVisible: {
        trigger: {
          ...baseSelectStyle.trigger,
          minHeight: tokens.global.baseStyle.space.step8,
          paddingX: tokens.global.baseStyle.space.step2,
        },
        menu: {
          ...baseSelectStyle.menu,
          itemPaddingX: tokens.global.baseStyle.space.step2,
          itemPaddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          triggerBg: tokens.theme.colors.input.bg,
          triggerText: tokens.theme.colors.input.text,
          triggerBorder: tokens.theme.interactionState.focus.ring,
          placeholder: tokens.theme.colors.input.placeholder,
          icon: tokens.theme.colors.text.secondary,
          menuBg: tokens.theme.colors.background.elevated,
          menuText: tokens.theme.colors.text.primary,
          menuBorder: tokens.theme.colors.border.subtle,
        },
      },
      disabled: {
        trigger: {
          ...baseSelectStyle.trigger,
          minHeight: tokens.global.baseStyle.space.step8,
          paddingX: tokens.global.baseStyle.space.step2,
        },
        menu: {
          ...baseSelectStyle.menu,
          itemPaddingX: tokens.global.baseStyle.space.step2,
          itemPaddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          triggerBg: tokens.theme.colors.input.disabledBg,
          triggerText: tokens.theme.colors.input.disabledText,
          triggerBorder: tokens.theme.colors.input.disabledBorder,
          placeholder: tokens.theme.interactionState.disabled.text,
          icon: tokens.theme.interactionState.disabled.icon,
          menuBg: tokens.theme.colors.background.elevated,
          menuText: tokens.theme.interactionState.disabled.text,
          menuBorder: tokens.theme.colors.border.subtle,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      error: {
        trigger: {
          ...baseSelectStyle.trigger,
          minHeight: tokens.global.baseStyle.space.step8,
          paddingX: tokens.global.baseStyle.space.step2,
        },
        menu: {
          ...baseSelectStyle.menu,
          itemPaddingX: tokens.global.baseStyle.space.step2,
          itemPaddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          triggerBg: tokens.theme.colors.input.bg,
          triggerText: tokens.theme.colors.input.text,
          triggerBorder: tokens.theme.colors.state.danger.fg,
          placeholder: tokens.theme.colors.input.placeholder,
          icon: tokens.theme.colors.state.danger.fg,
          menuBg: tokens.theme.colors.background.elevated,
          menuText: tokens.theme.colors.text.primary,
          menuBorder: tokens.theme.colors.state.danger.fg,
        },
      },
    },
  },
} as const;

export type SelectTokensContract = typeof selectTokens;
export type SelectVariant = Exclude<keyof SelectTokensContract["styles"], "base">;
export type SelectState = keyof SelectTokensContract["styles"]["default"];
