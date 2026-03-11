import { buttonTokens } from "../../tokens/components";
import {
  defaultInteractiveStateSelectors,
  defineComponentStyleMap,
  mapSizes,
  mapVariantStates,
} from "../core";

type ButtonSize = keyof typeof buttonTokens.size;
type ButtonVariant = keyof typeof buttonTokens.styles;
type ButtonState = keyof (typeof buttonTokens.styles)["primary"];

export const buttonStyleMap = defineComponentStyleMap<ButtonSize, ButtonVariant, ButtonState>({
  id: "button",
  baseClass: "k-button",
  stateSelectors: defaultInteractiveStateSelectors,
  sizes: mapSizes(buttonTokens.size, (sizeTokens) => ({
    "--k-btn-min-height": sizeTokens.minHeight,
    "--k-btn-padding-x": sizeTokens.paddingX,
    "--k-btn-padding-y": sizeTokens.paddingY,
    "--k-btn-icon-size": sizeTokens.iconSize,
  })),
  variants: mapVariantStates(buttonTokens.styles, (stateTokens) => ({
    "--k-btn-bg": stateTokens.colors.bg,
    "--k-btn-text": stateTokens.colors.text,
    "--k-btn-border": stateTokens.colors.border,
    "--k-btn-icon": stateTokens.colors.icon,
    "--k-btn-focus-ring": stateTokens.focus.ringColor,
    "--k-btn-focus-outline": stateTokens.focus.outlineColor,
    "--k-btn-disabled-opacity": stateTokens.disabledOpacity ?? 1,
  })),
});
