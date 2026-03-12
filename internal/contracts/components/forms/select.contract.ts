import type {
  SelectVariant,
  SelectState,
} from "../../../tokens/components";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraSelectInputs extends KentraVariantInput<SelectVariant>, KentraStateInput<SelectState> {}

interface KentraSelectOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraSelectContract extends KentraSelectInputs, KentraSelectOutputs {}
