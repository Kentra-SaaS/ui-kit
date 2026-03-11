import type { ComponentStyleMap, Vars } from "./types";

/**
 * Union of all concrete state value shapes inside a variant->state object tree.
 */
type VariantStateValue<TVariants extends Record<string, Record<string, unknown>>> = {
  [V in keyof TVariants]: TVariants[V][keyof TVariants[V]];
}[keyof TVariants];

/**
 * Identity helper to preserve generic inference and enforce the style-map contract.
 */
export const defineComponentStyleMap = <
  TSize extends string,
  TVariant extends string,
  TState extends string,
>(
  map: ComponentStyleMap<TSize, TVariant, TState>,
): ComponentStyleMap<TSize, TVariant, TState> => map;

/**
 * Default selectors for common interactive states.
 * Components can reuse this and override specific states if needed.
 */
export const defaultInteractiveStateSelectors = {
  default: "&",
  hover: "&:hover",
  active: "&:active",
  focusVisible: "&:focus-visible",
  disabled: "&.is-disabled, &:disabled",
  loading: "&.is-loading",
} as const;

/**
 * Maps raw size tokens to alias variable objects while preserving size keys.
 */
export const mapSizes = <TSizes extends Record<string, unknown>>(
  source: TSizes,
  pick: <K extends keyof TSizes>(value: TSizes[K], key: K) => Vars,
): { [K in keyof TSizes]: Vars } => {
  const mapped = {} as { [K in keyof TSizes]: Vars };

  for (const key of Object.keys(source) as Array<keyof TSizes>) {
    mapped[key] = pick(source[key], key);
  }

  return mapped;
};

/**
 * Maps variant->state token trees to alias variable objects while preserving keys.
 */
export const mapVariantStates = <
  TVariants extends Record<string, Record<string, unknown>>,
>(
  source: TVariants,
  pick: (
    value: VariantStateValue<TVariants>,
    variant: keyof TVariants,
    state: string,
  ) => Vars,
): {
  [V in keyof TVariants]: {
    [S in keyof TVariants[V]]: Vars;
  };
} => {
  const mapped = {} as {
    [V in keyof TVariants]: {
      [S in keyof TVariants[V]]: Vars;
    };
  };

  for (const variant of Object.keys(source) as Array<keyof TVariants>) {
    const states = source[variant];
    const mappedStates = {} as { [S in keyof TVariants[typeof variant]]: Vars };

    for (const state of Object.keys(states) as Array<keyof TVariants[typeof variant]>) {
      mappedStates[state] = pick(
        states[state] as VariantStateValue<TVariants>,
        variant,
        String(state),
      );
    }

    mapped[variant] = mappedStates;
  }

  return mapped;
};
