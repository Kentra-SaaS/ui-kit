import { donutChartTokens } from "./donut-chart.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const donutChartStyleMap = createComponentStyleMapFromTokens({
  id: "donut-chart",
  baseClass: "k-donut-chart",
  tokens: donutChartTokens,
});
