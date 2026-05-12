import { createComponentStyleMapFromTokens } from "../../../core/style-maps";
import { cardTokens } from "./card.tokens";

export const cardStyleMap = createComponentStyleMapFromTokens({
  id: "card",
  baseClass: "k-card",
  tokens: cardTokens,
});
