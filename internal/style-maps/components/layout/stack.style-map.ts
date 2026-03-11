import { stackTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const stackStyleMap = createComponentStyleMapFromTokens({
  id: "stack",
  baseClass: "k-stack",
  tokens: stackTokens,
});
