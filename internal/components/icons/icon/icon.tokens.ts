import { iconTokens } from "../../../core/tokens/contracts";

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
export type IconName = string;
