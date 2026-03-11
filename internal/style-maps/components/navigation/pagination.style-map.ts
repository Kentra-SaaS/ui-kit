import { paginationTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const paginationStyleMap = createComponentStyleMapFromTokens({
  id: "pagination",
  baseClass: "k-pagination",
  tokens: paginationTokens,
});
