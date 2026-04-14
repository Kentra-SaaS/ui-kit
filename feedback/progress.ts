import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  KentraElementBase,
  KentraProgressContract,
  ProgressState,
  ProgressVariant,
  progressStyleMap,
} from "../internal";

@Component({
  selector: "k-progress",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.role]": "'progressbar'",
    "[attr.aria-valuemin]": "variant() === 'determinate' ? 0 : null",
    "[attr.aria-valuemax]": "variant() === 'determinate' ? safeMax() : null",
    "[attr.aria-valuenow]": "ariaValueNow()",
    "[attr.aria-busy]": "variant() === 'indeterminate' ? 'true' : null",
  },
  template: `
    <div class="track" aria-hidden="true">
      <span class="indicator"></span>
    </div>

    @if (resolvedLabel(); as labelText) {
      <span class="label">{{ labelText }}</span>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: var(--k-progress-label-gap, var(--k-space-2));
      inline-size: 100%;
      max-inline-size: 100%;
    }

    .track {
      position: relative;
      overflow: hidden;
      inline-size: 100%;
      block-size: var(--k-progress-track-height, var(--k-space-2));
      border-radius: var(--k-progress-track-border-radius, var(--k-radius-pill));
      background: var(--k-progress-colors-track, transparent);
    }

    .indicator {
      display: block;
      inline-size: calc(var(--k-progress-value-ratio, 0) * 100%);
      block-size: 100%;
      border-radius: inherit;
      background: var(--k-progress-colors-indicator, currentColor);
      transition: inline-size var(--k-progress-motion-duration, 0s)
        var(--k-progress-motion-easing, linear);
    }

    :host(.k-progress--variant-indeterminate) .indicator {
      inline-size: 35%;
      animation: k-progress-indeterminate var(--k-progress-animation-duration, 1.2s)
        var(--k-progress-animation-easing, linear) infinite;
    }

    :host(.k-progress--variant-indeterminate.is-paused) .indicator {
      animation-play-state: var(--k-progress-animation-play-state, paused);
    }

    .label {
      color: var(--k-progress-colors-label, currentColor);
      font-family: var(--k-progress-label-family, inherit);
      font-size: var(--k-progress-label-font-size, inherit);
      line-height: var(--k-progress-label-line-height, 1.4);
      font-weight: var(--k-progress-label-font-weight, 600);
    }

    :host(.is-paused) .indicator,
    :host(.is-paused) .label {
      opacity: var(--k-progress-paused-opacity, 1);
    }

    @keyframes k-progress-indeterminate {
      0% {
        transform: translateX(-120%);
      }

      100% {
        transform: translateX(320%);
      }
    }

    @media (max-width: 64rem) {
      .track {
        block-size: max(var(--k-progress-track-height, var(--k-space-2)), 0.5rem);
      }
    }

    @media (max-width: 48rem) {
      .track {
        block-size: max(var(--k-progress-track-height, var(--k-space-2)), 0.625rem);
      }
    }
  `,
})
export class KentraProgress
  extends KentraElementBase
  implements KentraProgressContract
{
  readonly variant = input<ProgressVariant>("determinate");
  readonly state = input<ProgressState>("default");
  readonly value = input<number | null>(0);
  readonly max = input<number>(100);
  readonly label = input<string | null>(null);

  readonly safeMax = computed(() => Math.max(this.max(), 1));
  readonly clampedValue = computed(() => {
    const value = this.value();
    if (value === null) {
      return 0;
    }

    const max = this.safeMax();
    return Math.min(Math.max(value, 0), max);
  });
  readonly valueRatio = computed(() => this.clampedValue() / this.safeMax());
  readonly resolvedLabel = computed(() => {
    const explicitLabel = this.normalizeText(this.label());
    if (explicitLabel !== null) {
      return explicitLabel;
    }

    if (this.variant() === "determinate") {
      return `${Math.round(this.valueRatio() * 100)}%`;
    }

    return null;
  });
  readonly ariaValueNow = computed(() =>
    this.variant() === "determinate" ? this.clampedValue() : null,
  );

  protected readonly baseClass = progressStyleMap.baseClass;

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

  protected override cssVars() {
    return {
      "--k-progress-value-ratio": this.variant() === "determinate" ? this.valueRatio() : null,
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
