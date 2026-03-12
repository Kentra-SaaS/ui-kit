import { kpiCardTokens } from "./kpi-card.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const kpiCardStyleMap = createComponentStyleMapFromTokens({
  id: "kpi-card",
  baseClass: "k-kpi-card",
  tokens: kpiCardTokens,
});
