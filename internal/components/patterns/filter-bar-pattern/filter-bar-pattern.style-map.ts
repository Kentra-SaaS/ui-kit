import { createComponentStyleMapFromTokens } from "../../../core/style-maps";
import { filterBarPatternTokens } from "./filter-bar-pattern.tokens";

export const filterBarPatternStyleMap = createComponentStyleMapFromTokens({
  id: "filter-bar-pattern",
  baseClass: "k-filter-bar-pattern",
  tokens: filterBarPatternTokens,
});
