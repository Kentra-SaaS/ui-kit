import { sideNavTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const sideNavStyleMap = createComponentStyleMapFromTokens({
  id: "side-nav",
  baseClass: "k-side-nav",
  tokens: sideNavTokens,
});
