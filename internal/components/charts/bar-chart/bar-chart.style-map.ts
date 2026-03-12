import { barChartTokens } from "./bar-chart.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const barChartStyleMap = createComponentStyleMapFromTokens({
  id: "bar-chart",
  baseClass: "k-bar-chart",
  tokens: barChartTokens,
});
