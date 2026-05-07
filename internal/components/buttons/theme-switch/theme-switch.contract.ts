import type { InputSignal, ModelSignal, OutputEmitterRef } from "@angular/core";
import type {
  ThemeSwitchSize,
  ThemeSwitchTheme,
  ThemeSwitchVariant,
} from "./theme-switch.tokens";
import type {
  KentraSizeInput,
  KentraVariantInput,
} from "../../../core/contracts";

export type ThemeChangeEvent = {
  readonly theme: ThemeSwitchTheme;
  readonly previousTheme: ThemeSwitchTheme;
  readonly userTriggered: boolean;
};

interface KentraThemeSwitchInputs
  extends KentraVariantInput<ThemeSwitchVariant>,
    KentraSizeInput<ThemeSwitchSize> {
  readonly theme: ModelSignal<ThemeSwitchTheme>;
  readonly disabled: InputSignal<boolean>;
  readonly ariaLabel: InputSignal<string | null>;
}

interface KentraThemeSwitchOutputs {
  readonly themeChanged: OutputEmitterRef<ThemeChangeEvent>;
}

interface KentraThemeSwitchSlots {}

export interface KentraThemeSwitchContract
  extends KentraThemeSwitchInputs,
    KentraThemeSwitchOutputs,
    KentraThemeSwitchSlots {}
