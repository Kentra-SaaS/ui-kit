import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";

import { KentraTable } from "../data-display/table";
import {
  KentraElementBase,
  KentraTableColumn,
  KentraTableRow,
  KentraTableRowClickValue,
  KentraTableSortChangeValue,
  KentraTableWithToolbarPatternContract,
  TableState,
  TableVariant,
  tableWithToolbarPatternStyleMap,
  TableWithToolbarPatternState,
  TableWithToolbarPatternVariant,
} from "../internal";

type SelectionChangeEvent = {
  readonly value: readonly string[];
  readonly previousValue: readonly string[] | null;
  readonly userTriggered: boolean;
};

type SortChangeEvent = {
  readonly value: KentraTableSortChangeValue;
  readonly previousValue: KentraTableSortChangeValue;
  readonly userTriggered: boolean;
};

type RowClickChangeEvent = {
  readonly value: KentraTableRowClickValue;
  readonly previousValue: KentraTableRowClickValue | null;
  readonly userTriggered: boolean;
};

type PageChangeEvent = {
  readonly value: number;
  readonly previousValue: number | null;
  readonly userTriggered: boolean;
};

@Component({
  selector: "k-table-with-toolbar-pattern",
  standalone: true,
  imports: [KentraTable],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-busy]": "resolvedState() === 'loading' ? 'true' : null",
    "[attr.aria-disabled]": "resolvedState() === 'blocked' ? 'true' : null",
  },
  template: `
    <section
      class="container"
      role="region"
      [attr.aria-label]="resolvedAriaLabel()"
    >
      <header class="header" [attr.hidden]="hasHeaderContent() ? null : ''">
        <div class="headings">
          @if (resolvedTitle(); as titleText) {
            <h3 class="title">{{ titleText }}</h3>
          }

          @if (resolvedDescription(); as descriptionText) {
            <p class="description">{{ descriptionText }}</p>
          }
        </div>
      </header>

      <div class="toolbar">
        <div class="toolbar-left">
          <ng-content select="[kTableWithToolbarLeft]"></ng-content>
        </div>

        <div class="toolbar-right">
          <ng-content select="[kTableWithToolbarRight]"></ng-content>
        </div>
      </div>

      @if (showStatusView()) {
        <article class="status">
          <div class="status-content">
            <h4 class="status-title">{{ resolvedStatusTitle() }}</h4>
            <p class="status-description">{{ resolvedStatusDescription() }}</p>
          </div>

          <div class="status-actions">
            <ng-content select="[kTableWithToolbarStatusAction]"></ng-content>

            @if (resolvedStatusActionLabel(); as actionLabelText) {
              <button
                class="status-action"
                type="button"
                (click)="onStatusActionClick($event)"
              >
                {{ actionLabelText }}
              </button>
            }
          </div>
        </article>
      } @else {
        <div class="table-shell">
          <k-table
            [variant]="resolvedTableVariant()"
            [state]="resolvedTableState()"
            [columns]="columns()"
            [rows]="rows()"
            [rowKey]="rowKey()"
            [selectable]="effectiveSelectable()"
            [rowClickable]="rowClickable()"
            [sortable]="sortable()"
            [paginated]="paginated()"
            [page]="page()"
            [pageSize]="pageSize()"
            [total]="total()"
            [siblingCount]="siblingCount()"
            [lazy]="lazy()"
            [loading]="resolvedState() === 'loading'"
            [ariaLabel]="ariaLabel()"
            (selectionChanged)="onSelectionChanged($event)"
            (rowClicked)="onRowClicked($event)"
            (sortChanged)="onSortChanged($event)"
            (pageChanged)="onPageChanged($event)"
          ></k-table>
        </div>
      }

      <footer class="footer">
        <ng-content select="[kTableWithToolbarFooter]"></ng-content>
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
      gap: var(--k-table-with-toolbar-pattern-spacing-section-gap, var(--k-space-3));
      inline-size: 100%;
      padding-inline: var(--k-table-with-toolbar-pattern-container-padding-x, var(--k-space-4));
      padding-block: var(--k-table-with-toolbar-pattern-container-padding-y, var(--k-space-4));
      border: var(--k-table-with-toolbar-pattern-container-border-width, 1px) solid
        var(--k-table-with-toolbar-pattern-colors-border, transparent);
      border-radius: var(--k-table-with-toolbar-pattern-container-border-radius, var(--k-radius-lg));
      background: var(--k-table-with-toolbar-pattern-colors-bg, transparent);
      transition:
        border-color var(--k-table-with-toolbar-pattern-motion-duration, 0s)
          var(--k-table-with-toolbar-pattern-motion-easing, linear),
        background var(--k-table-with-toolbar-pattern-motion-duration, 0s)
          var(--k-table-with-toolbar-pattern-motion-easing, linear),
        color var(--k-table-with-toolbar-pattern-motion-duration, 0s)
          var(--k-table-with-toolbar-pattern-motion-easing, linear);
    }

    .header {
      display: block;
      min-inline-size: 0;
    }

    .headings {
      display: grid;
      gap: var(--k-table-with-toolbar-pattern-spacing-header-gap, var(--k-space-2));
      min-inline-size: 0;
    }

    .title,
    .description,
    .status-title,
    .status-description {
      margin: 0;
    }

    .title {
      color: var(--k-table-with-toolbar-pattern-colors-title, currentColor);
      font-family: var(--k-table-with-toolbar-pattern-typography-title-family, inherit);
      font-size: var(--k-table-with-toolbar-pattern-typography-title-size, 1.25rem);
      line-height: var(--k-table-with-toolbar-pattern-typography-title-line-height, 1.3);
      font-weight: var(--k-table-with-toolbar-pattern-typography-title-weight, 700);
      text-wrap: balance;
    }

    .description {
      color: var(--k-table-with-toolbar-pattern-colors-description, currentColor);
      font-family: var(--k-table-with-toolbar-pattern-typography-description-family, inherit);
      font-size: var(--k-table-with-toolbar-pattern-typography-description-size, 1rem);
      line-height: var(--k-table-with-toolbar-pattern-typography-description-line-height, 1.5);
      font-weight: var(--k-table-with-toolbar-pattern-typography-description-weight, 400);
      text-wrap: pretty;
    }

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--k-table-with-toolbar-pattern-spacing-toolbar-gap, var(--k-space-2));
      padding-bottom: var(--k-space-2);
      border-bottom: 1px solid var(--k-table-with-toolbar-pattern-colors-toolbar-border, transparent);
    }

    .toolbar-left,
    .toolbar-right {
      display: inline-flex;
      align-items: center;
      gap: var(--k-table-with-toolbar-pattern-spacing-toolbar-gap, var(--k-space-2));
      min-inline-size: 0;
      flex-wrap: wrap;
    }

    .toolbar-right {
      justify-content: flex-end;
    }

    .table-shell {
      inline-size: 100%;
      min-inline-size: 0;
    }

    .status {
      box-sizing: border-box;
      display: grid;
      gap: var(--k-space-3);
      justify-items: center;
      text-align: center;
      padding-inline: var(--k-space-4);
      padding-block: var(--k-space-5);
      border: 1px solid var(--k-table-with-toolbar-pattern-colors-status-border, transparent);
      border-radius: var(--k-radius-md);
      background: var(--k-table-with-toolbar-pattern-colors-status-bg, transparent);
    }

    .status-content {
      display: grid;
      gap: var(--k-space-1);
      max-inline-size: 42rem;
    }

    .status-title {
      color: var(--k-table-with-toolbar-pattern-colors-status-title, currentColor);
      font-family: var(--k-table-with-toolbar-pattern-typography-title-family, inherit);
      font-size: var(--k-table-with-toolbar-pattern-typography-title-size, 1.25rem);
      line-height: var(--k-table-with-toolbar-pattern-typography-title-line-height, 1.3);
      font-weight: var(--k-table-with-toolbar-pattern-typography-title-weight, 700);
      text-wrap: balance;
    }

    .status-description {
      color: var(--k-table-with-toolbar-pattern-colors-status-description, currentColor);
      font-family: var(--k-table-with-toolbar-pattern-typography-description-family, inherit);
      font-size: var(--k-table-with-toolbar-pattern-typography-description-size, 1rem);
      line-height: var(--k-table-with-toolbar-pattern-typography-description-line-height, 1.5);
      font-weight: var(--k-table-with-toolbar-pattern-typography-description-weight, 400);
      text-wrap: pretty;
    }

    .status-actions {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--k-space-2);
    }

    .status-action {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-block-size: 2.5rem;
      padding-inline: var(--k-space-4);
      padding-block: var(--k-space-2);
      border: 1px solid var(--k-color-action-secondary-border);
      border-radius: var(--k-radius-md);
      background: var(--k-color-action-secondary-bg);
      color: var(--k-color-action-secondary-text);
      font-family: var(--k-font-family-base);
      font-size: var(--k-typography-label-font-size);
      line-height: var(--k-typography-label-line-height);
      font-weight: var(--k-typography-label-font-weight);
      cursor: pointer;
      transition:
        background var(--k-motion-duration-fast, 0s) var(--k-motion-ease-standard, linear),
        border-color var(--k-motion-duration-fast, 0s) var(--k-motion-ease-standard, linear),
        color var(--k-motion-duration-fast, 0s) var(--k-motion-ease-standard, linear);
    }

    .status-action:hover {
      background: var(--k-color-action-secondary-hover-bg);
      border-color: var(--k-color-action-secondary-hover-border);
      color: var(--k-color-action-secondary-hover-text);
    }

    .status-action:focus-visible {
      outline: 2px solid var(--k-color-state-focus-outline);
      outline-offset: 2px;
      box-shadow: 0 0 0 1px var(--k-color-state-focus-ring);
    }

    .footer {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: var(--k-table-with-toolbar-pattern-spacing-footer-gap, var(--k-space-3));
    }

    @media (max-width: 64rem) {
      .container {
        padding-inline: max(var(--k-table-with-toolbar-pattern-container-padding-x, var(--k-space-4)), var(--k-space-3));
      }

      .toolbar {
        flex-wrap: wrap;
      }

      .toolbar-right {
        justify-content: flex-start;
      }
    }

    @media (max-width: 48rem) {
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .status {
        padding-inline: var(--k-space-3);
      }
    }
  `,
})
export class KentraTableWithToolbarPattern
  extends KentraElementBase
  implements KentraTableWithToolbarPatternContract
{
  readonly variant = input<TableWithToolbarPatternVariant>("default");
  readonly state = input<TableWithToolbarPatternState>("default");
  readonly title = input<string | null>(null);
  readonly description = input<string | null>(null);
  readonly ariaLabel = input<string>("Data table section");

  readonly columns = input<readonly KentraTableColumn[]>([]);
  readonly rows = input<readonly KentraTableRow[]>([]);
  readonly rowKey = input<string>("id");

  readonly selectable = input<boolean>(false);
  readonly rowClickable = input<boolean>(false);
  readonly sortable = input<boolean>(false);

  readonly paginated = input<boolean>(false);
  readonly page = input<number | null>(null);
  readonly pageSize = input<number>(10);
  readonly total = input<number | null>(null);
  readonly siblingCount = input<number>(1);
  readonly lazy = input<boolean>(false);

  readonly loading = input<boolean>(false);
  readonly error = input<boolean>(false);
  readonly blocked = input<boolean>(false);

  readonly emptyTitle = input<string | null>("No data available");
  readonly emptyDescription = input<string | null>(
    "Adjust filters or add a new item to populate this table.",
  );
  readonly errorTitle = input<string | null>("Table data unavailable");
  readonly errorDescription = input<string | null>(
    "An error occurred while loading table data.",
  );
  readonly blockedTitle = input<string | null>("Access required");
  readonly blockedDescription = input<string | null>(
    "You do not currently have permission to view this table.",
  );
  readonly emptyActionLabel = input<string | null>(null);

  readonly selectionChanged = output<SelectionChangeEvent>();
  readonly rowClicked = output<RowClickChangeEvent>();
  readonly sortChanged = output<SortChangeEvent>();
  readonly pageChanged = output<PageChangeEvent>();
  readonly emptyActionClicked = output<MouseEvent>();

  readonly toolbarLeft = computed(() => undefined);
  readonly toolbarRight = computed(() => undefined);
  readonly footer = computed(() => undefined);
  readonly statusAction = computed(() => undefined);

  readonly resolvedTitle = computed(() => this.normalizeText(this.title()));
  readonly resolvedDescription = computed(() => this.normalizeText(this.description()));
  readonly resolvedAriaLabel = computed(() => this.normalizeText(this.ariaLabel()) ?? "Data table section");
  readonly hasHeaderContent = computed(
    () => this.resolvedTitle() !== null || this.resolvedDescription() !== null,
  );

  readonly resolvedState = computed<TableWithToolbarPatternState>(() => {
    if (this.state() !== "default") {
      return this.state();
    }

    if (this.blocked()) {
      return "blocked";
    }

    if (this.error()) {
      return "error";
    }

    if (this.loading()) {
      return "loading";
    }

    if (this.rows().length === 0) {
      return "empty";
    }

    return "default";
  });

  readonly resolvedTableVariant = computed<TableVariant>(() =>
    this.variant() === "dense" ? "dense" : "default",
  );

  readonly resolvedTableState = computed<TableState>(() =>
    this.resolvedState() === "loading" ? "loading" : "default",
  );

  readonly effectiveSelectable = computed(
    () => this.variant() === "selectable" || this.selectable(),
  );

  readonly showStatusView = computed(() => {
    const state = this.resolvedState();
    return state === "empty" || state === "error" || state === "blocked";
  });

  readonly resolvedStatusTitle = computed(() => {
    const state = this.resolvedState();

    if (state === "error") {
      return this.normalizeText(this.errorTitle()) ?? "Table data unavailable";
    }

    if (state === "blocked") {
      return this.normalizeText(this.blockedTitle()) ?? "Access required";
    }

    return this.normalizeText(this.emptyTitle()) ?? "No data available";
  });

  readonly resolvedStatusDescription = computed(() => {
    const state = this.resolvedState();

    if (state === "error") {
      return (
        this.normalizeText(this.errorDescription()) ??
        "An error occurred while loading table data."
      );
    }

    if (state === "blocked") {
      return (
        this.normalizeText(this.blockedDescription()) ??
        "You do not currently have permission to view this table."
      );
    }

    return (
      this.normalizeText(this.emptyDescription()) ??
      "Adjust filters or add a new item to populate this table."
    );
  });

  readonly resolvedStatusActionLabel = computed(() => {
    const state = this.resolvedState();
    if (state !== "empty") {
      return null;
    }

    return this.normalizeText(this.emptyActionLabel());
  });

  protected readonly baseClass = tableWithToolbarPatternStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    const state = this.resolvedState();

    return state === "default"
      ? {}
      : {
          [state]: true,
        };
  }

  onSelectionChanged(event: SelectionChangeEvent): void {
    this.selectionChanged.emit(event);
  }

  onRowClicked(event: RowClickChangeEvent): void {
    this.rowClicked.emit(event);
  }

  onSortChanged(event: SortChangeEvent): void {
    this.sortChanged.emit(event);
  }

  onPageChanged(event: PageChangeEvent): void {
    this.pageChanged.emit(event);
  }

  onStatusActionClick(event: MouseEvent): void {
    this.emptyActionClicked.emit(event);
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
