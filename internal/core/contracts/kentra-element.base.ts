import { Directive, computed } from "@angular/core";
import { toKebabCase } from "../style-maps/generator";

type StyleValues = Readonly<Record<string, string | number | null | undefined>>;
type StateValues = Readonly<Record<string, boolean | null | undefined>>;
type CssVariableName = `--${string}`;
type CssVars = Readonly<
  Record<CssVariableName, string | number | null | undefined>
>;

/**
 * Generic component base that composes BEM-like modifier/state classes.
 * Concrete components can expose any style inputs via small interfaces
 * and return current values through `styleValues()` and `stateValues()`.
 */
@Directive()
export abstract class KentraElementBase {
  protected abstract readonly baseClass: `k-${string}`;

  protected readonly classes = computed(() =>
    [
      this.baseClass,
      ...this.buildModifierClasses(this.styleValues()),
      ...this.buildStateClasses(this.stateValues()),
      ...this.extraClasses(),
    ]
      .filter(Boolean)
      .join(" "),
  );
  protected readonly hostClasses = this.classes;
  protected readonly hostStyles = computed(() =>
    this.buildInlineStyleDeclarations(this.cssVars()),
  );

  /**
   * Maps style dimensions to class modifiers:
   * `{ variant: "primary" }` -> `k-x--variant-primary`
   */
  protected styleValues(): StyleValues {
    return {};
  }

  /**
   * Maps boolean component states to state classes:
   * `{ disabled: true }` -> `is-disabled`
   */
  protected stateValues(): StateValues {
    return {};
  }

  /**
   * Maps dynamic host-level css variables:
   * `{ "--k-stack-align": "var(--k-stack-align-center)" }`.
   */
  protected cssVars(): CssVars {
    return {};
  }

  /**
   * Extension hook for ad-hoc classes that don't fit modifier/state mapping.
   */
  protected extraClasses(): readonly string[] {
    return [];
  }

  private buildModifierClasses(styleValues: StyleValues): string[] {
    const classes: string[] = [];

    for (const [name, value] of Object.entries(styleValues)) {
      if (typeof value !== "string" || value.length === 0) {
        continue;
      }

      classes.push(
        `${this.baseClass}--${toKebabCase(name)}-${toKebabCase(value)}`,
      );
    }

    return classes;
  }

  private buildStateClasses(stateValues: StateValues): string[] {
    const classes: string[] = [];

    for (const [name, enabled] of Object.entries(stateValues)) {
      if (!enabled) {
        continue;
      }

      classes.push(`is-${toKebabCase(name)}`);
    }

    return classes;
  }

  private buildInlineStyleDeclarations(cssVars: CssVars): string | null {
    const declarations: string[] = [];

    for (const [name, value] of Object.entries(cssVars)) {
      if (!name.startsWith("--") || value === null || value === undefined) {
        continue;
      }

      const serializedValue = String(value).trim();
      if (serializedValue.length === 0) {
        continue;
      }

      declarations.push(`${name}: ${serializedValue};`);
    }

    return declarations.length > 0 ? declarations.join(" ") : null;
  }
}
