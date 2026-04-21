import { checkboxTokens } from "./checkbox.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps/helpers";

export const checkboxStyleMap = createComponentStyleMapFromTokens({
  id: "checkbox",
  baseClass: "k-checkbox",
  tokens: checkboxTokens,
  stateSelectors: {
    default: "&",
    focusVisible: "&:focus-within.is-unchecked, &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
