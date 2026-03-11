import type { ComponentStyleMap, CssAlias, StyleValue, Vars } from "./types";

/**
 * Union of all concrete state value shapes inside a variant->state object tree.
 */
type VariantStateValue<TVariants extends Record<string, Record<string, unknown>>> = {
  [V in keyof TVariants]: TVariants[V][keyof TVariants[V]];
}[keyof TVariants];

type TokenTree = Record<string, unknown>;

/**
 * Options for building a component style map from a token object.
 */
export interface CreateComponentStyleMapFromTokensOptions {
  /** Stable component identifier (e.g. `button`). */
  readonly id: string;
  /** Base class used for generated selectors (e.g. `k-button`). */
  readonly baseClass: `k-${string}`;
  /** Raw token object to infer size/variant/state mappings from. */
  readonly tokens: TokenTree;
  /** Alias variable prefix. Defaults to `id`. */
  readonly aliasPrefix?: string;
  /** Optional explicit size source override. */
  readonly sizeSource?: TokenTree;
  /** Optional explicit variant source override. */
  readonly variantSource?: TokenTree;
  /** Optional shared token source merged into all generated rules. */
  readonly sharedSource?: TokenTree;
  /** Fallback size key if no size source exists. */
  readonly defaultSize?: string;
  /** Fallback variant key if no variant source exists. */
  readonly defaultVariant?: string;
  /** Optional selector overrides per state. */
  readonly stateSelectors?: Partial<Record<string, string>>;
}

const RESERVED_TOP_LEVEL_KEYS = new Set(["size", "styles", "variants"]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isTokenRef = (value: unknown): value is Extract<StyleValue, { css: string; var: string }> =>
  isRecord(value) && typeof value.css === "string" && typeof value.var === "string";

const isStyleValue = (value: unknown): value is StyleValue =>
  typeof value === "string" || typeof value === "number" || isTokenRef(value);

const toAliasPart = (value: string): string =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const buildAlias = (prefix: string, path: readonly string[]): CssAlias =>
  `--k-${[prefix, ...path].map(toAliasPart).filter(Boolean).join("-")}` as CssAlias;

const collectFlattenedVars = (
  source: unknown,
  aliasPrefix: string,
  path: readonly string[],
  target: Record<string, StyleValue>,
): void => {
  if (isStyleValue(source)) {
    target[buildAlias(aliasPrefix, path)] = source;
    return;
  }

  if (!isRecord(source)) {
    return;
  }

  for (const [key, value] of Object.entries(source)) {
    collectFlattenedVars(value, aliasPrefix, [...path, key], target);
  }
};

/**
 * Flattens nested token objects to alias variables.
 * Example: `colors.bg` -> `--k-{prefix}-colors-bg`.
 */
export const flattenTokenVars = (source: unknown, aliasPrefix: string): Vars => {
  const vars = {} as Record<string, StyleValue>;
  collectFlattenedVars(source, aliasPrefix, [], vars);
  return vars as Vars;
};

const inferSizeSource = (tokens: TokenTree): TokenTree | undefined => {
  const sizeSource = tokens.size;
  return isRecord(sizeSource) ? sizeSource : undefined;
};

const inferVariantSource = (tokens: TokenTree): TokenTree | undefined => {
  const styleSource = tokens.styles;
  if (isRecord(styleSource)) {
    return styleSource;
  }

  const variantSource = tokens.variants;
  return isRecord(variantSource) ? variantSource : undefined;
};

const inferSharedSource = (tokens: TokenTree): TokenTree => {
  const shared: TokenTree = {};

  for (const [key, value] of Object.entries(tokens)) {
    if (RESERVED_TOP_LEVEL_KEYS.has(key)) {
      continue;
    }

    shared[key] = value;
  }

  return shared;
};

const looksLikeStateMap = (source: Record<string, unknown>): boolean => {
  const entries = Object.entries(source);
  if (entries.length === 0) {
    return false;
  }

  const allNestedObjects = entries.every(
    ([, value]) => isRecord(value) && !isTokenRef(value),
  );

  if (!allNestedObjects) {
    return false;
  }

  const hasDefaultState = entries.some(([key]) => key === "default");
  if (hasDefaultState) {
    return true;
  }

  return entries.length > 1;
};

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

/**
 * Builds a component style map by inferring structure from a component token object.
 * This keeps component map files minimal while preserving token-typed values.
 */
export const createComponentStyleMapFromTokens = (
  options: CreateComponentStyleMapFromTokensOptions,
): ComponentStyleMap<string, string, string> => {
  const aliasPrefix = options.aliasPrefix ?? options.id;
  const sharedSource = options.sharedSource ?? inferSharedSource(options.tokens);
  const sharedVars = flattenTokenVars(sharedSource, aliasPrefix);

  const sizeSource = options.sizeSource ?? inferSizeSource(options.tokens);
  const sizes: Record<string, Vars> = {};

  if (sizeSource && Object.keys(sizeSource).length > 0) {
    for (const [size, sizeTokens] of Object.entries(sizeSource)) {
      sizes[size] = {
        ...sharedVars,
        ...flattenTokenVars(sizeTokens, aliasPrefix),
      };
    }
  } else {
    sizes[options.defaultSize ?? "md"] = sharedVars;
  }

  const variantSource = options.variantSource ?? inferVariantSource(options.tokens);
  const variants: Record<string, Record<string, Vars>> = {};

  if (variantSource && Object.keys(variantSource).length > 0) {
    for (const [variant, variantTokens] of Object.entries(variantSource)) {
      if (isRecord(variantTokens) && looksLikeStateMap(variantTokens)) {
        const states: Record<string, Vars> = {};

        for (const [state, stateTokens] of Object.entries(variantTokens)) {
          states[state] = {
            ...sharedVars,
            ...flattenTokenVars(stateTokens, aliasPrefix),
          };
        }

        variants[variant] = states;
        continue;
      }

      variants[variant] = {
        default: {
          ...sharedVars,
          ...flattenTokenVars(variantTokens, aliasPrefix),
        },
      };
    }
  } else {
    variants[options.defaultVariant ?? "default"] = {
      default: sharedVars,
    };
  }

  return defineComponentStyleMap<string, string, string>({
    id: options.id,
    baseClass: options.baseClass,
    sizes,
    variants,
    stateSelectors: options.stateSelectors ?? defaultInteractiveStateSelectors,
  });
};
