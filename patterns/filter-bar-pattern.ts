import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

import {
  FilterBarPatternState,
  FilterBarPatternVariant,
  filterBarPatternStyleMap,
  KentraElementBase,
  KentraFilterBarPatternContract,
} from "../internal";

@Component({
  selector: "k-filter-bar-pattern",
  standalone: true,
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
    >
      <div class="primary" [class.is-disabled]="effectiveState() === 'disabled'">
        <div class="search">
          <ng-content select="[kFilterBarSearch]"></ng-content>
        </div>

        <div class="filters">
          <ng-content select="[kFilterBarFilters]"></ng-content>
        </div>
      </div>

      <div class="secondary" [class.is-disabled]="effectiveState() === 'disabled'">
        <ng-content select="[kFilterBarSecondaryActions]"></ng-content>
      </div>

      <div class="chips" [attr.hidden]="variant() === 'withChips' ? null : ''">
        <ng-content select="[kFilterBarChips]"></ng-content>
      </div>
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
      gap: var(--k-filter-bar-pattern-spacing-section-gap, var(--k-space-3));
      inline-size: 100%;
      padding-inline: var(--k-filter-bar-pattern-container-padding-x, var(--k-space-4));
      padding-block: var(--k-filter-bar-pattern-container-padding-y, var(--k-space-3));
      border: var(--k-filter-bar-pattern-container-border-width, 1px) solid
        var(--k-filter-bar-pattern-colors-border, transparent);
      border-radius: var(--k-filter-bar-pattern-container-border-radius, var(--k-radius-md));
      background: var(--k-filter-bar-pattern-colors-bg, transparent);
      color: var(--k-filter-bar-pattern-colors-text, currentColor);
      transition:
        border-color var(--k-filter-bar-pattern-motion-duration, 0s)
          var(--k-filter-bar-pattern-motion-easing, linear),
        background var(--k-filter-bar-pattern-motion-duration, 0s)
          var(--k-filter-bar-pattern-motion-easing, linear),
        color var(--k-filter-bar-pattern-motion-duration, 0s)
          var(--k-filter-bar-pattern-motion-easing, linear);
    }

    .primary {
      display: grid;
      grid-template-columns:
        minmax(var(--k-filter-bar-pattern-slots-min-search-width, 14rem), 1fr)
        minmax(var(--k-filter-bar-pattern-slots-min-filter-width, 10rem), 1fr);
      gap: var(--k-filter-bar-pattern-spacing-primary-gap, var(--k-space-2));
      min-inline-size: 0;
    }

    .search,
    .filters,
    .secondary,
    .chips {
      min-inline-size: 0;
    }

    .secondary {
      display: inline-flex;
      flex-wrap: wrap;
      justify-content: var(--k-filter-bar-pattern-layout-secondary-justify, flex-end);
      gap: var(--k-filter-bar-pattern-spacing-secondary-gap, var(--k-space-2));
    }

    .chips {
      display: var(--k-filter-bar-pattern-layout-chips-display, none);
      flex-wrap: wrap;
      gap: var(--k-filter-bar-pattern-spacing-chips-gap, var(--k-space-2));
      color: var(--k-filter-bar-pattern-colors-muted-text, currentColor);
    }

    :host(.k-filter-bar-pattern--variant-wrap) .primary,
    :host(.k-filter-bar-pattern--variant-with-chips) .primary {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .is-disabled {
      pointer-events: none;
      opacity: var(--k-state-disabled-opacity, 0.56);
    }

    @media (max-width: 64rem) {
      .container {
        padding-inline: max(var(--k-filter-bar-pattern-container-padding-x, var(--k-space-4)), var(--k-space-3));
      }

      .primary {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .secondary {
        justify-content: flex-start;
      }
    }

    @media (max-width: 48rem) {
      .primary {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class KentraFilterBarPattern
  extends KentraElementBase
  implements KentraFilterBarPatternContract
{
  readonly variant = input<FilterBarPatternVariant>("inline");
  readonly state = input<FilterBarPatternState>("default");
  readonly ariaLabel = input<string | null>("Filter controls");
  readonly disabled = input<boolean>(false);

  readonly search = computed(() => undefined);
  readonly filters = computed(() => undefined);
  readonly secondaryActions = computed(() => undefined);
  readonly chips = computed(() => undefined);

  readonly resolvedAriaLabel = computed(() => this.normalizeText(this.ariaLabel()));

  readonly effectiveState = computed<FilterBarPatternState>(() => {
    if (this.disabled() || this.state() === "disabled") {
      return "disabled";
    }

    return "default";
  });

  protected readonly baseClass = filterBarPatternStyleMap.baseClass;

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
