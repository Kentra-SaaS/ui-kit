import { containerTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const containerStyleMap = createComponentStyleMapFromTokens({
  id: "container",
  baseClass: "k-container",
  tokens: containerTokens,
});
