import { alertTokens } from "./alert.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const alertStyleMap = createComponentStyleMapFromTokens({
  id: "alert",
  baseClass: "k-alert",
  tokens: alertTokens,
});
