import {
  appBackgroundTokens,
  baseStyleTokens,
  colorPaletteTokens,
  iconTokens,
  interactionStateTokens,
  themeColorTokens,
  themeElevationTokens,
  typographyTokens,
  type AppBackgroundTokensContract,
  type BaseStyleTokensContract,
  type ColorPaletteTokensContract,
  type IconTokensContract,
  type InteractionStateTokensContract,
  type ThemeColorTokensContract,
  type ThemeElevationTokensContract,
  type TypographyTokensContract,
} from "./contracts";

export interface GlobalTokensContract {
  readonly baseStyle: BaseStyleTokensContract;
  readonly typography: TypographyTokensContract;
  readonly icon: IconTokensContract;
  readonly palette: ColorPaletteTokensContract;
}

export interface ThemeTokensContract {
  readonly colors: ThemeColorTokensContract;
  readonly interactionState: InteractionStateTokensContract;
  readonly elevation: ThemeElevationTokensContract;
  readonly appBackground: AppBackgroundTokensContract;
}

export const globalTokens = {
  baseStyle: baseStyleTokens,
  typography: typographyTokens,
  icon: iconTokens,
  palette: colorPaletteTokens,
} as const satisfies GlobalTokensContract;

export const themeTokens = {
  colors: themeColorTokens,
  interactionState: interactionStateTokens,
  elevation: themeElevationTokens,
  appBackground: appBackgroundTokens,
} as const satisfies ThemeTokensContract;

export const tokens = {
  global: globalTokens,
  theme: themeTokens,
} as const;

export type TokensContract = typeof tokens;
