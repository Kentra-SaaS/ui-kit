import type {
  SelectVariant,
  SelectState,
} from "./select.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraSelectInputs extends KentraVariantInput<SelectVariant>, KentraStateInput<SelectState> {}

interface KentraSelectOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraSelectContract extends KentraSelectInputs, KentraSelectOutputs {}
