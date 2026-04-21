import { textareaTokens } from "./textarea.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps/helpers";

export const textareaStyleMap = createComponentStyleMapFromTokens({
  id: "textarea",
  baseClass: "k-textarea",
  tokens: textareaTokens,
  stateSelectors: {
    default: "&",
    focusVisible: "&:focus-within, &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
