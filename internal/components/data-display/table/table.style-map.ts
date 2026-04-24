import { tableTokens } from "./table.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const tableStyleMap = createComponentStyleMapFromTokens({
  id: "table",
  baseClass: "k-table",
  tokens: tableTokens,
});
