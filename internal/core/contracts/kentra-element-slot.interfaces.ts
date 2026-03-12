import type { Signal } from "@angular/core";

/**
 * Named single-slot query contract (modeled via `contentChild(...)`).
 */
export type KentraContentChildSlots<TSlots extends Record<string, unknown>> = {
  readonly [K in keyof TSlots]: Signal<TSlots[K] | undefined>;
};

/**
 * Named multi-slot query contract (modeled via `contentChildren(...)`).
 */
export type KentraContentChildrenSlots<TSlots extends Record<string, unknown>> = {
  readonly [K in keyof TSlots]: Signal<readonly TSlots[K][]>;
};
