import { iconButtonTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const iconButtonStyleMap = createComponentStyleMapFromTokens({
  id: "icon-button",
  baseClass: "k-icon-button",
  tokens: iconButtonTokens,
});
