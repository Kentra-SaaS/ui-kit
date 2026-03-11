import { progressTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const progressStyleMap = createComponentStyleMapFromTokens({
  id: "progress",
  baseClass: "k-progress",
  tokens: progressTokens,
});
