import { barChartTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const barChartStyleMap = createComponentStyleMapFromTokens({
  id: "bar-chart",
  baseClass: "k-bar-chart",
  tokens: barChartTokens,
});
