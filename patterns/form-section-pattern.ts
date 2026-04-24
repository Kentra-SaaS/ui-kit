import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

import { KentraAlert } from "../feedback/alert";
import {
  FormSectionPatternState,
  FormSectionPatternVariant,
  formSectionPatternStyleMap,
  KentraElementBase,
  KentraFormSectionPatternContract,
} from "../internal";

let formSectionPatternCounter = 0;

@Component({
  selector: "k-form-section-pattern",
  standalone: true,
  imports: [KentraAlert],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "effectiveState() === 'disabled' ? 'true' : null",
  },
  template: `
    <section
      class="container"
      role="region"
      [attr.aria-label]="resolvedAriaLabel()"
      [attr.aria-labelledby]="resolvedAriaLabelledBy()"
    >
      <header class="header">
        <div class="headings">
          @if (resolvedTitle(); as titleText) {
            <h3 class="title" [id]="titleId">{{ titleText }}</h3>
          }
          <ng-content select="[kFormSectionTitle]"></ng-content>

          @if (resolvedDescription(); as descriptionText) {
            <p class="description">{{ descriptionText }}</p>
          }
          <ng-content select="[kFormSectionDescription]"></ng-content>
        </div>

        <div class="header-actions">
          <ng-content select="[kFormSectionHeaderActions]"></ng-content>
        </div>
      </header>

      @if (hasAlert()) {
        <k-alert
          class="alert"
          [variant]="alertVariant()"
          [title]="resolvedAlertTitle()"
          [message]="resolvedAlertMessage()"
        ></k-alert>
      }

      <div class="body">
        <div class="fields">
          <ng-content select="[kFormSectionFields]"></ng-content>
          <ng-content></ng-content>
        </div>

        <aside class="aside" [attr.hidden]="showAside() ? null : ''">
          <ng-content select="[kFormSectionAside]"></ng-content>
        </aside>
      </div>

      <footer class="footer">
        <ng-content select="[kFormSectionFooter]"></ng-content>
      </footer>
    </section>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
      max-inline-size: 100%;
    }

    .container {
      box-sizing: border-box;
      display: grid;
      gap: var(--k-form-section-pattern-spacing-section-gap, var(--k-space-4));
      inline-size: 100%;
      padding-inline: var(--k-form-section-pattern-container-padding-x, var(--k-space-5));
      padding-block: var(--k-form-section-pattern-container-padding-y, var(--k-space-4));
      border: var(--k-form-section-pattern-container-border-width, 1px) solid
        var(--k-form-section-pattern-colors-border, transparent);
      border-radius: var(--k-form-section-pattern-container-border-radius, var(--k-radius-lg));
      background: var(--k-form-section-pattern-colors-bg, transparent);
      transition:
        border-color var(--k-motion-duration-fast, 0s) var(--k-motion-ease-standard, linear),
        background var(--k-motion-duration-fast, 0s) var(--k-motion-ease-standard, linear),
        color var(--k-motion-duration-fast, 0s) var(--k-motion-ease-standard, linear);
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--k-form-section-pattern-spacing-header-gap, var(--k-space-2));
      min-inline-size: 0;
    }

    .headings {
      display: grid;
      gap: var(--k-space-1);
      min-inline-size: 0;
    }

    .title,
    .description {
      margin: 0;
    }

    .title {
      color: var(--k-form-section-pattern-colors-title, currentColor);
      font-family: var(--k-form-section-pattern-typography-title-family, inherit);
      font-size: var(--k-form-section-pattern-typography-title-size, 1.25rem);
      line-height: var(--k-form-section-pattern-typography-title-line-height, 1.3);
      font-weight: var(--k-form-section-pattern-typography-title-weight, 700);
      text-wrap: balance;
    }

    .description {
      color: var(--k-form-section-pattern-colors-description, currentColor);
      font-family: var(--k-form-section-pattern-typography-description-family, inherit);
      font-size: var(--k-form-section-pattern-typography-description-size, 1rem);
      line-height: var(--k-form-section-pattern-typography-description-line-height, 1.5);
      font-weight: var(--k-form-section-pattern-typography-description-weight, 400);
      text-wrap: pretty;
    }

    .header-actions {
      display: inline-flex;
      align-items: center;
      gap: var(--k-space-2);
      flex: none;
    }

    .alert {
      inline-size: 100%;
    }

    .body {
      display: grid;
      grid-template-columns: var(--k-form-section-pattern-layout-body-template, minmax(0, 1fr));
      gap: var(--k-form-section-pattern-spacing-section-gap, var(--k-space-4));
      min-inline-size: 0;
    }

    .fields {
      display: grid;
      grid-template-columns: var(--k-form-section-pattern-layout-fields-template, minmax(0, 1fr));
      gap: var(--k-form-section-pattern-spacing-fields-gap, var(--k-space-3));
      min-inline-size: 0;
    }

    .aside {
      inline-size: 100%;
      max-inline-size: var(--k-form-section-pattern-layout-aside-width, 18rem);
      color: var(--k-form-section-pattern-colors-description, currentColor);
    }

    .footer {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: var(--k-form-section-pattern-spacing-footer-gap, var(--k-space-3));
    }

    :host(.is-disabled) .container,
    :host([aria-disabled="true"]) .container {
      pointer-events: none;
      opacity: var(--k-state-disabled-opacity, 0.56);
    }

    @media (max-width: 64rem) {
      .container {
        padding-inline: max(var(--k-form-section-pattern-container-padding-x, var(--k-space-5)), var(--k-space-4));
      }
    }

    @media (max-width: 48rem) {
      .container {
        padding-inline: max(var(--k-form-section-pattern-container-padding-x, var(--k-space-5)), var(--k-space-3));
      }

      .header {
        flex-direction: column;
      }

      .body,
      .fields {
        grid-template-columns: minmax(0, 1fr);
      }

      .aside {
        max-inline-size: none;
      }
    }
  `,
})
export class KentraFormSectionPattern
  extends KentraElementBase
  implements KentraFormSectionPatternContract
{
  readonly variant = input<FormSectionPatternVariant>("default");
  readonly state = input<FormSectionPatternState>("default");
  readonly title = input<string | null>(null);
  readonly description = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly alertTitle = input<string | null>(null);
  readonly alertMessage = input<string | null>(null);
  readonly alertVariant = input<"info" | "success" | "warning" | "danger">("warning");
  readonly disabled = input<boolean>(false);

  readonly titleSlot = computed(() => undefined);
  readonly descriptionSlot = computed(() => undefined);
  readonly fields = computed(() => undefined);
  readonly footer = computed(() => undefined);
  readonly aside = computed(() => undefined);
  readonly headerActions = computed(() => undefined);

  readonly resolvedTitle = computed(() => this.normalizeText(this.title()));
  readonly resolvedDescription = computed(() => this.normalizeText(this.description()));
  readonly resolvedAriaLabel = computed(() => this.normalizeText(this.ariaLabel()));
  readonly resolvedAlertTitle = computed(() => this.normalizeText(this.alertTitle()));
  readonly resolvedAlertMessage = computed(() => this.normalizeText(this.alertMessage()));

  readonly resolvedAriaLabelledBy = computed(() =>
    this.resolvedAriaLabel() === null && this.resolvedTitle() !== null
      ? this.titleId
      : null,
  );

  readonly effectiveState = computed<FormSectionPatternState>(() => {
    if (this.disabled() || this.state() === "disabled") {
      return "disabled";
    }

    return this.state();
  });

  readonly hasAlert = computed(() =>
    this.resolvedAlertTitle() !== null || this.resolvedAlertMessage() !== null,
  );

  readonly showAside = computed(() => this.variant() === "withAsideHelp");

  protected readonly baseClass = formSectionPatternStyleMap.baseClass;

  private readonly idPrefix = `k-form-section-pattern-${++formSectionPatternCounter}`;
  protected readonly titleId = `${this.idPrefix}-title`;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    return this.effectiveState() === "default"
      ? {}
      : {
          [this.effectiveState()]: true,
        };
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
