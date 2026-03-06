import { token } from "./token-types";

export const baseStyleTokens = {
  space: {
    step0: token("--k-space-0"),
    px: token("--k-space-px"),
    step1: token("--k-space-1"),
    step2: token("--k-space-2"),
    step3: token("--k-space-3"),
    step4: token("--k-space-4"),
    step5: token("--k-space-5"),
    step6: token("--k-space-6"),
    step8: token("--k-space-8"),
    step10: token("--k-space-10"),
    step12: token("--k-space-12"),
    step16: token("--k-space-16"),
  },
  radius: {
    none: token("--k-radius-none"),
    xs: token("--k-radius-xs"),
    sm: token("--k-radius-sm"),
    md: token("--k-radius-md"),
    lg: token("--k-radius-lg"),
    xl: token("--k-radius-xl"),
    xxl: token("--k-radius-2xl"),
    pill: token("--k-radius-pill"),
  },
  borderWidth: {
    thin: token("--k-border-width-thin"),
    default: token("--k-border-width-default"),
  },
  motion: {
    duration: {
      fast: token("--k-motion-duration-fast"),
      normal: token("--k-motion-duration-normal"),
      slow: token("--k-motion-duration-slow"),
    },
    ease: {
      standard: token("--k-motion-ease-standard"),
      entrance: token("--k-motion-ease-entrance"),
      exit: token("--k-motion-ease-exit"),
    },
  },
  zIndex: {
    base: token("--k-z-index-base"),
    raised: token("--k-z-index-raised"),
    dropdown: token("--k-z-index-dropdown"),
    sticky: token("--k-z-index-sticky"),
    overlay: token("--k-z-index-overlay"),
    modal: token("--k-z-index-modal"),
    popover: token("--k-z-index-popover"),
    toast: token("--k-z-index-toast"),
    tooltip: token("--k-z-index-tooltip"),
  },
} as const;

export type BaseStyleTokensContract = typeof baseStyleTokens;
