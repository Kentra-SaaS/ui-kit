import { drawerTokens } from "./drawer.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const drawerStyleMap = createComponentStyleMapFromTokens({
  id: "drawer",
  baseClass: "k-drawer",
  tokens: drawerTokens,
});
