import { iconTokens } from "../../../core/tokens/contracts";
import type { IconName as GeneratedIconName } from "../icon-names.generated";

export const iconComponentTokens = {
  size: iconTokens.size,
  weight: {
    regular: "regular",
    thin: "thin",
    light: "light",
    bold: "bold",
    fill: "fill",
    duotone: "duotone",
  },
} as const;

export type IconComponentTokensContract = typeof iconComponentTokens;
export type IconSize = keyof IconComponentTokensContract["size"];
export type IconWeight = keyof IconComponentTokensContract["weight"];
export type IconName = GeneratedIconName | "";
