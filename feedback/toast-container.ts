import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";

import { KentraElementBase } from "../internal";
import { KentraToast } from "./toast";
import {
  KentraManagedToast,
  KentraToastPlacement,
  KentraToastService,
} from "./toast.service";

const DEFAULT_TOAST_PLACEMENTS: readonly KentraToastPlacement[] = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
  "bottom-center",
] as const;

const normalizePlacementList = (
  placements: readonly KentraToastPlacement[],
): readonly KentraToastPlacement[] => {
  const normalized: KentraToastPlacement[] = [];

  for (const candidate of placements) {
    if (!DEFAULT_TOAST_PLACEMENTS.includes(candidate)) {
      continue;
    }

    if (normalized.includes(candidate)) {
      continue;
    }

    normalized.push(candidate);
  }

  return normalized.length > 0 ? normalized : DEFAULT_TOAST_PLACEMENTS;
};

@Component({
  selector: "k-toast-container",
  standalone: true,
  imports: [KentraToast],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-hidden]": "hasVisibleToasts() ? null : 'true'",
  },
  template: `
    @for (placement of resolvedPlacements(); track placement) {
      @if (toastsForPlacement(placement); as placementToasts) {
        @if (placementToasts.length > 0) {
          <section class="stack" [class]="stackClasses(placement)">
            @for (toast of placementToasts; track toast.id) {
              <k-toast
                [variant]="toast.variant"
                [state]="toast.state"
                [icon]="toast.icon"
                [title]="toast.title"
                [message]="toast.message"
                [dismissible]="toast.dismissible"
                [ariaLive]="toast.ariaLive"
                (closed)="closeToast(toast.id)"
              ></k-toast>
            }
          </section>
        }
      }
    }
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: var(--k-toast-container-z-index, var(--k-z-index-toast));
    }

    .stack {
      position: fixed;
      display: grid;
      gap: var(--k-toast-container-gap, var(--k-space-2));
      inline-size: min(
        var(--k-toast-container-inline-size, 100%),
        var(--k-toast-container-max-inline-size, 32rem)
      );
      pointer-events: none;
    }

    .stack > k-toast {
      pointer-events: auto;
    }

    .stack-top-left {
      inset-block-start: var(--k-toast-container-offset, var(--k-space-4));
      inset-inline-start: var(--k-toast-container-offset, var(--k-space-4));
      justify-items: start;
    }

    .stack-top-right {
      inset-block-start: var(--k-toast-container-offset, var(--k-space-4));
      inset-inline-end: var(--k-toast-container-offset, var(--k-space-4));
      justify-items: end;
    }

    .stack-bottom-left {
      inset-block-end: var(--k-toast-container-offset, var(--k-space-4));
      inset-inline-start: var(--k-toast-container-offset, var(--k-space-4));
      justify-items: start;
    }

    .stack-bottom-right {
      inset-block-end: var(--k-toast-container-offset, var(--k-space-4));
      inset-inline-end: var(--k-toast-container-offset, var(--k-space-4));
      justify-items: end;
    }

    .stack-bottom-center {
      inset-block-end: var(--k-toast-container-offset, var(--k-space-4));
      inset-inline-start: 50%;
      transform: translateX(-50%);
      justify-items: center;
    }

    @media (max-width: 64rem) {
      .stack {
        inline-size: min(
          calc(100dvw - (2 * var(--k-space-3))),
          var(--k-toast-container-max-inline-size, 32rem)
        );
      }

      .stack-top-left,
      .stack-top-right,
      .stack-bottom-left,
      .stack-bottom-right,
      .stack-bottom-center {
        inset-block-start: var(--k-toast-container-offset-tablet, var(--k-space-3));
      }

      .stack-bottom-left,
      .stack-bottom-right,
      .stack-bottom-center {
        inset-block-start: auto;
        inset-block-end: var(--k-toast-container-offset-tablet, var(--k-space-3));
      }

      .stack-top-left,
      .stack-bottom-left {
        inset-inline-start: var(--k-toast-container-offset-tablet, var(--k-space-3));
      }

      .stack-top-right,
      .stack-bottom-right {
        inset-inline-end: var(--k-toast-container-offset-tablet, var(--k-space-3));
      }
    }

    @media (max-width: 48rem) {
      .stack {
        inline-size: calc(100dvw - (2 * var(--k-space-2)));
      }

      .stack-top-left,
      .stack-top-right,
      .stack-bottom-left,
      .stack-bottom-right,
      .stack-bottom-center {
        inset-inline-start: var(--k-toast-container-offset-mobile, var(--k-space-2));
        inset-inline-end: var(--k-toast-container-offset-mobile, var(--k-space-2));
        justify-items: stretch;
      }

      .stack-bottom-center {
        transform: none;
      }
    }
  `,
})
export class KentraToastContainer extends KentraElementBase {
  readonly toastService = input<KentraToastService | null>(null);
  readonly placements = input<readonly KentraToastPlacement[]>(
    DEFAULT_TOAST_PLACEMENTS,
  );
  readonly maxVisible = input<number | null>(null);
  readonly newestOnTop = input<boolean>(true);
  readonly offset = input<string | number | null>(null);
  readonly zIndex = input<string | number | null>(null);

  readonly resolvedPlacements = computed(() =>
    normalizePlacementList(this.placements()),
  );
  readonly groupedToasts = computed(() => {
    const service = this.resolvedService();
    const allToasts = service.toasts();
    const maxVisible = this.resolveMaxVisible(this.maxVisible());
    const newestOnTop = this.newestOnTop();
    const groups: Record<KentraToastPlacement, readonly KentraManagedToast[]> = {
      "top-left": [],
      "top-right": [],
      "bottom-left": [],
      "bottom-right": [],
      "bottom-center": [],
    };

    for (const placement of Object.keys(groups) as KentraToastPlacement[]) {
      const placementToasts = allToasts.filter((toast) => toast.placement === placement);
      const orderedToasts = newestOnTop
        ? [...placementToasts].sort((left, right) => right.createdAt - left.createdAt)
        : [...placementToasts].sort((left, right) => left.createdAt - right.createdAt);

      groups[placement] =
        maxVisible === null ? orderedToasts : orderedToasts.slice(0, maxVisible);
    }

    return groups;
  });
  readonly hasVisibleToasts = computed(() => this.resolvedService().toasts().length > 0);

  protected readonly baseClass = "k-toast-container";

  private readonly injectedToastService = inject(KentraToastService);
  private readonly resolvedService = computed(
    () => this.toastService() ?? this.injectedToastService,
  );

  protected override stateValues() {
    return {
      empty: !this.hasVisibleToasts(),
    };
  }

  protected override cssVars() {
    return {
      "--k-toast-container-offset": this.normalizeCssValue(this.offset()),
      "--k-toast-container-z-index": this.normalizeCssValue(this.zIndex()),
    };
  }

  toastsForPlacement(placement: KentraToastPlacement): readonly KentraManagedToast[] {
    return this.groupedToasts()[placement] ?? [];
  }

  stackClasses(placement: KentraToastPlacement): string {
    return `stack stack-${placement}`;
  }

  closeToast(id: string): void {
    this.resolvedService().close(id);
  }

  private resolveMaxVisible(value: number | null): number | null {
    if (value === null || Number.isNaN(value)) {
      return null;
    }

    const normalizedValue = Math.floor(value);
    return normalizedValue > 0 ? normalizedValue : null;
  }

  private normalizeCssValue(value: string | number | null): string | number | null {
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : null;
    }

    if (value === null) {
      return null;
    }

    const normalizedValue = value.trim();
    return normalizedValue.length > 0 ? normalizedValue : null;
  }
}
