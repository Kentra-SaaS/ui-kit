import { dropdownMenuTokens } from "./dropdown-menu.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const dropdownMenuStyleMap = createComponentStyleMapFromTokens({
  id: "dropdown-menu",
  baseClass: "k-dropdown-menu",
  tokens: dropdownMenuTokens,
});
