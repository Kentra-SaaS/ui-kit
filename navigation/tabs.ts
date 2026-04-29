import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  viewChild,
  viewChildren,
  HostListener,
  input,
  output,
  signal,
} from "@angular/core";
import {
  KentraElementBase,
  KentraTabsContract,
  TabsState,
  TabsVariant,
  tabsStyleMap,
} from "@kentra-saas/ui-kit";

type SelectionChangeEvent = {
  readonly value: string;
  readonly previousValue: string | null;
  readonly userTriggered: boolean;
};

export interface KentraTabItem {
  readonly id: string;
  readonly label: string;
  readonly disabled?: boolean;
}

@Component({
  selector: "k-tabs",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <div
      #listElement
      class="list"
      role="tablist"
      [attr.aria-orientation]="orientation()"
      (focusin)="onFocusIn()"
      (focusout)="onFocusOut($event)"
      (scroll)="onListScroll()"
    >
      @for (item of normalizedItems(); track item.id) {
        <button
          #tabButton
          class="tab"
          type="button"
          role="tab"
          [attr.data-tab-id]="item.id"
          [id]="tabDomId(item.id)"
          [attr.aria-controls]="panelDomId(item.id)"
          [attr.aria-selected]="isSelected(item.id) ? 'true' : 'false'"
          [class.is-selected]="isSelected(item.id)"
          [disabled]="disabled() || item.disabled"
          (click)="onTabClick(item.id, $event)"
        >
          {{ item.label }}
        </button>
      }
    </div>

    @if (!lazy() || resolvedActiveTabId() !== null) {
      <div class="panels">
        <ng-content></ng-content>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
    }

    .list {
      position: relative;
      display: flex;
      align-items: stretch;
      gap: var(--k-tabs-list-gap, var(--k-space-1));
      border-bottom: var(--k-tabs-list-border-width, 1px) solid
        var(--k-tabs-colors-list-border, transparent);
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: thin;
    }

    :host(.k-tabs--variant-line) .list::after {
      content: "";
      position: absolute;
      left: var(--k-tabs-indicator-left, 0px);
      bottom: calc(-1 * var(--k-tabs-list-border-width, 1px));
      inline-size: var(--k-tabs-indicator-width, 0px);
      block-size: max(var(--k-tabs-indicator-size, 2px), 2px);
      border-radius: 999px;
      background: var(--k-tabs-colors-indicator-active, var(--k-color-link-default));
      opacity: var(--k-tabs-indicator-opacity, 0);
      pointer-events: none;
      transition:
        left var(--k-tabs-motion-duration, 0s) var(--k-tabs-motion-easing, linear),
        inline-size var(--k-tabs-motion-duration, 0s) var(--k-tabs-motion-easing, linear),
        opacity var(--k-tabs-motion-duration, 0s) var(--k-tabs-motion-easing, linear),
        background var(--k-tabs-motion-duration, 0s) var(--k-tabs-motion-easing, linear);
    }

    .tab {
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-block-size: var(--k-tabs-trigger-min-height, var(--k-space-10));
      padding-inline: var(--k-tabs-trigger-padding-x, var(--k-space-3));
      padding-block: var(--k-tabs-trigger-padding-y, var(--k-space-2));
      border: 0;
      border-radius: var(--k-tabs-trigger-radius, var(--k-radius-md));
      background: transparent;
      color: var(--k-tabs-colors-text, currentColor);
      font-family: var(--k-tabs-trigger-typography-family, inherit);
      font-size: var(--k-tabs-trigger-typography-font-size, inherit);
      line-height: var(--k-tabs-trigger-typography-line-height, normal);
      font-weight: var(--k-tabs-trigger-typography-font-weight, 600);
      white-space: nowrap;
      cursor: pointer;
      transition:
        background var(--k-tabs-motion-duration, 0s)
          var(--k-tabs-motion-easing, linear),
        color var(--k-tabs-motion-duration, 0s) var(--k-tabs-motion-easing, linear),
        border-color var(--k-tabs-motion-duration, 0s)
          var(--k-tabs-motion-easing, linear);
    }

    .tab:hover:not(:disabled) {
      color: var(--k-tabs-colors-text-hover, var(--k-color-text-primary));
      background: var(
        --k-tabs-colors-hover-bg,
        var(--k-color-state-hover-overlay, var(--k-color-bg-subtle, rgba(15, 23, 42, 0.08)))
      );
    }

    :host(.k-tabs--variant-line) .tab {
      margin-bottom: calc(-1 * var(--k-tabs-list-border-width, 1px));
      border-bottom: var(--k-tabs-list-border-width, 1px) solid transparent;
      border-radius: 0;
      background: var(--k-tabs-colors-bg, transparent);
    }

    :host(.k-tabs--variant-line) .tab.is-selected,
    :host(.k-tabs--variant-line) .tab[aria-selected="true"] {
      color: var(--k-tabs-colors-text-active, var(--k-color-text-primary));
      font-weight: var(--k-tabs-trigger-typography-font-weight-active, 700);
    }

    :host(.k-tabs--variant-line) .tab:hover:not(:disabled) {
      color: var(--k-tabs-colors-text-hover, var(--k-color-text-primary));
    }

    :host(.k-tabs--variant-pill) .tab {
      border: 1px solid transparent;
      background: transparent;
    }

    :host(.k-tabs--variant-pill) .tab.is-selected,
    :host(.k-tabs--variant-pill) .tab[aria-selected="true"] {
      color: var(--k-tabs-colors-text-active, var(--k-color-state-selected-text));
      background: var(--k-tabs-colors-indicator-active, var(--k-color-state-selected-bg));
    }

    .tab:focus-visible {
      outline: 2px solid var(--k-tabs-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-tabs-focus-ring-color, transparent),
        var(--k-tabs-focus-shadow, none);
    }

    .tab:disabled {
      cursor: not-allowed;
      opacity: var(--k-tabs-disabled-opacity, 0.56);
    }

    .panels {
      margin-top: var(--k-space-3);
      min-inline-size: 0;
    }

    :host([aria-disabled="true"]) .tab {
      pointer-events: none;
      cursor: not-allowed;
      opacity: var(--k-tabs-disabled-opacity, 0.56);
    }

    :host(.is-disabled) .tab {
      pointer-events: none;
      cursor: not-allowed;
      opacity: var(--k-tabs-disabled-opacity, 0.56);
    }

    @media (max-width: 64rem) {
      .tab {
        padding-inline: max(var(--k-tabs-trigger-padding-x, var(--k-space-3)), var(--k-space-2));
      }
    }

    @media (max-width: 48rem) {
      .tab {
        min-block-size: max(var(--k-tabs-trigger-min-height, var(--k-space-10)), 2.75rem);
      }

      .panels {
        margin-top: var(--k-space-2);
      }
    }
  `,
})
export class KentraTabs
  extends KentraElementBase
  implements KentraTabsContract, AfterViewInit
{
  readonly variant = input<TabsVariant>("line");
  readonly state = input<TabsState>("default");
  readonly items = input<readonly KentraTabItem[]>([]);
  readonly activeTabId = input<string | null>(null);
  readonly orientation = input<"horizontal" | "vertical">("horizontal");
  readonly lazy = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly selectionChanged = output<SelectionChangeEvent>();

  readonly normalizedItems = computed(() =>
    this.items()
      .map((item) => ({
        id: this.normalizeText(item.id),
        label: this.normalizeText(item.label),
        disabled: item.disabled ?? false,
      }))
      .filter(
        (
          item,
        ): item is { readonly id: string; readonly label: string; readonly disabled: boolean } =>
          item.id !== null && item.label !== null,
      ),
  );
  readonly normalizedActiveTabId = computed(() =>
    this.normalizeText(this.activeTabId()),
  );
  readonly resolvedActiveTabId = computed(() => {
    const explicitActiveTabId = this.normalizedActiveTabId();
    if (explicitActiveTabId !== null) {
      return explicitActiveTabId;
    }

    const uncontrolledActiveTabId = this.uncontrolledActiveTabId();
    if (uncontrolledActiveTabId !== null) {
      return uncontrolledActiveTabId;
    }

    return this.normalizedItems().find((item) => !item.disabled)?.id ?? null;
  });
  readonly effectiveState = computed<TabsState>(() => {
    if (this.disabled() || this.state() === "disabled") {
      return "disabled";
    }

    if (this.state() !== "default") {
      return this.state();
    }

    return this.isFocusVisible() ? "focusVisible" : "default";
  });

  protected readonly baseClass = tabsStyleMap.baseClass;

  private readonly isFocusVisible = signal(false);
  private readonly uncontrolledActiveTabId = signal<string | null>(null);
  private readonly indicatorLeft = signal(0);
  private readonly indicatorWidth = signal(0);
  private readonly indicatorVisible = signal(false);
  private readonly listElement = viewChild<ElementRef<HTMLDivElement>>("listElement");
  private readonly tabButtons =
    viewChildren<ElementRef<HTMLButtonElement>>("tabButton");
  private indicatorFrameId: number | null = null;

  constructor() {
    super();

    effect(() => {
      this.variant();
      this.orientation();
      this.resolvedActiveTabId();
      this.normalizedItems();
      this.tabButtons();
      this.scheduleIndicatorUpdate();
    });
  }

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

  protected override cssVars() {
    return {
      "--k-tabs-indicator-left": `${this.indicatorLeft()}px`,
      "--k-tabs-indicator-width": `${this.indicatorWidth()}px`,
      "--k-tabs-indicator-opacity": this.indicatorVisible() ? 1 : 0,
    };
  }

  ngAfterViewInit(): void {
    this.scheduleIndicatorUpdate();
  }

  isSelected(id: string): boolean {
    return this.resolvedActiveTabId() === id;
  }

  onTabClick(id: string, event: MouseEvent): void {
    const targetItem = this.normalizedItems().find((item) => item.id === id);
    if (targetItem === undefined || this.disabled() || targetItem.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const previousValue = this.resolvedActiveTabId();

    if (this.normalizedActiveTabId() === null) {
      this.uncontrolledActiveTabId.set(id);
    }

    this.scheduleIndicatorUpdate();
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

  onListScroll(): void {
    this.updateIndicator();
  }

  @HostListener("window:resize")
  onWindowResize(): void {
    this.scheduleIndicatorUpdate();
  }

  tabDomId(id: string): string {
    return `k-tab-${id}`;
  }

  panelDomId(id: string): string {
    return `k-tab-panel-${id}`;
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }

  private scheduleIndicatorUpdate(): void {
    if (this.indicatorFrameId !== null) {
      cancelAnimationFrame(this.indicatorFrameId);
    }

    this.indicatorFrameId = requestAnimationFrame(() => {
      this.indicatorFrameId = null;
      this.updateIndicator();
    });
  }

  private updateIndicator(): void {
    if (this.variant() !== "line" || this.orientation() !== "horizontal") {
      this.resetIndicator();
      return;
    }

    const activeTabId = this.resolvedActiveTabId();
    if (activeTabId === null) {
      this.resetIndicator();
      return;
    }

    const buttonElement = this.tabButtons()
      .map((entry) => entry.nativeElement)
      .find((element) => element.dataset["tabId"] === activeTabId);

    if (buttonElement === undefined) {
      this.resetIndicator();
      return;
    }

    this.indicatorLeft.set(buttonElement.offsetLeft);
    this.indicatorWidth.set(buttonElement.offsetWidth);
    this.indicatorVisible.set(buttonElement.offsetWidth > 0);
  }

  private resetIndicator(): void {
    this.indicatorLeft.set(0);
    this.indicatorWidth.set(0);
    this.indicatorVisible.set(false);
  }
}
