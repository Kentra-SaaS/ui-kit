import { describe, expect, it } from "vitest";

import { tokens } from "../internal/tokens";
import { collectTokens } from "./token-test-utils";

describe("tokens contract", () => {
  it("contains valid css and var references", () => {
    const tokenList = collectTokens(tokens);
    expect(tokenList.length).toBeGreaterThan(0);

    for (const token of tokenList) {
      expect(token.css).toMatch(/^--k-[a-z0-9-]+$/);
      expect(token.var).toBe(`var(${token.css})`);
    }
  });

  it("does not reuse css token names", () => {
    const tokenNames = collectTokens(tokens).map((token) => token.css);
    const uniqueTokenNames = new Set(tokenNames);

    expect(uniqueTokenNames.size).toBe(tokenNames.length);
  });
});
