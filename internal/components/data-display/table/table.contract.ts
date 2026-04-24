import type { InputSignal, OutputEmitterRef } from "@angular/core";
import type {
  TableVariant,
  TableState,
} from "./table.tokens";
import type {
  KentraChangeEvent,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

export interface KentraTableColumn {
  readonly id: string;
  readonly label: string;
  readonly field?: string;
  readonly sortable?: boolean;
  readonly align?: "start" | "center" | "end";
}

export type KentraTableRow = Readonly<Record<string, unknown>>;
export type KentraTableSortDirection = "asc" | "desc";

export interface KentraTableSortValue {
  readonly columnId: string;
  readonly direction: KentraTableSortDirection;
}

export type KentraTableSortChangeValue = KentraTableSortValue | null;

export interface KentraTableRowClickValue {
  readonly rowId: string;
  readonly row: KentraTableRow;
}

interface KentraTableInputs extends KentraVariantInput<TableVariant>, KentraStateInput<TableState> {
  readonly columns: InputSignal<readonly KentraTableColumn[]>;
  readonly rows: InputSignal<readonly KentraTableRow[]>;
  readonly rowKey: InputSignal<string>;
  readonly selectedRowIds: InputSignal<readonly string[] | null>;
  readonly selectable: InputSignal<boolean>;
  readonly rowClickable: InputSignal<boolean>;
  readonly sortable: InputSignal<boolean>;
  readonly paginated: InputSignal<boolean>;
  readonly page: InputSignal<number | null>;
  readonly pageSize: InputSignal<number>;
  readonly total: InputSignal<number | null>;
  readonly siblingCount: InputSignal<number>;
  readonly lazy: InputSignal<boolean>;
  readonly loading: InputSignal<boolean>;
  readonly ariaLabel: InputSignal<string>;
}

interface KentraTableOutputs {
  readonly selectionChanged: OutputEmitterRef<KentraChangeEvent<readonly string[]>>;
  readonly rowClicked: OutputEmitterRef<KentraChangeEvent<KentraTableRowClickValue>>;
  readonly sortChanged: OutputEmitterRef<KentraChangeEvent<KentraTableSortChangeValue>>;
  readonly pageChanged: OutputEmitterRef<KentraChangeEvent<number>>;
}

interface KentraTableSlots {}

export interface KentraTableContract extends KentraTableInputs, KentraTableOutputs, KentraTableSlots {}
