import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { tokens } from "../internal/tokens";
import { collectDeclaredCssVariables, collectTokens } from "./token-test-utils";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");
const stylesDirectory = resolve(projectRoot, "styles");

describe("token to css variable mapping", () => {
  it("maps every token to a declared css variable", () => {
    const tokenVariables = new Set(collectTokens(tokens).map((token) => token.css));
    const declaredVariables = collectDeclaredCssVariables(stylesDirectory);

    const missingDeclarations = [...tokenVariables].filter(
      (tokenName) => !declaredVariables.has(tokenName),
    );

    expect(missingDeclarations).toEqual([]);
  });

  it("has a token mapping for every declared design-token variable", () => {
    const tokenVariables = new Set(collectTokens(tokens).map((token) => token.css));
    const declaredVariables = collectDeclaredCssVariables(stylesDirectory);

    const unmappedDeclarations = [...declaredVariables].filter(
      (tokenName) => !tokenVariables.has(tokenName),
    );

    expect(unmappedDeclarations).toEqual([]);
  });
});
