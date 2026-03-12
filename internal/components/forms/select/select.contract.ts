import type {
  SelectVariant,
  SelectState,
} from "./select.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildrenSlots,
} from "../../../core/contracts";

interface KentraSelectInputs extends KentraVariantInput<SelectVariant>, KentraStateInput<SelectState> {}

interface KentraSelectOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraSelectSlots extends KentraContentChildrenSlots<{
  optionGroups: unknown;
  options: unknown;
}> {}

export interface KentraSelectContract extends KentraSelectInputs, KentraSelectOutputs, KentraSelectSlots {}
