import { kpiCardTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const kpiCardStyleMap = createComponentStyleMapFromTokens({
  id: "kpi-card",
  baseClass: "k-kpi-card",
  tokens: kpiCardTokens,
});
