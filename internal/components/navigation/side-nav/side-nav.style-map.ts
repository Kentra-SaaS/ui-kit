import { sideNavTokens } from "./side-nav.tokens";
import {
  createComponentStyleMapFromTokens,
  defaultInteractiveStateSelectors,
} from "../../../core/style-maps";

export const sideNavStyleMap = createComponentStyleMapFromTokens({
  id: "side-nav",
  baseClass: "k-side-nav",
  tokens: sideNavTokens,
  stateSelectors: {
    ...defaultInteractiveStateSelectors,
    active: "&.is-active",
    focusVisible: "&:focus-within, &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
