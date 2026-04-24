import { fieldTokens } from "./field.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps/helpers";

export const fieldStyleMap = createComponentStyleMapFromTokens({
  id: "field",
  baseClass: "k-field",
  tokens: fieldTokens,
  stateSelectors: {
    default: "&",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
