import type { InputSignal } from "@angular/core";

/**
 * Style input contract for variant-based components.
 */
export interface KentraVariantInput<Variant extends string> {
  readonly variant: InputSignal<Variant>;
}

/**
 * Style input contract for size-based components.
 */
export interface KentraSizeInput<Size extends string> {
  readonly size: InputSignal<Size>;
}

/**
 * Style input contract for severity-based components.
 */
export interface KentraSeverityInput<Severity extends string> {
  readonly severity: InputSignal<Severity>;
}

/**
 * Style input contract for color-based components.
 */
export interface KentraColorInput<Color extends string> {
  readonly color: InputSignal<Color>;
}

/**
 * Style input contract for orientation-based components.
 */
export interface KentraOrientationInput<Orientation extends string> {
  readonly orientation: InputSignal<Orientation>;
}

/**
 * Style input contract for state-based components.
 */
export interface KentraStateInput<State extends string> {
  readonly state: InputSignal<State>;
}

/**
 * Style input contract for gap-based components.
 */
export interface KentraGapInput<Gap extends string> {
  readonly gap: InputSignal<Gap>;
}

/**
 * Style input contract for align-based components.
 */
export interface KentraAlignInput<Align extends string> {
  readonly align: InputSignal<Align>;
}

/**
 * Generic input contract for named values.
 */
export interface KentraNameInput<Name extends string = string> {
  readonly name: InputSignal<Name>;
}

/**
 * Generic input contract for weight-based values.
 */
export interface KentraWeightInput<Weight extends string> {
  readonly weight: InputSignal<Weight>;
}
