import { describe, expect, it } from "vitest";

import {
  KentraBreakpointService,
  kentraBreakpointOrder,
  kentraBreakpointToPx,
  kentraBreakpoints,
} from "../public-api";

describe("responsive foundation", () => {
  it("exports stable Kentra breakpoint constants", () => {
    expect(kentraBreakpoints).toEqual({
      xs: "0rem",
      sm: "30rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
    });
    expect(kentraBreakpointOrder).toEqual(["xs", "sm", "md", "lg", "xl", "2xl"]);
    expect(kentraBreakpointToPx("md")).toBe(768);
    expect(kentraBreakpointToPx("lg")).toBe(1024);
  });

  it("exports the Angular breakpoint service from the root entrypoint", () => {
    expect(typeof KentraBreakpointService).toBe("function");
  });
});
