import { tabsTokens } from "./tabs.tokens";
import {
  createComponentStyleMapFromTokens,
  defaultInteractiveStateSelectors,
} from "../../../core/style-maps";

export const tabsStyleMap = createComponentStyleMapFromTokens({
  id: "tabs",
  baseClass: "k-tabs",
  tokens: tabsTokens,
  stateSelectors: {
    ...defaultInteractiveStateSelectors,
    active: "&.is-active",
    focusVisible: "&:focus-within, &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
