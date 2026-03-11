import { radioGroupTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const radioGroupStyleMap = createComponentStyleMapFromTokens({
  id: "radio-group",
  baseClass: "k-radio-group",
  tokens: radioGroupTokens,
});
