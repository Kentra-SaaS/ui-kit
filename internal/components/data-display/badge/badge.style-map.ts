import { badgeTokens } from "./badge.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const badgeStyleMap = createComponentStyleMapFromTokens({
  id: "badge",
  baseClass: "k-badge",
  tokens: badgeTokens,
});
