import { selectTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const selectStyleMap = createComponentStyleMapFromTokens({
  id: "select",
  baseClass: "k-select",
  tokens: selectTokens,
});
