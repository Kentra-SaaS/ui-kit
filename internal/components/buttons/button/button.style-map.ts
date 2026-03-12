import { buttonTokens } from "./button.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const buttonStyleMap = createComponentStyleMapFromTokens({
  id: "button",
  baseClass: "k-button",
  aliasPrefix: "btn",
  tokens: buttonTokens,
});
