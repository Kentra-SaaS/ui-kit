import { paginationTokens } from "./pagination.tokens";
import {
  createComponentStyleMapFromTokens,
  defaultInteractiveStateSelectors,
} from "../../../core/style-maps";

export const paginationStyleMap = createComponentStyleMapFromTokens({
  id: "pagination",
  baseClass: "k-pagination",
  tokens: paginationTokens,
  stateSelectors: {
    ...defaultInteractiveStateSelectors,
    active: "&.is-active",
    focusVisible: "&:focus-within, &.is-focus-visible",
    disabled: "&.is-disabled, &:disabled, &[aria-disabled='true']",
  },
});
