import { dropdownMenuTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const dropdownMenuStyleMap = createComponentStyleMapFromTokens({
  id: "dropdown-menu",
  baseClass: "k-dropdown-menu",
  tokens: dropdownMenuTokens,
});
