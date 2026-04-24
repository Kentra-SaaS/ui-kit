import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  KentraElementBase,
  KentraSpinnerContract,
  SpinnerState,
  SpinnerVariant,
  spinnerStyleMap,
} from "../internal";

@Component({
  selector: "k-spinner",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.role]": "resolvedLabel() ? 'status' : null",
    "[attr.aria-live]": "resolvedLabel() ? 'polite' : null",
  },
  template: `
    <span class="spinner" aria-hidden="true">
      <svg class="svg" viewBox="0 0 24 24" focusable="false">
        <circle class="track" cx="12" cy="12" r="9"></circle>
        <circle class="indicator" cx="12" cy="12" r="9"></circle>
      </svg>
    </span>

    @if (resolvedLabel(); as labelText) {
      <span class="label">{{ labelText }}</span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--k-spinner-label-gap, var(--k-space-2));
      color: var(--k-spinner-colors-label, currentColor);
      max-inline-size: 100%;
    }

    .spinner {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-spinner-size, var(--k-icon-size-md));
      block-size: var(--k-spinner-size, var(--k-icon-size-md));
      flex: none;
    }

    .svg {
      inline-size: 100%;
      block-size: 100%;
      animation: k-spinner-rotate var(--k-spinner-motion-duration, 0.9s)
        var(--k-spinner-motion-easing, linear) infinite;
    }

    .track,
    .indicator {
      fill: none;
      stroke-width: var(--k-spinner-stroke-width, 2px);
    }

    .track {
      stroke: var(--k-spinner-colors-track, transparent);
      opacity: 0.48;
    }

    .indicator {
      stroke: var(--k-spinner-colors-indicator, currentColor);
      stroke-linecap: round;
      stroke-dasharray: 56.55;
      stroke-dashoffset: 18;
      transform-origin: center;
      animation: k-spinner-dash var(--k-spinner-motion-duration, 0.9s)
        var(--k-spinner-motion-easing, linear) infinite;
    }

    .label {
      color: var(--k-spinner-colors-label, currentColor);
      font-family: var(--k-spinner-label-family, inherit);
      font-size: var(--k-spinner-label-font-size, inherit);
      line-height: var(--k-spinner-label-line-height, 1.4);
      font-weight: var(--k-spinner-label-font-weight, 400);
    }

    @keyframes k-spinner-rotate {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes k-spinner-dash {
      0% {
        stroke-dashoffset: 56.55;
      }

      50% {
        stroke-dashoffset: 14;
      }

      100% {
        stroke-dashoffset: -56.55;
      }
    }

    @media (max-width: 64rem) {
      .spinner {
        inline-size: max(var(--k-spinner-size, var(--k-icon-size-md)), 1.125rem);
        block-size: max(var(--k-spinner-size, var(--k-icon-size-md)), 1.125rem);
      }
    }

    @media (max-width: 48rem) {
      .spinner {
        inline-size: max(var(--k-spinner-size, var(--k-icon-size-md)), 1.25rem);
        block-size: max(var(--k-spinner-size, var(--k-icon-size-md)), 1.25rem);
      }
    }
  `,
})
export class KentraSpinner extends KentraElementBase implements KentraSpinnerContract {
  readonly variant = input<SpinnerVariant>("md");
  readonly state = input<SpinnerState>("default");
  readonly label = input<string | null>(null);

  readonly resolvedLabel = computed(() => this.normalizeText(this.label()));

  protected readonly baseClass = spinnerStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    const state = this.state();

    return state === "default"
      ? {}
      : {
          [state]: true,
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
