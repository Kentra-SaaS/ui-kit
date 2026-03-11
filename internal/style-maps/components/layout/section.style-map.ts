import { sectionTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const sectionStyleMap = createComponentStyleMapFromTokens({
  id: "section",
  baseClass: "k-section",
  tokens: sectionTokens,
});
