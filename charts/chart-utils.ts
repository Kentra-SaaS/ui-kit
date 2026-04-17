import type { ElementRef } from "@angular/core";

import type { KentraChartValueFormatter } from "./chart-models";

export type KentraChartSelectionChangeEvent = {
  readonly value: string;
  readonly previousValue: string | null;
  readonly userTriggered: boolean;
};

export const normalizeText = (value: string | null): string | null => {
  if (value === null) {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
};

export const normalizeDimension = (
  value: string | number | null,
): string | number | null => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? `${value}px` : null;
  }

  if (value === null) {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
};

export const normalizeSeriesId = (value: string, fallbackIndex: number): string => {
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : `series-${fallbackIndex + 1}`;
};

export const resolveCssVar = (
  host: ElementRef<HTMLElement>,
  variableName: `--${string}`,
  fallback: string,
): string => {
  if (typeof getComputedStyle !== "function") {
    return fallback;
  }

  const styles = getComputedStyle(host.nativeElement);
  const value = styles.getPropertyValue(variableName).trim();

  return resolveCssValue(styles, value, fallback, 0, new Set([variableName]));
};

export const resolveCssNumber = (
  host: ElementRef<HTMLElement>,
  variableName: `--${string}`,
  fallback: number,
): number => {
  const raw = resolveCssVar(host, variableName, `${fallback}`);
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const resolveCssBoolean = (
  host: ElementRef<HTMLElement>,
  variableName: `--${string}`,
  fallback: boolean,
): boolean => {
  const raw = resolveCssVar(host, variableName, fallback ? "true" : "false");
  if (raw === "true") {
    return true;
  }

  if (raw === "false") {
    return false;
  }

  return fallback;
};

export const formatChartValue = (
  formatter: KentraChartValueFormatter | null,
  value: number,
  context: {
    readonly label: string | null;
    readonly index: number;
    readonly seriesId: string | null;
  },
): string => {
  if (formatter === null) {
    return `${value}`;
  }

  return formatter(value, context);
};

export const buildSelectionChangeEvent = (
  value: string,
  previousValue: string | null,
  userTriggered: boolean,
): KentraChartSelectionChangeEvent => ({
  value,
  previousValue,
  userTriggered,
});

export const ensureFiniteNumber = (value: number | null | undefined): number | null => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return null;
  }

  return Number.isFinite(value) ? value : null;
};

const CSS_VAR_REFERENCE_PATTERN = /^var\(\s*(--[A-Za-z0-9-_]+)\s*(?:,\s*(.+))?\)$/;
const CSS_VAR_MAX_DEPTH = 24;

const resolveCssValue = (
  styles: CSSStyleDeclaration,
  value: string,
  fallback: string,
  depth: number,
  visited: Set<`--${string}`>,
): string => {
  const normalized = value.trim();
  if (normalized.length === 0) {
    return fallback;
  }

  if (depth >= CSS_VAR_MAX_DEPTH) {
    return fallback;
  }

  const referenceMatch = normalized.match(CSS_VAR_REFERENCE_PATTERN);
  if (referenceMatch === null) {
    return normalized;
  }

  const referenceName = referenceMatch[1] as `--${string}`;
  const inlineFallback = referenceMatch[2]?.trim() ?? "";
  const nextFallback = inlineFallback.length > 0 ? inlineFallback : fallback;

  if (visited.has(referenceName)) {
    return nextFallback;
  }

  const referenceValue = styles.getPropertyValue(referenceName).trim();
  if (referenceValue.length === 0) {
    return resolveCssValue(styles, nextFallback, fallback, depth + 1, visited);
  }

  visited.add(referenceName);
  const resolved = resolveCssValue(
    styles,
    referenceValue,
    nextFallback,
    depth + 1,
    visited,
  );
  visited.delete(referenceName);

  return resolved;
};
