import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { KentraIcon } from "@kentra-saas/ui-kit/icons";
import {
  IconName,
  KentraElementBase,
  KentraSideNavContract,
  SideNavState,
  SideNavVariant,
  sideNavStyleMap,
} from "@kentra-saas/ui-kit";

type SelectionChangeEvent = {
  readonly value: string;
  readonly previousValue: string | null;
  readonly userTriggered: boolean;
};

type RouterLinkCommands = string | readonly unknown[];

type NormalizedSideNavItem = {
  readonly id: string;
  readonly label: string;
  readonly icon: IconName | null;
  readonly href: string | null;
  readonly routerLink: RouterLinkCommands | null;
  readonly target: string | null;
  readonly rel: string | null;
  readonly disabled: boolean;
};

type NormalizedSideNavGroup = {
  readonly id: string;
  readonly title: string | null;
  readonly items: readonly NormalizedSideNavItem[];
};

export interface KentraSideNavItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: IconName | null;
  readonly href?: string | null;
  readonly routerLink?: RouterLinkCommands | null;
  readonly target?: string | null;
  readonly rel?: string | null;
  readonly disabled?: boolean;
}

export interface KentraSideNavGroup {
  readonly id: string;
  readonly title?: string | null;
  readonly items: readonly KentraSideNavItem[];
}

@Component({
  selector: "k-side-nav",
  standalone: true,
  imports: [RouterLink, KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <nav
      class="nav"
      [attr.aria-label]="ariaLabel()"
      (focusin)="onFocusIn()"
      (focusout)="onFocusOut($event)"
    >
      @for (group of resolvedGroups(); track group.id) {
        <section class="group">
          @if (group.title !== null) {
            <h3
              class="group-title"
              [attr.hidden]="variant() === 'collapsed' ? '' : null"
            >
              {{ group.title }}
            </h3>
          }

          <ul class="items">
            @for (item of group.items; track item.id) {
              <li class="entry">
                @if (item.disabled || disabled()) {
                  <span class="item is-disabled" aria-disabled="true">
                    @if (item.icon !== null) {
                      <k-icon class="icon" [name]="item.icon" size="sm" aria-hidden="true"></k-icon>
                    }
                    <span class="label" [attr.hidden]="variant() === 'collapsed' ? '' : null">
                      {{ item.label }}
                    </span>
                  </span>
                } @else if (item.routerLink !== null) {
                  <a
                    class="item"
                    [class.is-active]="isActive(item.id)"
                    [routerLink]="item.routerLink"
                    [attr.target]="item.target"
                    [attr.rel]="item.rel"
                    (click)="onItemClick(item.id, $event)"
                  >
                    @if (item.icon !== null) {
                      <k-icon class="icon" [name]="item.icon" size="sm" aria-hidden="true"></k-icon>
                    }
                    <span class="label" [attr.hidden]="variant() === 'collapsed' ? '' : null">
                      {{ item.label }}
                    </span>
                  </a>
                } @else {
                  <a
                    class="item"
                    [class.is-active]="isActive(item.id)"
                    [attr.href]="item.href"
                    [attr.target]="item.target"
                    [attr.rel]="item.rel"
                    (click)="onItemClick(item.id, $event)"
                  >
                    @if (item.icon !== null) {
                      <k-icon class="icon" [name]="item.icon" size="sm" aria-hidden="true"></k-icon>
                    }
                    <span class="label" [attr.hidden]="variant() === 'collapsed' ? '' : null">
                      {{ item.label }}
                    </span>
                  </a>
                }
              </li>
            }
          </ul>
        </section>
      }
    </nav>
  `,
  styles: `
    :host {
      display: block;
      inline-size: fit-content;
      max-inline-size: 100%;
      min-block-size: 100%;
    }

    .nav {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--k-space-2);
      inline-size: var(--k-side-nav-nav-width, 17rem);
      max-inline-size: 100%;
      min-block-size: 100%;
      padding: var(--k-side-nav-nav-padding, var(--k-space-2));
      border: var(--k-side-nav-nav-border-width, 1px) solid
        var(--k-side-nav-colors-nav-border, transparent);
      border-radius: var(--k-side-nav-nav-radius, var(--k-radius-lg));
      background: var(--k-side-nav-colors-nav-bg, transparent);
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: var(--k-space-1);
      min-inline-size: 0;
    }

    .group-title {
      margin: 0;
      padding-inline: var(--k-side-nav-item-padding-x, var(--k-space-3));
      color: var(--k-side-nav-colors-section-title, currentColor);
      font-family: var(--k-side-nav-section-title-family, inherit);
      font-size: var(--k-side-nav-section-title-font-size, inherit);
      line-height: var(--k-side-nav-section-title-line-height, normal);
      font-weight: var(--k-side-nav-section-title-font-weight, 600);
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    .items {
      display: flex;
      flex-direction: column;
      gap: var(--k-space-1);
      margin: 0;
      padding: 0;
      list-style: none;
      min-inline-size: 0;
    }

    .entry {
      min-inline-size: 0;
    }

    .item {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: var(--k-side-nav-item-justify, flex-start);
      gap: var(--k-side-nav-item-gap, var(--k-space-2));
      inline-size: 100%;
      min-block-size: var(--k-side-nav-item-min-height, var(--k-space-10));
      padding-inline: var(--k-side-nav-item-padding-x, var(--k-space-3));
      padding-block: var(--k-side-nav-item-padding-y, var(--k-space-2));
      border: 0;
      border-radius: var(--k-side-nav-item-radius, var(--k-radius-md));
      background: var(--k-side-nav-colors-item-bg, transparent);
      color: var(--k-side-nav-colors-item-text, currentColor);
      text-decoration: none;
      cursor: pointer;
      transition:
        background var(--k-side-nav-motion-duration, 0s)
          var(--k-side-nav-motion-easing, linear),
        color var(--k-side-nav-motion-duration, 0s)
          var(--k-side-nav-motion-easing, linear),
        opacity var(--k-side-nav-motion-duration, 0s)
          var(--k-side-nav-motion-easing, linear);
    }

    .item:hover {
      background: var(--k-color-state-hover-overlay, var(--k-color-bg-subtle, transparent));
      color: var(--k-color-text-primary);
    }

    .item.is-active {
      background: var(--k-color-state-selected-bg);
      color: var(--k-color-state-selected-text);
    }

    .item:focus-visible {
      outline: 2px solid var(--k-side-nav-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-side-nav-focus-ring-color, transparent),
        var(--k-side-nav-focus-shadow, none);
    }

    .icon {
      --k-icon-color: var(--k-side-nav-colors-icon, currentColor);
      flex: none;
    }

    .item.is-active .icon {
      --k-icon-color: currentColor;
    }

    .label {
      min-inline-size: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: var(--k-side-nav-item-typography-family, inherit);
      font-size: var(--k-side-nav-item-typography-font-size, inherit);
      line-height: var(--k-side-nav-item-typography-line-height, normal);
      font-weight: var(--k-side-nav-item-typography-font-weight, 600);
    }

    .is-disabled {
      cursor: not-allowed;
      opacity: var(--k-side-nav-disabled-opacity, var(--k-state-disabled-opacity, 0.56));
      pointer-events: none;
    }

    :host([aria-disabled="true"]) .item {
      pointer-events: none;
      cursor: not-allowed;
      opacity: var(--k-side-nav-disabled-opacity, var(--k-state-disabled-opacity, 0.56));
    }

    :host(.is-disabled) .item {
      pointer-events: none;
      cursor: not-allowed;
      opacity: var(--k-side-nav-disabled-opacity, var(--k-state-disabled-opacity, 0.56));
    }

    @media (max-width: 64rem) {
      .nav {
        inline-size: min(var(--k-side-nav-nav-width, 17rem), 100%);
      }
    }

    @media (max-width: 48rem) {
      :host {
        inline-size: 100%;
      }

      .nav {
        inline-size: 100%;
      }

      .item {
        min-block-size: max(var(--k-side-nav-item-min-height, var(--k-space-10)), 2.75rem);
      }
    }
  `,
})
export class KentraSideNav extends KentraElementBase implements KentraSideNavContract {
  readonly variant = input<SideNavVariant>("expanded");
  readonly state = input<SideNavState>("default");
  readonly groups = input<readonly KentraSideNavGroup[]>([]);
  readonly items = input<readonly KentraSideNavItem[]>([]);
  readonly activeItemId = input<string | null>(null);
  readonly ariaLabel = input<string>("Side navigation");
  readonly disabled = input<boolean>(false);
  readonly selectionChanged = output<SelectionChangeEvent>();

  readonly normalizedActiveItemId = computed(() =>
    this.normalizeText(this.activeItemId()),
  );
  readonly resolvedGroups = computed<readonly NormalizedSideNavGroup[]>(() => {
    const normalizedGroups = this.groups()
      .map((group) => this.normalizeGroup(group))
      .filter((group): group is Exclude<typeof group, null> => group !== null)
      .filter((group) => group.items.length > 0);

    if (normalizedGroups.length > 0) {
      return normalizedGroups;
    }

    const normalizedItems = this.normalizeItems(this.items());
    if (normalizedItems.length === 0) {
      return [];
    }

    return [
      {
        id: "default",
        title: null,
        items: normalizedItems,
      },
    ];
  });
  readonly resolvedActiveItemId = computed(() => {
    const controlledActiveItemId = this.normalizedActiveItemId();
    if (controlledActiveItemId !== null) {
      return controlledActiveItemId;
    }

    const uncontrolledActiveItemId = this.uncontrolledActiveItemId();
    if (uncontrolledActiveItemId !== null) {
      return uncontrolledActiveItemId;
    }

    const firstEnabledItem = this.resolvedGroups()
      .flatMap((group) => group.items)
      .find((item) => !item.disabled);

    return firstEnabledItem?.id ?? null;
  });
  readonly effectiveState = computed<SideNavState>(() => {
    if (this.disabled() || this.state() === "disabled") {
      return "disabled";
    }

    if (this.state() !== "default") {
      return this.state();
    }

    return this.isFocusVisible() ? "focusVisible" : "default";
  });

  protected readonly baseClass = sideNavStyleMap.baseClass;

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

  isActive(id: string): boolean {
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

  private normalizeGroup(group: KentraSideNavGroup): NormalizedSideNavGroup | null {
    const id = this.normalizeText(group.id);
    if (id === null) {
      return null;
    }

    return {
      id,
      title: this.normalizeText(group.title ?? null),
      items: this.normalizeItems(group.items),
    };
  }

  private normalizeItems(
    items: readonly KentraSideNavItem[],
  ): readonly NormalizedSideNavItem[] {
    return items
      .map((item) => {
        const id = this.normalizeText(item.id);
        const label = this.normalizeText(item.label);
        if (id === null || label === null) {
          return null;
        }

        return {
          id,
          label,
          icon: item.icon ?? null,
          href: this.normalizeText(item.href ?? null),
          routerLink: item.routerLink ?? null,
          target: this.normalizeText(item.target ?? null),
          rel: this.resolveRel(item.rel ?? null, item.target ?? null),
          disabled: item.disabled ?? false,
        };
      })
      .filter((item): item is Exclude<typeof item, null> => item !== null);
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
