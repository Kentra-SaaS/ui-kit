import { linkTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const linkStyleMap = createComponentStyleMapFromTokens({
  id: "link",
  baseClass: "k-link",
  tokens: linkTokens,
});
