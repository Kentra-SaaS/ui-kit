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
