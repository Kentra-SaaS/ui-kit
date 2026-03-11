import { chartContainerTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const chartContainerStyleMap = createComponentStyleMapFromTokens({
  id: "chart-container",
  baseClass: "k-chart-container",
  tokens: chartContainerTokens,
});
