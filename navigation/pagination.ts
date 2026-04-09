import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from "@angular/core";
import {
  KentraElementBase,
  KentraPaginationContract,
  PaginationState,
  PaginationVariant,
  paginationStyleMap,
} from "../internal";

type ValueChangeEvent = {
  readonly value: number;
  readonly previousValue: number | null;
  readonly userTriggered: boolean;
};

type PaginationItem =
  | {
      readonly type: "page";
      readonly key: string;
      readonly page: number;
    }
  | {
      readonly type: "ellipsis";
      readonly key: string;
    };

@Component({
  selector: "k-pagination",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <nav
      class="root"
      aria-label="Pagination"
      (focusin)="onFocusIn()"
      (focusout)="onFocusOut($event)"
    >
      <button
        class="button nav-button"
        type="button"
        [disabled]="isPrevDisabled()"
        aria-label="Previous page"
        (click)="goToPage(currentPage() - 1, $event)"
      >
        Prev
      </button>

      @for (item of paginationItems(); track item.key) {
        @if (item.type === "ellipsis") {
          <span class="ellipsis" aria-hidden="true">…</span>
        } @else {
          <button
            class="button page-button"
            type="button"
            [class.is-active]="item.page === currentPage()"
            [attr.aria-current]="item.page === currentPage() ? 'page' : null"
            [disabled]="disabled()"
            (click)="goToPage(item.page, $event)"
          >
            {{ item.page }}
          </button>
        }
      }

      <button
        class="button nav-button"
        type="button"
        [disabled]="isNextDisabled()"
        aria-label="Next page"
        (click)="goToPage(currentPage() + 1, $event)"
      >
        Next
      </button>
    </nav>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
    }

    .root {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--k-pagination-container-gap, var(--k-space-2));
    }

    .button {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-inline-size: var(--k-pagination-button-min-width, var(--k-space-8));
      min-block-size: var(--k-pagination-button-min-height, var(--k-space-8));
      padding-inline: var(--k-pagination-button-padding-x, var(--k-space-2));
      padding-block: var(--k-pagination-button-padding-y, var(--k-space-1));
      border: var(--k-pagination-button-border-width, 1px) solid
        var(--k-pagination-colors-border, transparent);
      border-radius: var(--k-pagination-button-radius, var(--k-radius-md));
      background: var(--k-pagination-colors-bg, transparent);
      color: var(--k-pagination-colors-text, currentColor);
      font-family: var(--k-pagination-button-typography-family, inherit);
      font-size: var(--k-pagination-button-typography-font-size, inherit);
      line-height: var(--k-pagination-button-typography-line-height, normal);
      font-weight: var(--k-pagination-button-typography-font-weight, 600);
      cursor: pointer;
      transition:
        background var(--k-pagination-motion-duration, 0s)
          var(--k-pagination-motion-easing, linear),
        color var(--k-pagination-motion-duration, 0s)
          var(--k-pagination-motion-easing, linear),
        border-color var(--k-pagination-motion-duration, 0s)
          var(--k-pagination-motion-easing, linear),
        opacity var(--k-pagination-motion-duration, 0s)
          var(--k-pagination-motion-easing, linear);
    }

    .button.is-active {
      background: var(--k-color-action-primary-bg);
      color: var(--k-color-action-primary-text);
      border-color: var(--k-color-action-primary-bg);
    }

    .button:focus-visible {
      outline: 2px solid var(--k-pagination-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-pagination-focus-ring-color, transparent),
        var(--k-pagination-focus-shadow, none);
    }

    .button:disabled {
      cursor: not-allowed;
      opacity: var(--k-pagination-disabled-opacity, var(--k-state-disabled-opacity, 0.56));
    }

    .ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-inline-size: var(--k-pagination-button-min-width, var(--k-space-8));
      color: var(--k-pagination-colors-text, currentColor);
      user-select: none;
    }

    :host([aria-disabled="true"]) .button {
      pointer-events: none;
      cursor: not-allowed;
      opacity: var(--k-pagination-disabled-opacity, var(--k-state-disabled-opacity, 0.56));
    }

    :host(.is-disabled) .button {
      pointer-events: none;
      cursor: not-allowed;
      opacity: var(--k-pagination-disabled-opacity, var(--k-state-disabled-opacity, 0.56));
    }

    @media (max-width: 64rem) {
      .button {
        min-inline-size: max(var(--k-pagination-button-min-width, var(--k-space-8)), var(--k-space-8));
        min-block-size: max(var(--k-pagination-button-min-height, var(--k-space-8)), var(--k-space-8));
      }
    }

    @media (max-width: 48rem) {
      .button {
        min-inline-size: max(var(--k-pagination-button-min-width, var(--k-space-8)), 2.75rem);
        min-block-size: max(var(--k-pagination-button-min-height, var(--k-space-8)), 2.75rem);
      }
    }
  `,
})
export class KentraPagination
  extends KentraElementBase
  implements KentraPaginationContract
{
  readonly variant = input<PaginationVariant>("default");
  readonly state = input<PaginationState>("default");
  readonly page = input<number>(1);
  readonly pageSize = input<number>(10);
  readonly total = input<number>(0);
  readonly siblingCount = input<number>(1);
  readonly disabled = input<boolean>(false);
  readonly valueChanged = output<ValueChangeEvent>();

  readonly totalPages = computed(() => {
    const pageSize = Math.max(1, Math.trunc(this.pageSize()));
    const total = Math.max(0, Math.trunc(this.total()));
    const pages = Math.ceil(total / pageSize);
    return Math.max(1, pages);
  });
  readonly currentPage = computed(() => {
    const page = Math.trunc(this.page());
    return this.clamp(page, 1, this.totalPages());
  });
  readonly paginationItems = computed<readonly PaginationItem[]>(() => {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage();
    const siblingCount = Math.max(0, Math.trunc(this.siblingCount()));
    const maxVisibleWithoutEllipsis = siblingCount * 2 + 5;

    if (totalPages <= maxVisibleWithoutEllipsis) {
      return Array.from({ length: totalPages }, (_, index) => ({
        type: "page" as const,
        key: `page-${index + 1}`,
        page: index + 1,
      }));
    }

    const items: PaginationItem[] = [
      {
        type: "page",
        key: "page-1",
        page: 1,
      },
    ];

    const leftSibling = Math.max(2, currentPage - siblingCount);
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount);

    if (leftSibling > 2) {
      items.push({
        type: "ellipsis",
        key: "ellipsis-left",
      });
    }

    for (let page = leftSibling; page <= rightSibling; page += 1) {
      items.push({
        type: "page",
        key: `page-${page}`,
        page,
      });
    }

    if (rightSibling < totalPages - 1) {
      items.push({
        type: "ellipsis",
        key: "ellipsis-right",
      });
    }

    items.push({
      type: "page",
      key: `page-${totalPages}`,
      page: totalPages,
    });

    return items;
  });
  readonly effectiveState = computed<PaginationState>(() => {
    if (this.disabled() || this.state() === "disabled") {
      return "disabled";
    }

    if (this.state() !== "default") {
      return this.state();
    }

    return this.isFocusVisible() ? "focusVisible" : "default";
  });

  protected readonly baseClass = paginationStyleMap.baseClass;

  private readonly isFocusVisible = signal(false);

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    const state = this.effectiveState();

    return state === "default"
      ? {}
      : {
          [state]: true,
        };
  }

  isPrevDisabled(): boolean {
    return this.disabled() || this.currentPage() <= 1;
  }

  isNextDisabled(): boolean {
    return this.disabled() || this.currentPage() >= this.totalPages();
  }

  goToPage(nextPage: number, event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const clampedNextPage = this.clamp(Math.trunc(nextPage), 1, this.totalPages());
    const currentPage = this.currentPage();
    if (clampedNextPage === currentPage) {
      return;
    }

    this.valueChanged.emit({
      value: clampedNextPage,
      previousValue: currentPage,
      userTriggered: true,
    });
  }

  onFocusIn(): void {
    this.isFocusVisible.set(true);
  }

  onFocusOut(event: FocusEvent): void {
    const nextFocusedNode = event.relatedTarget as Node | null;
    const hostElement = event.currentTarget as HTMLElement | null;
    if (hostElement !== null && nextFocusedNode !== null) {
      if (hostElement.contains(nextFocusedNode)) {
        return;
      }
    }

    this.isFocusVisible.set(false);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }
}
