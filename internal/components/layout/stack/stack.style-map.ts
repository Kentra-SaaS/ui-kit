import { stackTokens } from "./stack.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const stackStyleMap = createComponentStyleMapFromTokens({
  id: "stack",
  baseClass: "k-stack",
  tokens: stackTokens,
});
