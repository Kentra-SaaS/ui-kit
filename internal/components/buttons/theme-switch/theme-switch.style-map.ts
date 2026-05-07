import { createComponentStyleMapFromTokens } from "../../../core/style-maps";
import { themeSwitchTokens } from "./theme-switch.tokens";

export const themeSwitchStyleMap = createComponentStyleMapFromTokens({
  id: "theme-switch",
  baseClass: "k-theme-switch",
  tokens: themeSwitchTokens,
  stateSelectors: {
    default: "&",
    hover: "&:hover, &.is-hover",
    active: "&:active, &.is-active",
    on: "&.is-on",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
    focusVisible:
      "&:focus-within:not(.is-hover):not(.is-active):not(.is-disabled), &.is-focus-visible",
  },
});
