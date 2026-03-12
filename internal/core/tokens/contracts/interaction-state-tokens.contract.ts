import { token } from "./token-types";

export const interactionStateTokens = {
  hoverOverlay: token("--k-color-state-hover-overlay"),
  activeOverlay: token("--k-color-state-active-overlay"),
  selected: {
    bg: token("--k-color-state-selected-bg"),
    text: token("--k-color-state-selected-text"),
  },
  focus: {
    ring: token("--k-color-state-focus-ring"),
    outline: token("--k-color-state-focus-outline"),
  },
  disabled: {
    bg: token("--k-color-state-disabled-bg"),
    border: token("--k-color-state-disabled-border"),
    text: token("--k-color-state-disabled-text"),
    icon: token("--k-color-state-disabled-icon"),
    opacity: token("--k-state-disabled-opacity"),
  },
} as const;

export type InteractionStateTokensContract = typeof interactionStateTokens;
