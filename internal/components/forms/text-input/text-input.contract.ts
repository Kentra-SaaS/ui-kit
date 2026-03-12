import type {
  TextInputVariant,
  TextInputState,
} from "./text-input.tokens";
import type {
  KentraBlurOutput,
  KentraFocusOutput,
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraTextInputInputs extends KentraVariantInput<TextInputVariant>, KentraStateInput<TextInputState> {}

interface KentraTextInputOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

export interface KentraTextInputContract extends KentraTextInputInputs, KentraTextInputOutputs {}
