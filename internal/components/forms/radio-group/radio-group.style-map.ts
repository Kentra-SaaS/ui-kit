import { radioGroupTokens } from "./radio-group.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const radioGroupStyleMap = createComponentStyleMapFromTokens({
  id: "radio-group",
  baseClass: "k-radio-group",
  tokens: radioGroupTokens,
});
