import { spinnerTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const spinnerStyleMap = createComponentStyleMapFromTokens({
  id: "spinner",
  baseClass: "k-spinner",
  tokens: spinnerTokens,
});
