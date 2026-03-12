import type {
  TableVariant,
  TableState,
} from "./table.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraTableInputs extends KentraVariantInput<TableVariant>, KentraStateInput<TableState> {}

interface KentraTableOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraTableContract extends KentraTableInputs, KentraTableOutputs {}
