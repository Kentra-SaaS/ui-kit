import { lineChartTokens } from "./line-chart.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const lineChartStyleMap = createComponentStyleMapFromTokens({
  id: "line-chart",
  baseClass: "k-line-chart",
  tokens: lineChartTokens,
});
