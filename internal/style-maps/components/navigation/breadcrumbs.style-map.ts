import { breadcrumbsTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const breadcrumbsStyleMap = createComponentStyleMapFromTokens({
  id: "breadcrumbs",
  baseClass: "k-breadcrumbs",
  tokens: breadcrumbsTokens,
});
