import { spinnerTokens } from "./spinner.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const spinnerStyleMap = createComponentStyleMapFromTokens({
  id: "spinner",
  baseClass: "k-spinner",
  tokens: spinnerTokens,
});
