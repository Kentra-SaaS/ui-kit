import type { InputSignal } from "@angular/core";
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

interface KentraSelectInputs extends KentraVariantInput<SelectVariant>, KentraStateInput<SelectState> {
  readonly value: InputSignal<string | null>;
}

interface KentraSelectOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraSelectOptionGroupsSlot {}
interface KentraSelectOptionsSlot {}

interface KentraSelectSlots extends KentraContentChildrenSlots<{
  optionGroups: KentraSelectOptionGroupsSlot;
  options: KentraSelectOptionsSlot;
}> {}

export interface KentraSelectContract extends KentraSelectInputs, KentraSelectOutputs, KentraSelectSlots {}
