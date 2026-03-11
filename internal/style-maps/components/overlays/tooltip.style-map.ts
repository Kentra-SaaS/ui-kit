import { tooltipTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const tooltipStyleMap = createComponentStyleMapFromTokens({
  id: "tooltip",
  baseClass: "k-tooltip",
  tokens: tooltipTokens,
});
