import { toastTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const toastStyleMap = createComponentStyleMapFromTokens({
  id: "toast",
  baseClass: "k-toast",
  tokens: toastTokens,
});
