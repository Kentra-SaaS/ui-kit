import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { KentraIcon } from "../icons/icon";
import {
  DropdownMenuState,
  DropdownMenuVariant,
  dropdownMenuStyleMap,
  KentraDropdownMenuContract,
  KentraDropdownMenuGroup,
  KentraDropdownMenuItem,
  KentraElementBase,
} from "../internal";

type SelectionChangeEvent = {
  readonly value: string;
  readonly previousValue: string | null;
  readonly userTriggered: boolean;
};

let dropdownMenuInstanceCounter = 0;

@Component({
  selector: "k-dropdown-menu",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <div class="root" (focusout)="onRootFocusOut($event)">
      <button
        #triggerElement
        class="trigger"
        type="button"
        [disabled]="disabled()"
        [attr.aria-haspopup]="'menu'"
        [attr.aria-expanded]="isMenuVisible() ? 'true' : 'false'"
        [attr.aria-controls]="menuId"
        (click)="onTriggerClick()"
        (keydown)="onTriggerKeydown($event)"
      >
        <span class="trigger-label">{{ resolvedTriggerLabel() }}</span>
        <k-icon class="trigger-icon" name="caret-down" aria-hidden="true"></k-icon>
      </button>

      <div
        #panelElement
        class="panel"
        [id]="menuId"
        role="menu"
        [attr.aria-hidden]="isMenuVisible() ? 'false' : 'true'"
        (keydown)="onPanelKeydown($event)"
      >
        @for (group of resolvedGroups(); track group.id) {
          <section class="group" role="group">
            @if (group.label; as groupLabel) {
              <h4 class="group-label">{{ groupLabel }}</h4>
            }

            @for (item of group.items; track item.id) {
              <button
                class="item"
                type="button"
                role="menuitem"
                [class.is-danger]="item.danger === true"
                [class.is-active]="item.id === resolvedActiveItemId()"
                [disabled]="disabled() || item.disabled === true"
                [attr.data-menu-item-id]="item.id"
                (click)="onItemClick(item, $event)"
              >
                @if (item.icon; as iconName) {
                  <k-icon class="item-icon" [name]="iconName" aria-hidden="true"></k-icon>
                }

                <span class="item-label">{{ item.label }}</span>
              </button>
            }
          </section>
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      display: inline-block;
      max-inline-size: 100%;
    }

    .root {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      gap: var(--k-space-2);
      min-inline-size: 0;
    }

    .trigger {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--k-space-2);
      min-block-size: 2.5rem;
      min-inline-size: var(--k-dropdown-menu-panel-min-width, 14rem);
      padding-inline: var(--k-space-3);
      padding-block: var(--k-space-2);
      border: 1px solid var(--k-dropdown-menu-colors-panel-border, transparent);
      border-radius: var(--k-radius-md);
      background: var(--k-dropdown-menu-colors-panel-bg, transparent);
      color: var(--k-dropdown-menu-colors-item-text, currentColor);
      font: inherit;
      text-align: start;
      cursor: pointer;
      transition:
        border-color var(--k-dropdown-menu-motion-enter-duration, 0s)
          var(--k-dropdown-menu-motion-enter-easing, linear),
        background var(--k-dropdown-menu-motion-enter-duration, 0s)
          var(--k-dropdown-menu-motion-enter-easing, linear),
        color var(--k-dropdown-menu-motion-enter-duration, 0s)
          var(--k-dropdown-menu-motion-enter-easing, linear),
        opacity var(--k-dropdown-menu-motion-enter-duration, 0s)
          var(--k-dropdown-menu-motion-enter-easing, linear);
    }

    .trigger:focus-visible,
    :host(.is-focus-visible) .trigger {
      outline: 2px solid var(--k-dropdown-menu-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-dropdown-menu-focus-ring-color, transparent),
        var(--k-dropdown-menu-focus-shadow, none);
    }

    .trigger-label {
      min-inline-size: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .trigger-icon {
      --k-icon-font-size: var(--k-icon-size-sm);
      --k-icon-color: currentColor;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-icon-size-sm);
      block-size: var(--k-icon-size-sm);
      flex: none;
      line-height: 1;
    }

    .panel {
      box-sizing: border-box;
      position: absolute;
      inset-inline-start: 0;
      inset-block-start: calc(100% + var(--k-space-2));
      display: grid;
      gap: var(--k-space-1);
      min-inline-size: var(--k-dropdown-menu-panel-min-width, 14rem);
      max-inline-size: min(100vw - var(--k-space-4), 22rem);
      padding-block: var(--k-dropdown-menu-panel-padding-y, var(--k-space-1));
      border: var(--k-dropdown-menu-panel-border-width, 1px) solid
        var(--k-dropdown-menu-colors-panel-border, transparent);
      border-radius: var(--k-dropdown-menu-panel-border-radius, var(--k-radius-md));
      background: var(--k-dropdown-menu-colors-panel-bg, transparent);
      box-shadow: var(--k-dropdown-menu-panel-shadow, none);
      z-index: var(--k-dropdown-menu-panel-z-index, var(--k-z-index-dropdown));
      opacity: var(--k-dropdown-menu-opacity, 0);
      transform: scale(var(--k-dropdown-menu-scale, 1));
      transform-origin: top left;
      transition:
        opacity var(--k-dropdown-menu-motion-enter-duration, 0s)
          var(--k-dropdown-menu-motion-enter-easing, linear),
        transform var(--k-dropdown-menu-motion-enter-duration, 0s)
          var(--k-dropdown-menu-motion-enter-easing, linear);
      pointer-events: none;
      visibility: hidden;
    }

    :host(.is-open) .panel,
    :host(.is-focus-visible) .panel {
      pointer-events: auto;
      visibility: visible;
    }

    .group {
      display: grid;
      gap: var(--k-space-1);
      padding-inline: var(--k-space-1);
    }

    .group-label {
      margin: 0;
      padding-inline: var(--k-space-2);
      padding-block: var(--k-space-1);
      color: var(--k-color-text-secondary);
      font-family: var(--k-font-family-base);
      font-size: var(--k-typography-caption-font-size);
      line-height: var(--k-typography-caption-line-height);
      font-weight: var(--k-typography-label-font-weight);
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    .item {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--k-dropdown-menu-item-gap, var(--k-space-2));
      min-block-size: var(--k-dropdown-menu-item-min-height, var(--k-space-8));
      inline-size: 100%;
      padding-inline: var(--k-dropdown-menu-item-padding-x, var(--k-space-3));
      padding-block: var(--k-dropdown-menu-item-padding-y, var(--k-space-2));
      border: 1px solid transparent;
      border-radius: var(--k-dropdown-menu-item-radius, var(--k-radius-sm));
      background: var(--k-dropdown-menu-colors-item-bg, transparent);
      color: var(--k-dropdown-menu-colors-item-text, currentColor);
      font-family: var(--k-dropdown-menu-item-typography-family, inherit);
      font-size: var(--k-dropdown-menu-item-typography-font-size, inherit);
      line-height: var(--k-dropdown-menu-item-typography-line-height, 1.4);
      font-weight: var(--k-dropdown-menu-item-typography-font-weight, 400);
      text-align: start;
      cursor: pointer;
      transition:
        border-color var(--k-dropdown-menu-motion-enter-duration, 0s)
          var(--k-dropdown-menu-motion-enter-easing, linear),
        background var(--k-dropdown-menu-motion-enter-duration, 0s)
          var(--k-dropdown-menu-motion-enter-easing, linear),
        color var(--k-dropdown-menu-motion-enter-duration, 0s)
          var(--k-dropdown-menu-motion-enter-easing, linear),
        opacity var(--k-dropdown-menu-motion-enter-duration, 0s)
          var(--k-dropdown-menu-motion-enter-easing, linear);
    }

    .item:hover:not(:disabled) {
      background: var(--k-dropdown-menu-colors-item-hover-bg, transparent);
    }

    .item:focus-visible {
      border-color: var(--k-dropdown-menu-colors-item-focus-border, transparent);
      outline: 2px solid var(--k-dropdown-menu-focus-outline-color, transparent);
      outline-offset: 2px;
    }

    .item.is-active {
      background: var(--k-dropdown-menu-colors-item-hover-bg, transparent);
      font-weight: var(--k-typography-label-font-weight);
    }

    :host(.k-dropdown-menu--variant-danger-section) .item.is-danger {
      color: var(--k-dropdown-menu-colors-danger-text, currentColor);
    }

    :host(.k-dropdown-menu--variant-danger-section) .item.is-danger:hover:not(:disabled) {
      background: var(--k-dropdown-menu-colors-danger-hover-bg, transparent);
    }

    .item:disabled,
    :host(.is-disabled-item) .item {
      color: var(--k-dropdown-menu-colors-item-text, currentColor);
      background: var(--k-dropdown-menu-colors-item-bg, transparent);
      cursor: not-allowed;
      opacity: var(--k-dropdown-menu-disabled-opacity, 1);
    }

    .item-icon {
      --k-icon-font-size: var(--k-icon-size-sm);
      --k-icon-color: var(--k-dropdown-menu-colors-item-icon, currentColor);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-icon-size-sm);
      block-size: var(--k-icon-size-sm);
      flex: none;
      line-height: 1;
    }

    .item-label {
      min-inline-size: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :host(.is-disabled-item) .trigger,
    :host([aria-disabled='true']) .trigger {
      color: var(--k-dropdown-menu-colors-item-text, currentColor);
      background: var(--k-dropdown-menu-colors-item-bg, transparent);
      border-color: var(--k-dropdown-menu-colors-panel-border, transparent);
      cursor: not-allowed;
      opacity: var(--k-dropdown-menu-disabled-opacity, 1);
    }

    @media (max-width: 64rem) {
      .trigger {
        min-inline-size: min(100%, var(--k-dropdown-menu-panel-min-width, 14rem));
      }

      .panel {
        max-inline-size: min(100vw - var(--k-space-6), 20rem);
      }
    }

    @media (max-width: 48rem) {
      :host {
        inline-size: 100%;
      }

      .root,
      .trigger,
      .panel {
        inline-size: 100%;
      }

      .trigger {
        min-block-size: max(2.5rem, 2.75rem);
      }

      .panel {
        max-inline-size: min(100vw - var(--k-space-4), 100%);
      }

      .item {
        min-block-size: max(var(--k-dropdown-menu-item-min-height, var(--k-space-8)), 2.75rem);
      }
    }
  `,
})
export class KentraDropdownMenu
  extends KentraElementBase
  implements KentraDropdownMenuContract
{
  readonly variant = input<DropdownMenuVariant>("default");
  readonly state = input<DropdownMenuState>("closed");
  readonly activeItemId = input<string | null>(null);
  readonly triggerLabel = input<string>("Open menu");
  readonly disabled = input<boolean>(false);
  readonly closeOnSelect = input<boolean>(true);
  readonly items = input<readonly KentraDropdownMenuItem[]>([]);
  readonly groups = input<readonly KentraDropdownMenuGroup[]>([]);
  readonly opened = output<void>();
  readonly closed = output<void>();
  readonly selectionChanged = output<SelectionChangeEvent>();

  readonly menuId = `k-dropdown-menu-${++dropdownMenuInstanceCounter}`;
  readonly resolvedTriggerLabel = computed(
    () => this.normalizeText(this.triggerLabel()) ?? "Open menu",
  );
  readonly resolvedGroups = computed<readonly KentraDropdownMenuGroup[]>(() => {
    const explicitGroups = this.groups();
    if (explicitGroups.length > 0) {
      return explicitGroups;
    }

    const directItems = this.items();
    if (directItems.length === 0) {
      return [];
    }

    return [
      {
        id: "default",
        items: directItems,
      },
    ];
  });
  readonly resolvedActiveItemId = computed(
    () => this.activeItemId() ?? this.uncontrolledActiveItemId(),
  );
  readonly effectiveState = computed<DropdownMenuState>(() => {
    if (this.disabled()) {
      return "disabledItem";
    }

    return this.internalState();
  });
  readonly isMenuVisible = computed(() => {
    const state = this.effectiveState();
    return state === "open" || state === "focusVisible";
  });

  protected readonly baseClass = dropdownMenuStyleMap.baseClass;

  private readonly internalState = signal<DropdownMenuState>("closed");
  private readonly previousState = signal<DropdownMenuState>("closed");
  private readonly uncontrolledActiveItemId = signal<string | null>(null);
  private readonly triggerElement =
    viewChild<ElementRef<HTMLButtonElement>>("triggerElement");
  private readonly panelElement = viewChild<ElementRef<HTMLDivElement>>("panelElement");

  constructor() {
    super();

    effect(
      () => {
        this.internalState.set(this.state());
      },
      { allowSignalWrites: true },
    );

    effect(
      () => {
        const nextState = this.effectiveState();
        const previousState = this.previousState();

        if (nextState === previousState) {
          return;
        }

        const wasVisible = previousState === "open" || previousState === "focusVisible";
        const isVisible = nextState === "open" || nextState === "focusVisible";

        if (isVisible && !wasVisible) {
          this.opened.emit();
        }

        if (!isVisible && wasVisible) {
          this.closed.emit();
        }

        this.previousState.set(nextState);
      },
      { allowSignalWrites: true },
    );
  }

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    return {
      [this.effectiveState()]: true,
    };
  }

  onTriggerClick(): void {
    if (this.disabled() || this.effectiveState() === "disabledItem") {
      return;
    }

    this.internalState.set(this.isMenuVisible() ? "closed" : "open");
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.effectiveState() === "disabledItem") {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.internalState.set("open");
      queueMicrotask(() => {
        this.focusFirstItem();
      });
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      this.internalState.set("closed");
    }
  }

  onPanelKeydown(event: KeyboardEvent): void {
    if (!this.isMenuVisible()) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      this.internalState.set("closed");
      this.triggerElement()?.nativeElement.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.focusNextItem(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.focusNextItem(-1);
    }
  }

  onRootFocusOut(event: FocusEvent): void {
    const root = event.currentTarget as HTMLElement | null;
    const relatedTarget = event.relatedTarget;

    if (root !== null && relatedTarget instanceof Node && root.contains(relatedTarget)) {
      return;
    }

    if (this.isMenuVisible()) {
      this.internalState.set("closed");
    }
  }

  onItemClick(item: KentraDropdownMenuItem, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled() || item.disabled === true) {
      return;
    }

    const previousValue = this.resolvedActiveItemId();
    const nextValue = item.id;

    if (this.activeItemId() === null) {
      this.uncontrolledActiveItemId.set(nextValue);
    }

    this.selectionChanged.emit({
      value: nextValue,
      previousValue,
      userTriggered: true,
    });

    if (this.closeOnSelect()) {
      this.internalState.set("closed");
    }
  }

  private focusFirstItem(): void {
    const firstItem = this.getEnabledItems()[0];
    firstItem?.focus();
  }

  private focusNextItem(step: 1 | -1): void {
    const items = this.getEnabledItems();
    if (items.length === 0) {
      return;
    }

    const activeElement = document.activeElement;
    const activeIndex = items.findIndex((item) => item === activeElement);

    const nextIndex =
      activeIndex < 0
        ? 0
        : (activeIndex + step + items.length) % items.length;

    items[nextIndex]?.focus();
  }

  private getEnabledItems(): HTMLButtonElement[] {
    const panel = this.panelElement()?.nativeElement;
    if (panel === undefined) {
      return [];
    }

    return Array.from(panel.querySelectorAll<HTMLButtonElement>("[data-menu-item-id]"))
      .filter((button) => !button.disabled);
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
