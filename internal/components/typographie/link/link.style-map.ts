import { linkTokens } from "./link.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const linkStyleMap = createComponentStyleMapFromTokens({
  id: "link",
  baseClass: "k-link",
  tokens: linkTokens,
  stateSelectors: {
    default: "&",
    hover: "&:hover, &.is-hover",
    focusVisible: "&:focus-within, &.is-focus-visible",
    visited: "&.is-visited",
    disabled: "&.is-disabled, &[aria-disabled='true']",
  },
});
