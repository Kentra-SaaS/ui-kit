import { sectionTokens } from "./section.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const sectionStyleMap = createComponentStyleMapFromTokens({
  id: "section",
  baseClass: "k-section",
  tokens: sectionTokens,
});
