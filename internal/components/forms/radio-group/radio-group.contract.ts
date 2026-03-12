import type {
  RadioGroupVariant,
  RadioGroupState,
} from "./radio-group.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraRadioGroupInputs extends KentraVariantInput<RadioGroupVariant>, KentraStateInput<RadioGroupState> {}

interface KentraRadioGroupOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraRadioGroupContract extends KentraRadioGroupInputs, KentraRadioGroupOutputs {}
