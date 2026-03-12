import { selectTokens } from "./select.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const selectStyleMap = createComponentStyleMapFromTokens({
  id: "select",
  baseClass: "k-select",
  tokens: selectTokens,
});
