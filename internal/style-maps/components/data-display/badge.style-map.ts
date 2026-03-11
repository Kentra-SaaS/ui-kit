import { badgeTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const badgeStyleMap = createComponentStyleMapFromTokens({
  id: "badge",
  baseClass: "k-badge",
  tokens: badgeTokens,
});
