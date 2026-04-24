import { iconButtonTokens } from "./icon-button.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const iconButtonStyleMap = createComponentStyleMapFromTokens({
  id: "icon-button",
  baseClass: "k-icon-button",
  tokens: iconButtonTokens,
  stateSelectors: {
    default: "&",
    hover: "&:hover, &.is-hover",
    active: "&:active, &.is-active",
    focusVisible:
      "&:focus-within:not(.is-hover):not(.is-active):not(.is-disabled), &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
