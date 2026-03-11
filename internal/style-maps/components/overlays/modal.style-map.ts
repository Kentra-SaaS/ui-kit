import { modalTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const modalStyleMap = createComponentStyleMapFromTokens({
  id: "modal",
  baseClass: "k-modal",
  tokens: modalTokens,
});
