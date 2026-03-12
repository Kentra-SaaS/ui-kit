import { paginationTokens } from "./pagination.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const paginationStyleMap = createComponentStyleMapFromTokens({
  id: "pagination",
  baseClass: "k-pagination",
  tokens: paginationTokens,
});
