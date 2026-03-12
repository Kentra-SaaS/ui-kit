import type {
  RadioGroupVariant,
  RadioGroupState,
} from "../../../tokens/components";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraRadioGroupInputs extends KentraVariantInput<RadioGroupVariant>, KentraStateInput<RadioGroupState> {}

interface KentraRadioGroupOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraRadioGroupContract extends KentraRadioGroupInputs, KentraRadioGroupOutputs {}
