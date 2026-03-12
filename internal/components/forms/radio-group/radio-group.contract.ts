import type { InputSignal } from "@angular/core";
import type {
  RadioGroupVariant,
  RadioGroupState,
} from "./radio-group.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildrenSlots,
} from "../../../core/contracts";

interface KentraRadioGroupInputs extends KentraVariantInput<RadioGroupVariant>, KentraStateInput<RadioGroupState> {
  readonly value: InputSignal<string | null>;
}

interface KentraRadioGroupOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraRadioGroupOptionsSlot {}

interface KentraRadioGroupSlots extends KentraContentChildrenSlots<{
  options: KentraRadioGroupOptionsSlot;
}> {}

export interface KentraRadioGroupContract extends KentraRadioGroupInputs, KentraRadioGroupOutputs, KentraRadioGroupSlots {}
