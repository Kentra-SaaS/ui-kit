import { textInputTokens } from "./text-input.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps/helpers";

export const textInputStyleMap = createComponentStyleMapFromTokens({
  id: "text-input",
  baseClass: "k-text-input",
  tokens: textInputTokens,
  stateSelectors: {
    default: "&",
    focusVisible: "&:focus-within, &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
