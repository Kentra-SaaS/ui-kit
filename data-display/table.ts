import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from "@angular/core";
import { KentraPagination } from "../navigation/pagination";
import {
  KentraElementBase,
  KentraTableColumn,
  KentraTableContract,
  KentraTableRow,
  KentraTableRowClickValue,
  KentraTableSortChangeValue,
  KentraTableSortDirection,
  TableState,
  TableVariant,
  tableStyleMap,
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

type ResolvedRow = {
  readonly id: string;
  readonly data: KentraTableRow;
};

type NormalizedColumn = {
  readonly id: string;
  readonly label: string;
  readonly field: string | null;
  readonly sortable: boolean;
  readonly align: "start" | "center" | "end";
};

@Component({
  selector: "k-table",
  standalone: true,
  imports: [KentraPagination],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-busy]": "isLoadingState() ? 'true' : null",
  },
  template: `
    <div class="container">
      <table class="table" [attr.aria-label]="ariaLabel()">
        <thead class="head">
          <tr>
            @if (selectable()) {
              <th class="header-cell selection-cell">
                <input
                  class="selection-toggle"
                  type="checkbox"
                  [checked]="areAllRowsSelected()"
                  [indeterminate]="isRowSelectionMixed()"
                  [disabled]="isLoadingState() || resolvedRows().length === 0"
                  aria-label="Alle Zeilen auswaehlen"
                  (click)="$event.stopPropagation()"
                  (change)="onToggleSelectAll($event)"
                />
              </th>
            }

            @for (column of normalizedColumns(); track column.id) {
              <th
                class="header-cell"
                [class.is-sortable]="isColumnSortable(column)"
                [class.align-center]="column.align === 'center'"
                [class.align-end]="column.align === 'end'"
                [attr.aria-sort]="sortAria(column.id)"
              >
                @if (isColumnSortable(column)) {
                  <button class="sort-trigger" type="button" (click)="onSort(column)">
                    <span>{{ column.label }}</span>
                    @if (activeSortColumnId() === column.id && activeSortDirection(); as direction) {
                      <span class="sort-indicator" aria-hidden="true">
                        {{ direction === "asc" ? "↑" : "↓" }}
                      </span>
                    }
                  </button>
                } @else {
                  <span>{{ column.label }}</span>
                }
              </th>
            }
          </tr>
        </thead>

        <tbody class="body">
          @if (isLoadingState()) {
            @for (_ of loadingRows(); track $index) {
              <tr class="row is-loading">
                @if (selectable()) {
                  <td class="cell selection-cell">
                    <span class="skeleton skeleton-selection" aria-hidden="true"></span>
                  </td>
                }

                @for (column of normalizedColumns(); track column.id) {
                  <td class="cell">
                    <span class="skeleton" aria-hidden="true"></span>
                  </td>
                }
              </tr>
            }
          } @else if (visibleRows().length === 0) {
            <tr class="row is-empty">
              <td class="cell empty-cell" [attr.colspan]="columnCount()">
                Keine Daten vorhanden.
              </td>
            </tr>
          } @else {
            @for (row of visibleRows(); track row.id) {
              <tr
                class="row"
                [class.is-selected]="isRowSelected(row.id)"
                [class.is-clickable]="isRowClickable()"
                (click)="onRowClick(row, $event)"
              >
                @if (selectable()) {
                  <td class="cell selection-cell">
                    <input
                      class="selection-toggle"
                      type="checkbox"
                      [checked]="isRowSelected(row.id)"
                      [disabled]="isLoadingState()"
                      [attr.aria-label]="'Zeile auswaehlen: ' + row.id"
                      (click)="$event.stopPropagation()"
                      (change)="onToggleRowSelection(row.id, $event)"
                    />
                  </td>
                }

                @for (column of normalizedColumns(); track column.id) {
                  <td class="cell" [class.align-center]="column.align === 'center'" [class.align-end]="column.align === 'end'">
                    {{ resolveCellValue(row.data, column) }}
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>

    @if (showPagination()) {
      <div class="pagination-shell">
        <k-pagination
          variant="default"
          [page]="currentPage()"
          [pageSize]="resolvedPageSize()"
          [total]="effectiveTotal()"
          [siblingCount]="resolvedSiblingCount()"
          [disabled]="isLoadingState()"
          (valueChanged)="onPageChange($event.value)"
        />
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
      max-inline-size: 100%;
    }

    .container {
      inline-size: 100%;
      overflow: auto;
      border-radius: var(--k-table-table-border-radius, var(--k-radius-md));
      border: var(--k-table-table-border-width, 1px) solid
        var(--k-table-colors-row-border, transparent);
      background: var(--k-table-colors-bg, transparent);
    }

    .table {
      inline-size: 100%;
      border-collapse: separate;
      border-spacing: 0;
      min-inline-size: 34rem;
    }

    .header-cell,
    .cell {
      padding-inline: var(--k-table-cell-padding-x, var(--k-space-3));
      padding-block: var(--k-table-cell-padding-y, var(--k-space-2));
      text-align: start;
      vertical-align: middle;
    }

    .header-cell {
      background: var(--k-table-colors-header-bg, transparent);
      color: var(--k-table-colors-header-text, currentColor);
      font-family: var(--k-table-header-font-family, inherit);
      font-size: var(--k-table-header-font-size, 0.875rem);
      line-height: var(--k-table-header-line-height, 1.3);
      font-weight: var(--k-table-header-font-weight, 600);
      border-bottom: var(--k-table-table-border-width, 1px) solid
        var(--k-table-colors-row-border, transparent);
      white-space: nowrap;
    }

    .selection-cell {
      inline-size: 2.5rem;
      width: 2.5rem;
      text-align: center;
      padding-inline: var(--k-space-2);
    }

    .selection-toggle {
      display: block;
      margin-inline: auto;
      margin-block: 0;
      inline-size: 1rem;
      block-size: 1rem;
      accent-color: var(--k-color-link-default);
      cursor: pointer;
    }

    .selection-toggle:disabled {
      cursor: not-allowed;
    }

    .cell {
      color: var(--k-table-colors-row-text, currentColor);
      font-family: var(--k-table-cell-font-family, inherit);
      font-size: var(--k-table-cell-font-size, 0.875rem);
      line-height: var(--k-table-cell-line-height, 1.5);
      font-weight: var(--k-table-cell-font-weight, 400);
      border-bottom: var(--k-table-table-border-width, 1px) solid
        var(--k-table-colors-row-border, transparent);
    }

    .row:last-child .cell {
      border-bottom: 0;
    }

    .row {
      transition:
        background var(--k-table-motion-duration, 0s) var(--k-table-motion-easing, linear),
        color var(--k-table-motion-duration, 0s) var(--k-table-motion-easing, linear);
    }

    .row.is-clickable:hover:not(.is-selected) {
      background: var(--k-table-colors-row-hover-bg, transparent);
    }

    .row.is-selected {
      background: var(--k-table-colors-row-selected-bg, transparent);
    }

    :host(.k-table--variant-striped) .row:nth-child(odd) {
      background: var(--k-table-colors-odd-row-bg, transparent);
    }

    :host(.k-table--variant-striped) .row:nth-child(even) {
      background: var(--k-table-colors-even-row-bg, transparent);
    }

    :host(.k-table--variant-striped) .row.is-selected {
      background: var(--k-table-colors-row-selected-bg, transparent);
    }

    .row.is-clickable {
      cursor: pointer;
    }

    .sort-trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--k-space-1);
      padding: 0;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }

    .sort-trigger:focus-visible {
      outline: 2px solid var(--k-table-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-table-focus-ring-color, transparent),
        var(--k-table-focus-shadow, none);
    }

    .sort-indicator {
      font-size: 0.75em;
      line-height: 1;
    }

    .align-center {
      text-align: center;
    }

    .align-end {
      text-align: end;
    }

    .empty-cell {
      text-align: center;
      color: var(--k-table-colors-row-text, currentColor);
      font-style: italic;
    }

    .skeleton {
      display: inline-block;
      inline-size: min(80%, 12rem);
      block-size: 0.875rem;
      border-radius: var(--k-radius-xs);
      background: var(--k-table-colors-skeleton, var(--k-color-border-default));
      opacity: 0.65;
    }

    .skeleton-selection {
      inline-size: 1rem;
      block-size: 1rem;
    }

    .pagination-shell {
      display: flex;
      justify-content: flex-end;
      margin-top: var(--k-space-3);
      
      k-pagination {
        width: auto;
      }
    }

    @media (max-width: 64rem) {
      .table {
        min-inline-size: 30rem;
      }
    }

    @media (max-width: 48rem) {
      .table {
        min-inline-size: 26rem;
      }

      .header-cell,
      .cell {
        padding-inline: max(var(--k-table-cell-padding-x, var(--k-space-3)), var(--k-space-2));
      }
    }
  `,
})
export class KentraTable extends KentraElementBase implements KentraTableContract {
  readonly variant = input<TableVariant>("default");
  readonly state = input<TableState>("default");
  readonly columns = input<readonly KentraTableColumn[]>([]);
  readonly rows = input<readonly KentraTableRow[]>([]);
  readonly rowKey = input<string>("id");
  readonly selectedRowIds = input<readonly string[] | null>(null);
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
  readonly ariaLabel = input<string>("Data table");
  readonly selectionChanged = output<SelectionChangeEvent>();
  readonly rowClicked = output<RowClickChangeEvent>();
  readonly sortChanged = output<SortChangeEvent>();
  readonly pageChanged = output<PageChangeEvent>();

  readonly normalizedColumns = computed<readonly NormalizedColumn[]>(() =>
    this.columns()
      .map((column) => {
        const id = this.normalizeText(column.id);
        const label = this.normalizeText(column.label);
        if (id === null || label === null) {
          return null;
        }

        return {
          id,
          label,
          field: this.normalizeText(column.field ?? null),
          sortable: column.sortable ?? false,
          align: column.align ?? "start",
        };
      })
      .filter((column): column is NormalizedColumn => column !== null),
  );

  readonly resolvedRows = computed<readonly ResolvedRow[]>(() => {
    const rowKey = this.normalizeText(this.rowKey()) ?? "id";

    return this.rows().map((row, index) => {
      const candidateId = row[rowKey];
      const resolvedId =
        typeof candidateId === "string"
          ? this.normalizeText(candidateId)
          : candidateId !== undefined && candidateId !== null
            ? String(candidateId)
            : null;

      return {
        id: resolvedId ?? `row-${index}`,
        data: row,
      };
    });
  });

  readonly resolvedSelectedRowIds = computed<readonly string[]>(() =>
    this.uncontrolledSelectedRowIds(),
  );

  readonly activeSortColumnId = computed(() => this.uncontrolledSort()?.columnId ?? null);
  readonly activeSortDirection = computed<KentraTableSortDirection | null>(
    () => this.uncontrolledSort()?.direction ?? null,
  );

  readonly sortedRows = computed<readonly ResolvedRow[]>(() => {
    const rows = [...this.resolvedRows()];
    const sort = this.uncontrolledSort();

    if (sort === null) {
      return rows;
    }

    const column = this.normalizedColumns().find((entry) => entry.id === sort.columnId);
    if (column === undefined) {
      return rows;
    }

    const field = column.field ?? column.id;

    rows.sort((left, right) =>
      this.compareCellValues(left.data[field], right.data[field], sort.direction),
    );

    return rows;
  });

  readonly resolvedPageSize = computed(() => Math.max(1, Math.trunc(this.pageSize())));
  readonly resolvedSiblingCount = computed(() => Math.max(0, Math.trunc(this.siblingCount())));

  readonly effectiveTotal = computed(() => {
    if (!this.paginated()) {
      return this.sortedRows().length;
    }

    if (this.lazy()) {
      return this.normalizeCount(this.total() ?? this.rows().length);
    }

    return this.sortedRows().length;
  });

  readonly totalPages = computed(() => {
    const pages = Math.ceil(this.effectiveTotal() / this.resolvedPageSize());
    return Math.max(1, pages);
  });

  readonly currentPage = computed(() => {
    const controlledPage = this.page();
    const candidatePage = controlledPage ?? this.uncontrolledPage();
    return this.clampPage(candidatePage, this.totalPages());
  });

  readonly visibleRows = computed<readonly ResolvedRow[]>(() => {
    const rows = this.sortedRows();

    if (!this.paginated()) {
      return rows;
    }

    if (this.lazy()) {
      return rows;
    }

    const pageSize = this.resolvedPageSize();
    const page = this.currentPage();
    const start = (page - 1) * pageSize;

    return rows.slice(start, start + pageSize);
  });

  readonly allRowIds = computed(() => this.resolvedRows().map((row) => row.id));

  readonly areAllRowsSelected = computed(() => {
    const rowIds = this.allRowIds();
    if (rowIds.length === 0) {
      return false;
    }

    const selection = new Set(this.resolvedSelectedRowIds());
    return rowIds.every((rowId) => selection.has(rowId));
  });

  readonly isRowSelectionMixed = computed(() => {
    const rowIds = this.allRowIds();
    if (rowIds.length === 0) {
      return false;
    }

    const selection = new Set(this.resolvedSelectedRowIds());
    const selectedCount = rowIds.reduce(
      (count, rowId) => (selection.has(rowId) ? count + 1 : count),
      0,
    );

    return selectedCount > 0 && selectedCount < rowIds.length;
  });

  readonly columnCount = computed(() =>
    this.normalizedColumns().length + (this.selectable() ? 1 : 0),
  );

  readonly loadingRows = computed(() =>
    Array.from({ length: Math.max(3, Math.min(5, this.resolvedPageSize())) }),
  );

  readonly isLoadingState = computed(() =>
    this.state() === "loading" || this.loading(),
  );

  readonly isEmptyState = computed(() =>
    !this.isLoadingState() && this.visibleRows().length === 0,
  );

  readonly isRowClickable = computed(
    () => this.rowClickable() && !this.isLoadingState(),
  );

  readonly effectiveState = computed<TableState>(() => {
    if (this.state() !== "default") {
      return this.state();
    }

    if (this.isLoadingState()) {
      return "loading";
    }

    if (this.isEmptyState()) {
      return "empty";
    }

    return "default";
  });

  readonly showPagination = computed(
    () => this.paginated() && this.totalPages() > 1,
  );

  protected readonly baseClass = tableStyleMap.baseClass;

  private readonly uncontrolledSelectedRowIds = signal<readonly string[]>([]);
  private readonly uncontrolledSort = signal<KentraTableSortChangeValue>(null);
  private readonly uncontrolledPage = signal(1);
  private readonly lastClickedRow = signal<KentraTableRowClickValue | null>(null);
  private readonly lastSyncedExternalSelectionKey = signal<string | null>(null);

  constructor() {
    super();

    // Sync optional external selection input into the local runtime selection model.
    // We only apply when the external selection content actually changes, so local
    // user interactions are not overwritten by repeated equivalent input writes.
    effect(() => {
      const externalSelection = this.selectedRowIds();
      if (externalSelection === null) {
        return;
      }

      const normalizedExternalSelection = this.normalizeSelection(externalSelection);
      const externalSelectionKey = this.selectionKey(normalizedExternalSelection);
      if (this.lastSyncedExternalSelectionKey() === externalSelectionKey) {
        return;
      }

      this.lastSyncedExternalSelectionKey.set(externalSelectionKey);
      this.uncontrolledSelectedRowIds.set(normalizedExternalSelection);
    });
  }

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    const state = this.effectiveState();
    return state === "default" ? {} : { [state]: true };
  }

  isColumnSortable(column: { readonly sortable: boolean }): boolean {
    return this.sortable() && column.sortable;
  }

  isRowSelected(rowId: string): boolean {
    return this.resolvedSelectedRowIds().includes(rowId);
  }

  sortAria(columnId: string): "ascending" | "descending" | "none" | null {
    const activeSort = this.uncontrolledSort();
    const column = this.normalizedColumns().find((entry) => entry.id === columnId);
    if (column === undefined || !this.isColumnSortable(column)) {
      return null;
    }

    if (activeSort?.columnId !== columnId) {
      return "none";
    }

    return activeSort.direction === "asc" ? "ascending" : "descending";
  }

  onRowClick(row: ResolvedRow, event: MouseEvent): void {
    if (!this.isRowClickable()) {
      return;
    }

    const previousValue = this.lastClickedRow();
    const nextValue: KentraTableRowClickValue = {
      rowId: row.id,
      row: row.data,
    };

    this.lastClickedRow.set(nextValue);
    this.rowClicked.emit({
      value: nextValue,
      previousValue,
      userTriggered: true,
    });

    event.stopPropagation();
  }

  onToggleRowSelection(rowId: string, event: Event): void {
    if (!this.selectable() || this.isLoadingState()) {
      return;
    }

    const target = event.target as HTMLInputElement | null;
    if (target === null) {
      return;
    }

    this.applyRowSelection(rowId, target.checked);
    event.stopPropagation();
  }

  onToggleSelectAll(event: Event): void {
    if (!this.selectable() || this.isLoadingState()) {
      return;
    }

    const target = event.target as HTMLInputElement | null;
    if (target === null) {
      return;
    }

    const previousSelection = this.resolvedSelectedRowIds();
    const nextSelectionSet = new Set(previousSelection);

    for (const rowId of this.allRowIds()) {
      if (target.checked) {
        nextSelectionSet.add(rowId);
      } else {
        nextSelectionSet.delete(rowId);
      }
    }

    this.commitSelection([...nextSelectionSet], previousSelection);
    event.stopPropagation();
  }

  onSort(column: { readonly id: string; readonly sortable: boolean }): void {
    if (!this.isColumnSortable(column)) {
      return;
    }

    const previousSort = this.uncontrolledSort();

    let nextSort: KentraTableSortChangeValue;
    if (previousSort?.columnId !== column.id) {
      nextSort = {
        columnId: column.id,
        direction: "asc",
      };
    } else if (previousSort.direction === "asc") {
      nextSort = {
        columnId: column.id,
        direction: "desc",
      };
    } else {
      nextSort = null;
    }

    this.uncontrolledSort.set(nextSort);
    this.sortChanged.emit({
      value: nextSort,
      previousValue: previousSort,
      userTriggered: true,
    });
  }

  onPageChange(nextPage: number): void {
    if (!this.paginated()) {
      return;
    }

    const previousPage = this.currentPage();
    const clampedNextPage = this.clampPage(nextPage, this.totalPages());
    if (clampedNextPage === previousPage) {
      return;
    }

    if (this.page() === null) {
      this.uncontrolledPage.set(clampedNextPage);
    }

    this.pageChanged.emit({
      value: clampedNextPage,
      previousValue: previousPage,
      userTriggered: true,
    });
  }

  resolveCellValue(row: KentraTableRow, column: { readonly id: string; readonly field: string | null }): string {
    const field = column.field ?? column.id;
    const value = row[field];

    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "string") {
      return value;
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }

    if (value instanceof Date) {
      return value.toLocaleString();
    }

    return String(value);
  }

  private applyRowSelection(rowId: string, checked: boolean): void {
    const previousSelection = this.resolvedSelectedRowIds();
    const nextSelectionSet = new Set(previousSelection);

    if (checked) {
      nextSelectionSet.add(rowId);
    } else {
      nextSelectionSet.delete(rowId);
    }

    this.commitSelection([...nextSelectionSet], previousSelection);
  }

  private commitSelection(nextSelection: readonly string[], previousSelection: readonly string[]): void {
    this.uncontrolledSelectedRowIds.set(this.normalizeSelection(nextSelection));

    this.selectionChanged.emit({
      value: this.uncontrolledSelectedRowIds(),
      previousValue: previousSelection,
      userTriggered: true,
    });
  }

  private compareCellValues(
    left: unknown,
    right: unknown,
    direction: KentraTableSortDirection,
  ): number {
    const leftSortable = this.toSortableValue(left);
    const rightSortable = this.toSortableValue(right);

    const factor = direction === "asc" ? 1 : -1;

    if (leftSortable < rightSortable) {
      return -1 * factor;
    }

    if (leftSortable > rightSortable) {
      return 1 * factor;
    }

    return 0;
  }

  private toSortableValue(value: unknown): number | string {
    if (typeof value === "number") {
      return value;
    }

    if (typeof value === "string") {
      return value.toLocaleLowerCase();
    }

    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }

    if (value instanceof Date) {
      return value.getTime();
    }

    return String(value ?? "").toLocaleLowerCase();
  }

  private normalizeCount(value: number): number {
    return Math.max(0, Math.trunc(value));
  }

  private clampPage(value: number, max: number): number {
    return Math.min(max, Math.max(1, Math.trunc(value)));
  }

  private normalizeSelection(selection: readonly string[]): readonly string[] {
    return [...new Set(selection)];
  }

  private selectionKey(selection: readonly string[]): string {
    return [...selection].sort((left, right) => left.localeCompare(right)).join("::");
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
