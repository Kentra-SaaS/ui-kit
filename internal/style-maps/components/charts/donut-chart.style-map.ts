import { donutChartTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const donutChartStyleMap = createComponentStyleMapFromTokens({
  id: "donut-chart",
  baseClass: "k-donut-chart",
  tokens: donutChartTokens,
});
