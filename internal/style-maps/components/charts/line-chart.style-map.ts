import { lineChartTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const lineChartStyleMap = createComponentStyleMapFromTokens({
  id: "line-chart",
  baseClass: "k-line-chart",
  tokens: lineChartTokens,
});
