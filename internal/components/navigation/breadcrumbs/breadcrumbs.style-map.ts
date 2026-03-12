import { breadcrumbsTokens } from "./breadcrumbs.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const breadcrumbsStyleMap = createComponentStyleMapFromTokens({
  id: "breadcrumbs",
  baseClass: "k-breadcrumbs",
  tokens: breadcrumbsTokens,
});
