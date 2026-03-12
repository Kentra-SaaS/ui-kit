import type { InputSignal } from "@angular/core";
import type {
  TableVariant,
  TableState,
} from "./table.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildrenSlots,
} from "../../../core/contracts";

interface KentraTableInputs extends KentraVariantInput<TableVariant>, KentraStateInput<TableState> {
  readonly selectedRowIds: InputSignal<readonly string[]>;
}

interface KentraTableOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraTableColumnsSlot {}

interface KentraTableSlots extends KentraContentChildrenSlots<{
  columns: KentraTableColumnsSlot;
}> {}

export interface KentraTableContract extends KentraTableInputs, KentraTableOutputs, KentraTableSlots {}
