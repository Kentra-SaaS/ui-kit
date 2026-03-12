import { toastTokens } from "./toast.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const toastStyleMap = createComponentStyleMapFromTokens({
  id: "toast",
  baseClass: "k-toast",
  tokens: toastTokens,
});
