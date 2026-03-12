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

interface KentraRadioGroupInputs extends KentraVariantInput<RadioGroupVariant>, KentraStateInput<RadioGroupState> {}

interface KentraRadioGroupOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraRadioGroupSlots extends KentraContentChildrenSlots<{
  options: unknown;
}> {}

export interface KentraRadioGroupContract extends KentraRadioGroupInputs, KentraRadioGroupOutputs, KentraRadioGroupSlots {}
