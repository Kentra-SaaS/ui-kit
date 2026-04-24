import { createComponentStyleMapFromTokens } from "../../../core/style-maps";
import { tableWithToolbarPatternTokens } from "./table-with-toolbar-pattern.tokens";

export const tableWithToolbarPatternStyleMap =
  createComponentStyleMapFromTokens({
    id: "table-with-toolbar-pattern",
    baseClass: "k-table-with-toolbar-pattern",
    tokens: tableWithToolbarPatternTokens,
  });
