import { iconButtonTokens } from "./icon-button.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const iconButtonStyleMap = createComponentStyleMapFromTokens({
  id: "icon-button",
  baseClass: "k-icon-button",
  tokens: iconButtonTokens,
});
