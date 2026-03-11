import type { TokensContract } from "../../tokens/core";

/**
 * Recursively extracts every token leaf from a nested token contract.
 * A token leaf is expected to expose `css` and `var`.
 */
type TokenLeaf<T> = T extends { css: `--k-${string}`; var: `var(--k-${string})` }
  ? T
  : T extends readonly unknown[]
    ? TokenLeaf<T[number]>
    : T extends Record<string, unknown>
      ? TokenLeaf<T[keyof T]>
      : never;

/**
 * A strongly typed reference to any token defined in the global token bundle.
 */
export type TokenRef = TokenLeaf<TokensContract>;

/**
 * Allowed CSS custom property name for component-level alias variables.
 */
export type CssAlias = `--k-${string}`;

/**
 * Value type accepted in component style maps.
 * Can be either a token reference or a literal CSS value.
 */
export type StyleValue = TokenRef | string | number;

/**
 * Alias variable map emitted by the style-map generator.
 */
export type Vars = Record<CssAlias, StyleValue>;

/**
 * Component style contract used to generate CSS classes for size/variant/state.
 */
export interface ComponentStyleMap<
  TSize extends string = string,
  TVariant extends string = string,
  TState extends string = string,
> {
  /** Stable component identifier (e.g. `button`). */
  readonly id: string;
  /** Base class name used for generated selectors (e.g. `k-button`). */
  readonly baseClass: `k-${string}`;
  /** Base alias variables rendered directly on `.k-x`. */
  readonly base?: Vars;
  /** Size-to-variable mapping (`.k-x--size-*`). */
  readonly sizes: Record<TSize, Vars>;
  /** Variant + state mapping (`.k-x--variant-*` + state selector). */
  readonly variants: Record<TVariant, Record<TState, Vars>>;
  /** Optional per-state selector overrides. Falls back to `.is-{state}`. */
  readonly stateSelectors?: Partial<Record<TState, string>>;
}
