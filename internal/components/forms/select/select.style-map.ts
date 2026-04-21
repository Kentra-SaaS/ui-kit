import { selectTokens } from "./select.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps/helpers";

export const selectStyleMap = createComponentStyleMapFromTokens({
  id: "select",
  baseClass: "k-select",
  tokens: selectTokens,
  stateSelectors: {
    default: "&",
    focusVisible: "&:focus-within, &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
