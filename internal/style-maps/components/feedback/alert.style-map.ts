import { alertTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const alertStyleMap = createComponentStyleMapFromTokens({
  id: "alert",
  baseClass: "k-alert",
  tokens: alertTokens,
});
