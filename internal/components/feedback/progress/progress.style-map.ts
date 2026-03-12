import { progressTokens } from "./progress.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const progressStyleMap = createComponentStyleMapFromTokens({
  id: "progress",
  baseClass: "k-progress",
  tokens: progressTokens,
});
