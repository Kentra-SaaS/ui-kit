import { sideNavTokens } from "./side-nav.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const sideNavStyleMap = createComponentStyleMapFromTokens({
  id: "side-nav",
  baseClass: "k-side-nav",
  tokens: sideNavTokens,
});
