import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  FieldVariant,
  fieldStyleMap,
  KentraElementBase,
  KentraFieldContract,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-field",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <div class="row">
      <label
        class="label"
        [attr.for]="resolvedForId()"
        [attr.hidden]="hasLabel() ? null : ''"
      >
        {{ label() }}
        <span class="required" [attr.hidden]="required() ? null : ''">*</span>
      </label>

      <div class="control">
        <ng-content></ng-content>
      </div>
    </div>

    <p
      class="hint"
      [attr.id]="showHint() ? resolvedHintId() : null"
      [attr.hidden]="showHint() ? null : ''"
    >
      {{ hint() }}
    </p>

    <p
      class="error"
      [attr.id]="showErrorText() ? resolvedErrorId() : null"
      [attr.hidden]="showErrorText() ? null : ''"
    >
      {{ errorText() }}
    </p>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
    }

    .row {
      display: grid;
      gap: var(--k-field-spacing-label-to-control, var(--k-space-2));
    }

    .label {
      margin: 0;
      font-family: var(--k-field-label-family, inherit);
      font-size: var(--k-field-label-size, inherit);
      line-height: var(--k-field-label-line-height, inherit);
      font-weight: var(--k-field-label-weight, 600);
      color: var(--k-field-colors-label, currentColor);
    }

    .required {
      color: var(--k-field-colors-required, currentColor);
    }

    .control {
      min-inline-size: 0;
    }

    .hint, .error {
      margin: 0;
      font-family: var(--k-field-hint-family, inherit);
      font-size: var(--k-field-hint-size, inherit);
      line-height: var(--k-field-hint-line-height, inherit);
      font-weight: var(--k-field-hint-weight, 400);
    }

    .hint {
      margin-top: var(--k-field-spacing-control-to-hint, var(--k-space-2));
      color: var(--k-field-colors-hint, currentColor);
    }

    .error {
      margin-top: var(--k-field-spacing-hint-to-error, var(--k-space-1));
      color: var(--k-field-colors-error, currentColor);
    }

    :host(.k-field--variant-inline-label) .row {
      grid-template-columns: minmax(
          0,
          var(--k-field-layout-label-min-width, max-content)
        )
        minmax(0, 1fr);
      align-items: var(--k-field-layout-align, center);
      column-gap: var(--k-field-layout-gap, var(--k-space-4));
      row-gap: var(--k-field-spacing-label-to-control, var(--k-space-2));
    }

    @media (max-width: 64rem) {
      :host(.k-field--variant-inline-label) .row {
        column-gap: max(var(--k-field-layout-gap, var(--k-space-4)), var(--k-space-3));
      }
    }

    @media (max-width: 48rem) {
      :host(.k-field--variant-inline-label) .row {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class KentraField extends KentraElementBase implements KentraFieldContract {
  readonly variant = input<FieldVariant>("default");
  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly forId = input<string | null>(null);
  readonly hintId = input<string | null>(null);
  readonly errorId = input<string | null>(null);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly invalid = input<boolean>(false);

  readonly hasLabel = computed(() => this.hasNonEmptyText(this.label()));
  readonly showHint = computed(
    () => this.hasNonEmptyText(this.hint()) && !this.hasError(),
  );
  readonly showErrorText = computed(
    () => this.hasNonEmptyText(this.errorText()) && this.hasError(),
  );
  readonly resolvedForId = computed(() => this.normalizeText(this.forId()));
  readonly resolvedHintId = computed(
    () => this.normalizeText(this.hintId()) ?? this.generatedHintId,
  );
  readonly resolvedErrorId = computed(
    () => this.normalizeText(this.errorId()) ?? this.generatedErrorId,
  );
  readonly describedBy = computed(() =>
    [
      this.showHint() ? this.resolvedHintId() : null,
      this.showErrorText() ? this.resolvedErrorId() : null,
    ].filter((id): id is string => id !== null).join(" ") || null,
  );
  readonly hasError = computed(
    () => this.invalid() || this.hasNonEmptyText(this.errorText()),
  );

  protected readonly baseClass = fieldStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    return {
      required: this.required(),
      error: this.hasError(),
      disabled: this.disabled(),
    };
  }

  private readonly generatedId = `k-field-${++fieldInstanceCounter}`;
  private readonly generatedHintId = `${this.generatedId}-hint`;
  private readonly generatedErrorId = `${this.generatedId}-error`;

  private hasNonEmptyText(value: string | null): boolean {
    return this.normalizeText(value) !== null;
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}

let fieldInstanceCounter = 0;
