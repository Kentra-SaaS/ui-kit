import type {
  TextInputVariant,
  TextInputState,
} from "../../../tokens/components";
import type {
  KentraBlurOutput,
  KentraFocusOutput,
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../core";

interface KentraTextInputInputs extends KentraVariantInput<TextInputVariant>, KentraStateInput<TextInputState> {}

interface KentraTextInputOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

export interface KentraTextInputContract extends KentraTextInputInputs, KentraTextInputOutputs {}
