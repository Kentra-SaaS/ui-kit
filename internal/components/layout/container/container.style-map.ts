import { containerTokens } from "./container.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const containerStyleMap = createComponentStyleMapFromTokens({
  id: "container",
  baseClass: "k-container",
  tokens: containerTokens,
});
