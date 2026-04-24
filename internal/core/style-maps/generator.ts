import type { ComponentStyleMap, StyleValue, Vars } from "./types";

/** Header injected into generated stylesheet output. */
const GENERATED_HEADER = "/* auto-generated: do not edit */";

/** Converts `camelCase`/`PascalCase` to kebab-case. */
export const toKebabCase = (value: string): string =>
  value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/** Type guard for token objects exposing a `var` reference. */
export const isTokenRef = (value: StyleValue): value is Extract<StyleValue, { var: string }> =>
  typeof value === "object" && value !== null && "var" in value;

/** Resolves a style value into a CSS value string. */
export const toCssValue = (value: StyleValue): string =>
  isTokenRef(value) ? value.var : String(value);

/**
 * Applies a selector pattern to a base selector.
 * Replaces `&` with the base selector and supports comma-separated patterns.
 */
export const applySelectorPattern = (baseSelector: string, pattern: string): string =>
  pattern
    .split(",")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .map((segment) => segment.replace(/&/g, baseSelector))
    .join(", ");

/**
 * Resolves the CSS selector pattern for a state.
 * Uses explicit overrides first, then falls back to `.is-{state}`.
 */
export const resolveStatePattern = (
  styleMap: ComponentStyleMap,
  state: string,
): string => {
  if (state === "default") {
    return "&";
  }

  return styleMap.stateSelectors?.[state] ?? `&.is-${toKebabCase(state)}`;
};

/** Renders one CSS rule block from a selector and alias variable declarations. */
export const renderRule = (selector: string, vars: Vars): string => {
  const declarations = Object.entries(vars).map(
    ([name, value]) => `  ${name}: ${toCssValue(value)};`,
  );

  return `${selector} {\n${declarations.join("\n")}\n}\n`;
};

/**
 * Generates a full stylesheet from registered component style maps.
 * Output contains size classes and variant/state classes with alias variables.
 */
export const generateComponentCss = (styleMaps: readonly ComponentStyleMap[]): string => {
  const chunks: string[] = [GENERATED_HEADER, ""];

  for (const styleMap of styleMaps) {
    if (styleMap.base && Object.keys(styleMap.base).length > 0) {
      const selector = `.${styleMap.baseClass}`;
      chunks.push(renderRule(selector, styleMap.base), "");
    }

    for (const [size, vars] of Object.entries(styleMap.sizes)) {
      const selector = `.${styleMap.baseClass}--size-${toKebabCase(size)}`;
      chunks.push(renderRule(selector, vars), "");
    }

    for (const [variant, states] of Object.entries(styleMap.variants)) {
      const baseSelector = `.${styleMap.baseClass}--variant-${toKebabCase(variant)}`;

      for (const [state, vars] of Object.entries(states)) {
        const pattern = resolveStatePattern(styleMap, state);
        const selector = applySelectorPattern(baseSelector, pattern);
        chunks.push(renderRule(selector, vars), "");
      }
    }
  }

  return `${chunks.join("\n").trimEnd()}\n`;
};
