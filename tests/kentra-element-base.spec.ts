import { describe, expect, it } from "vitest";

import { KentraElementBase } from "../internal";

class BaseClassFixture extends KentraElementBase {
  protected readonly baseClass = "k-fixture";

  constructor(
    private readonly config: {
      readonly styles?: Record<string, string | number | null | undefined>;
      readonly states?: Record<string, boolean | null | undefined>;
      readonly cssVars?: Record<`--${string}`, string | number | null | undefined>;
    } = {},
  ) {
    super();
  }

  readClasses(): string {
    return this.hostClasses();
  }

  readHostStyles(): string | null {
    return this.hostStyles();
  }

  protected override styleValues() {
    return this.config.styles ?? {};
  }

  protected override stateValues() {
    return this.config.states ?? {};
  }

  protected override cssVars() {
    return this.config.cssVars ?? {};
  }
}

describe("KentraElementBase", () => {
  it("maps style values to modifier classes", () => {
    const fixture = new BaseClassFixture({
      styles: {
        size: "md",
        variant: "autoFit",
      },
    });

    const classes = fixture.readClasses();
    expect(classes).toContain("k-fixture");
    expect(classes).toContain("k-fixture--size-md");
    expect(classes).toContain("k-fixture--variant-auto-fit");
  });

  it("maps enabled states to is-* classes", () => {
    const fixture = new BaseClassFixture({
      states: {
        focusVisible: true,
        disabled: false,
      },
    });

    const classes = fixture.readClasses();
    expect(classes).toContain("is-focus-visible");
    expect(classes).not.toContain("is-disabled");
  });

  it("serializes css vars and filters nullish/empty values", () => {
    const fixture = new BaseClassFixture({
      cssVars: {
        "--k-fixture-gap": "var(--k-space-4)",
        "--k-fixture-order": 2,
        "--k-fixture-empty": " ",
        "--k-fixture-null": null,
        "--k-fixture-undefined": undefined,
      },
    });

    const hostStyles = fixture.readHostStyles();
    expect(hostStyles).toContain("--k-fixture-gap: var(--k-space-4);");
    expect(hostStyles).toContain("--k-fixture-order: 2;");
    expect(hostStyles).not.toContain("--k-fixture-empty");
    expect(hostStyles).not.toContain("--k-fixture-null");
    expect(hostStyles).not.toContain("--k-fixture-undefined");
  });

  it("returns null when no css vars are set", () => {
    const fixture = new BaseClassFixture();
    expect(fixture.readHostStyles()).toBeNull();
  });
});
