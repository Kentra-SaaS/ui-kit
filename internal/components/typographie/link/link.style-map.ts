import { linkTokens } from "./link.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const linkStyleMap = createComponentStyleMapFromTokens({
  id: "link",
  baseClass: "k-link",
  tokens: linkTokens,
});
