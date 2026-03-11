import { drawerTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const drawerStyleMap = createComponentStyleMapFromTokens({
  id: "drawer",
  baseClass: "k-drawer",
  tokens: drawerTokens,
});
