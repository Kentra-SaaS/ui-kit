import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  BreadcrumbsState,
  BreadcrumbsVariant,
  breadcrumbsStyleMap,
  KentraBreadcrumbsContract,
  KentraElementBase,
} from "../internal";

type SelectionChangeEvent = {
  readonly value: string;
  readonly previousValue: string | null;
  readonly userTriggered: boolean;
};

type RouterLinkCommands = string | readonly unknown[];

type BreadcrumbDisplayItem =
  | {
      readonly type: "item";
      readonly key: string;
      readonly id: string;
      readonly label: string;
      readonly href: string | null;
      readonly routerLink: RouterLinkCommands | null;
      readonly target: string | null;
      readonly rel: string | null;
      readonly disabled: boolean;
    }
  | {
      readonly type: "ellipsis";
      readonly key: string;
    };

export interface KentraBreadcrumbItem {
  readonly id: string;
  readonly label: string;
  readonly href?: string | null;
  readonly routerLink?: RouterLinkCommands | null;
  readonly target?: string | null;
  readonly rel?: string | null;
  readonly disabled?: boolean;
}

@Component({
  selector: "k-breadcrumbs",
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <nav
      class="root"
      [attr.aria-label]="ariaLabel()"
      (focusin)="onFocusIn()"
      (focusout)="onFocusOut($event)"
    >
      <ol class="list">
        @for (item of visibleItems(); track item.key) {
          <li class="item">
            @if (item.type === "ellipsis") {
              <span class="ellipsis" aria-hidden="true">…</span>
            } @else if (isCurrent(item.id)) {
              <span class="current" aria-current="page">{{ item.label }}</span>
            } @else if (item.disabled || disabled()) {
              <span class="link is-disabled" aria-disabled="true">{{ item.label }}</span>
            } @else if (item.routerLink !== null) {
              <a
                class="link"
                [routerLink]="item.routerLink"
                [attr.target]="item.target"
                [attr.rel]="item.rel"
                (click)="onItemClick(item.id, $event)"
              >
                {{ item.label }}
              </a>
            } @else {
              <a
                class="link"
                [attr.href]="item.href"
                [attr.target]="item.target"
                [attr.rel]="item.rel"
                (click)="onItemClick(item.id, $event)"
              >
                {{ item.label }}
              </a>
            }

            @if (!$last) {
              <span class="separator" aria-hidden="true">{{ resolvedSeparator() }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
    }

    .root {
      inline-size: 100%;
    }

    .list {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--k-breadcrumbs-spacing-item-gap, var(--k-space-2));
      margin: 0;
      padding: 0;
      list-style: none;
      min-inline-size: 0;
    }

    .item {
      display: inline-flex;
      align-items: center;
      min-inline-size: 0;
    }

    .link,
    .current,
    .ellipsis,
    .separator {
      font-family: var(--k-breadcrumbs-typography-family, inherit);
      font-size: var(--k-breadcrumbs-typography-font-size, inherit);
      line-height: var(--k-breadcrumbs-typography-line-height, normal);
      font-weight: var(--k-breadcrumbs-typography-font-weight, 400);
    }

    .link {
      color: var(--k-breadcrumbs-colors-link, currentColor);
      text-decoration: none;
      border-radius: var(--k-radius-sm);
      white-space: nowrap;
      cursor: pointer;
      transition: color var(--k-motion-duration-fast, 0s) var(--k-motion-ease-standard, linear);
    }

    .link:hover {
      color: var(--k-breadcrumbs-colors-link-hover, currentColor);
    }

    .link:focus-visible {
      outline: 2px solid var(--k-breadcrumbs-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-breadcrumbs-focus-ring-color, transparent),
        var(--k-breadcrumbs-focus-shadow, none);
    }

    .current {
      color: var(--k-breadcrumbs-colors-current, currentColor);
      white-space: nowrap;
    }

    .ellipsis {
      color: var(--k-breadcrumbs-colors-current, currentColor);
      white-space: nowrap;
    }

    .separator {
      margin-inline: var(--k-breadcrumbs-spacing-separator-gap, var(--k-space-2));
      color: var(--k-breadcrumbs-colors-separator, currentColor);
      white-space: nowrap;
    }

    .is-disabled {
      cursor: not-allowed;
      opacity: var(--k-state-disabled-opacity, 0.56);
    }

    :host(.is-focus-visible) .link {
      outline: 2px solid var(--k-breadcrumbs-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-breadcrumbs-focus-ring-color, transparent),
        var(--k-breadcrumbs-focus-shadow, none);
    }

    :host([aria-disabled="true"]) .link {
      pointer-events: none;
      cursor: not-allowed;
      opacity: var(--k-state-disabled-opacity, 0.56);
    }

    @media (max-width: 64rem) {
      .list {
        gap: max(var(--k-breadcrumbs-spacing-item-gap, var(--k-space-2)), var(--k-space-1));
      }
    }

    @media (max-width: 48rem) {
      .list {
        display: flex;
      }

      .link,
      .current,
      .ellipsis,
      .separator {
        font-size: max(var(--k-breadcrumbs-typography-font-size, 0.875rem), 0.875rem);
      }
    }
  `,
})
export class KentraBreadcrumbs
  extends KentraElementBase
  implements KentraBreadcrumbsContract
{
  readonly variant = input<BreadcrumbsVariant>("default");
  readonly state = input<BreadcrumbsState>("default");
  readonly items = input<readonly KentraBreadcrumbItem[]>([]);
  readonly activeItemId = input<string | null>(null);
  readonly separator = input<string>("/");
  readonly maxItems = input<number | null>(null);
  readonly ariaLabel = input<string>("Breadcrumb");
  readonly disabled = input<boolean>(false);
  readonly click = output<MouseEvent>();
  readonly selectionChanged = output<SelectionChangeEvent>();

  readonly normalizedActiveItemId = computed(() =>
    this.normalizeText(this.activeItemId()),
  );
  readonly normalizedItems = computed(() =>
    this.items()
      .map((item) => {
        const id = this.normalizeText(item.id);
        const label = this.normalizeText(item.label);
        if (id === null || label === null) {
          return null;
        }

        return {
          type: "item" as const,
          key: `item-${id}`,
          id,
          label,
          href: this.normalizeText(item.href ?? null),
          routerLink: item.routerLink ?? null,
          target: this.normalizeText(item.target ?? null),
          rel: this.resolveRel(item.rel ?? null, item.target ?? null),
          disabled: item.disabled ?? false,
        };
      })
      .filter((item): item is Exclude<typeof item, null> => item !== null),
  );
  readonly resolvedActiveItemId = computed(() => {
    const controlledActiveItemId = this.normalizedActiveItemId();
    if (controlledActiveItemId !== null) {
      return controlledActiveItemId;
    }

    const uncontrolledActiveItemId = this.uncontrolledActiveItemId();
    if (uncontrolledActiveItemId !== null) {
      return uncontrolledActiveItemId;
    }

    const items = this.normalizedItems();
    const lastItem = items.length > 0 ? items[items.length - 1] : undefined;
    return lastItem?.id ?? null;
  });
  readonly visibleItems = computed<readonly BreadcrumbDisplayItem[]>(() => {
    const items = this.normalizedItems();
    const maxItems = this.maxItems();

    if (maxItems === null || maxItems < 2 || items.length <= maxItems) {
      return items;
    }

    if (maxItems === 2) {
      return [items[0], items[items.length - 1]];
    }

    const trailingItemCount = Math.max(1, maxItems - 2);
    const trailingItems = items.slice(-trailingItemCount);

    return [
      items[0],
      { type: "ellipsis", key: "ellipsis" },
      ...trailingItems,
    ];
  });
  readonly resolvedSeparator = computed(
    () => this.normalizeText(this.separator()) ?? "/",
  );
  readonly effectiveState = computed<BreadcrumbsState>(() => {
    if (this.state() !== "default") {
      return this.state();
    }

    return this.isFocusVisible() ? "focusVisible" : "default";
  });

  protected readonly baseClass = breadcrumbsStyleMap.baseClass;

  private readonly isFocusVisible = signal(false);
  private readonly uncontrolledActiveItemId = signal<string | null>(null);

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

  isCurrent(id: string): boolean {
    return this.resolvedActiveItemId() === id;
  }

  onItemClick(id: string, event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const previousValue = this.resolvedActiveItemId();

    if (this.normalizedActiveItemId() === null) {
      this.uncontrolledActiveItemId.set(id);
    }

    this.click.emit(event);
    this.selectionChanged.emit({
      value: id,
      previousValue,
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

  private resolveRel(rel: string | null, target: string | null): string | null {
    const normalizedRel = this.normalizeText(rel);
    if (normalizedRel !== null) {
      return normalizedRel;
    }

    return this.normalizeText(target) === "_blank" ? "noopener noreferrer" : null;
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
