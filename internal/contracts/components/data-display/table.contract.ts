import type {
  TableVariant,
  TableState,
} from "../../../tokens/components";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraTableInputs extends KentraVariantInput<TableVariant>, KentraStateInput<TableState> {}

interface KentraTableOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraTableContract extends KentraTableInputs, KentraTableOutputs {}
