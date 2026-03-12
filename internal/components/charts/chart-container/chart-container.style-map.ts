import { chartContainerTokens } from "./chart-container.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const chartContainerStyleMap = createComponentStyleMapFromTokens({
  id: "chart-container",
  baseClass: "k-chart-container",
  tokens: chartContainerTokens,
});
