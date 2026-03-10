import { token } from "./token-types";

export const themeColorTokens = {
  background: {
    surface: token("--k-color-bg-surface"),
    elevated: token("--k-color-bg-elevated"),
    inverse: token("--k-color-bg-inverse"),
  },
  text: {
    primary: token("--k-color-text-primary"),
    secondary: token("--k-color-text-secondary"),
    inverse: token("--k-color-text-inverse"),
  },
  border: {
    subtle: token("--k-color-border-subtle"),
    default: token("--k-color-border-default"),
    strong: token("--k-color-border-strong"),
    focusRing: token("--k-color-focus-ring"),
  },
  link: {
    default: token("--k-color-link-default"),
    hover: token("--k-color-link-hover"),
    visited: token("--k-color-link-visited"),
  },
  action: {
    primary: {
      bg: token("--k-color-action-primary-bg"),
      bgHover: token("--k-color-action-primary-bg-hover"),
      bgActive: token("--k-color-action-primary-bg-active"),
      text: token("--k-color-action-primary-text"),
      disabledBg: token("--k-color-action-primary-disabled-bg"),
      disabledText: token("--k-color-action-primary-disabled-text"),
    },
    secondary: {
      bg: token("--k-color-action-secondary-bg"),
      bgHover: token("--k-color-action-secondary-bg-hover"),
      bgActive: token("--k-color-action-secondary-bg-active"),
      border: token("--k-color-action-secondary-border"),
      text: token("--k-color-action-secondary-text"),
      disabledBg: token("--k-color-action-secondary-disabled-bg"),
      disabledText: token("--k-color-action-secondary-disabled-text"),
      disabledBorder: token("--k-color-action-secondary-disabled-border"),
    },
  },
  input: {
    bg: token("--k-color-input-bg"),
    text: token("--k-color-input-text"),
    border: token("--k-color-input-border"),
    placeholder: token("--k-color-input-placeholder"),
    disabledBg: token("--k-color-input-disabled-bg"),
    disabledText: token("--k-color-input-disabled-text"),
    disabledBorder: token("--k-color-input-disabled-border"),
  },
  overlay: {
    backdrop: token("--k-color-overlay-backdrop"),
  },
  state: {
    info: {
      fg: token("--k-color-state-info"),
      bg: token("--k-color-state-info-bg"),
    },
    success: {
      fg: token("--k-color-state-success"),
      bg: token("--k-color-state-success-bg"),
    },
    warning: {
      fg: token("--k-color-state-warning"),
      bg: token("--k-color-state-warning-bg"),
    },
    danger: {
      fg: token("--k-color-state-danger"),
      bg: token("--k-color-state-danger-bg"),
    },
  },
} as const;

export type ThemeColorTokensContract = typeof themeColorTokens;
