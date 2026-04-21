import { switchTokens } from "./switch.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps/helpers";

export const switchStyleMap = createComponentStyleMapFromTokens({
  id: "switch",
  baseClass: "k-switch",
  tokens: switchTokens,
  stateSelectors: {
    default: "&",
    focusVisible: "&:focus-within.is-off, &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
