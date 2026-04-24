import { radioGroupTokens } from "./radio-group.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps/helpers";

export const radioGroupStyleMap = createComponentStyleMapFromTokens({
  id: "radio-group",
  baseClass: "k-radio-group",
  tokens: radioGroupTokens,
  stateSelectors: {
    default: "&",
    focusVisible: "&:focus-within, &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
