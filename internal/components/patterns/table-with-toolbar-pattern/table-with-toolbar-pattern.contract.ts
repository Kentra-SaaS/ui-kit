import type { InputSignal, OutputEmitterRef } from "@angular/core";

import type {
  KentraTableColumn,
  KentraTableRow,
  KentraTableRowClickValue,
  KentraTableSortChangeValue,
} from "../../data-display/table/table.contract";
import type {
  TableWithToolbarPatternState,
  TableWithToolbarPatternVariant,
} from "./table-with-toolbar-pattern.tokens";
import type {
  KentraChangeEvent,
  KentraContentChildSlots,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraTableWithToolbarPatternInputs
  extends KentraVariantInput<TableWithToolbarPatternVariant>,
    KentraStateInput<TableWithToolbarPatternState> {
  readonly title: InputSignal<string | null>;
  readonly description: InputSignal<string | null>;
  readonly ariaLabel: InputSignal<string>;

  readonly columns: InputSignal<readonly KentraTableColumn[]>;
  readonly rows: InputSignal<readonly KentraTableRow[]>;
  readonly rowKey: InputSignal<string>;

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
  readonly error: InputSignal<boolean>;
  readonly blocked: InputSignal<boolean>;

  readonly emptyTitle: InputSignal<string | null>;
  readonly emptyDescription: InputSignal<string | null>;
  readonly errorTitle: InputSignal<string | null>;
  readonly errorDescription: InputSignal<string | null>;
  readonly blockedTitle: InputSignal<string | null>;
  readonly blockedDescription: InputSignal<string | null>;
  readonly emptyActionLabel: InputSignal<string | null>;
}

interface KentraTableWithToolbarPatternOutputs {
  readonly selectionChanged: OutputEmitterRef<KentraChangeEvent<readonly string[]>>;
  readonly rowClicked: OutputEmitterRef<KentraChangeEvent<KentraTableRowClickValue>>;
  readonly sortChanged: OutputEmitterRef<KentraChangeEvent<KentraTableSortChangeValue>>;
  readonly pageChanged: OutputEmitterRef<KentraChangeEvent<number>>;
  readonly emptyActionClicked: OutputEmitterRef<MouseEvent>;
}

interface KentraTableWithToolbarPatternToolbarLeftSlot {}
interface KentraTableWithToolbarPatternToolbarRightSlot {}
interface KentraTableWithToolbarPatternFooterSlot {}
interface KentraTableWithToolbarPatternStatusActionSlot {}

interface KentraTableWithToolbarPatternSlots
  extends KentraContentChildSlots<{
    toolbarLeft: KentraTableWithToolbarPatternToolbarLeftSlot;
    toolbarRight: KentraTableWithToolbarPatternToolbarRightSlot;
    footer: KentraTableWithToolbarPatternFooterSlot;
    statusAction: KentraTableWithToolbarPatternStatusActionSlot;
  }> {}

export interface KentraTableWithToolbarPatternContract
  extends KentraTableWithToolbarPatternInputs,
    KentraTableWithToolbarPatternOutputs,
    KentraTableWithToolbarPatternSlots {}
