export const kentraBreakpoints = {
  xs: "0rem",
  sm: "30rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
} as const;

export type KentraBreakpoint = keyof typeof kentraBreakpoints;

export const kentraBreakpointOrder = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const satisfies readonly KentraBreakpoint[];

export type KentraViewportRange = "phone" | "tablet" | "desktop" | "wide";

export function kentraBreakpointToPx(breakpoint: KentraBreakpoint): number {
  const value = kentraBreakpoints[breakpoint];

  if (!value.endsWith("rem")) {
    return Number.parseFloat(value);
  }

  return Number.parseFloat(value) * 16;
}
