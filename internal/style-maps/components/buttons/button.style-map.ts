import { buttonTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const buttonStyleMap = createComponentStyleMapFromTokens({
  id: "button",
  baseClass: "k-button",
  aliasPrefix: "btn",
  tokens: buttonTokens,
});
