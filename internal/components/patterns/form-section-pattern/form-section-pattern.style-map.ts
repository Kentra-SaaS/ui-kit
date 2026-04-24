import { createComponentStyleMapFromTokens } from "../../../core/style-maps";
import { formSectionPatternTokens } from "./form-section-pattern.tokens";

export const formSectionPatternStyleMap = createComponentStyleMapFromTokens({
  id: "form-section-pattern",
  baseClass: "k-form-section-pattern",
  tokens: formSectionPatternTokens,
});
