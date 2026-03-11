import { tableTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const tableStyleMap = createComponentStyleMapFromTokens({
  id: "table",
  baseClass: "k-table",
  tokens: tableTokens,
});
