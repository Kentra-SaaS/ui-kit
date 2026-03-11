import { switchTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const switchStyleMap = createComponentStyleMapFromTokens({
  id: "switch",
  baseClass: "k-switch",
  tokens: switchTokens,
});
