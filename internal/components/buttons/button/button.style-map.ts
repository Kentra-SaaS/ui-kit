import { buttonTokens } from "./button.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const buttonStyleMap = createComponentStyleMapFromTokens({
  id: "button",
  baseClass: "k-button",
  aliasPrefix: "btn",
  tokens: buttonTokens,
  stateSelectors: {
    default: "&",
    hover: "&:hover, &.is-hover",
    active: "&:active, &.is-active",
    focusVisible: "&:focus-within, &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
    loading: "&.is-loading",
  },
});
