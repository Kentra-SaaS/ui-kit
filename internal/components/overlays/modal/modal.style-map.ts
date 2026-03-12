import { modalTokens } from "./modal.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const modalStyleMap = createComponentStyleMapFromTokens({
  id: "modal",
  baseClass: "k-modal",
  tokens: modalTokens,
});
