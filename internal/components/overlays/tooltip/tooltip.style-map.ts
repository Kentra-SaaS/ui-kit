import { tooltipTokens } from "./tooltip.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const tooltipStyleMap = createComponentStyleMapFromTokens({
  id: "tooltip",
  baseClass: "k-tooltip",
  tokens: tooltipTokens,
});
