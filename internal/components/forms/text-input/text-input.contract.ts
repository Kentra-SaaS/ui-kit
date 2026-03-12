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
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraTextInputInputs extends KentraVariantInput<TextInputVariant>, KentraStateInput<TextInputState> {}

interface KentraTextInputOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

interface KentraTextInputSlots extends KentraContentChildSlots<{
  prefix: unknown;
  suffix: unknown;
}> {}

export interface KentraTextInputContract extends KentraTextInputInputs, KentraTextInputOutputs, KentraTextInputSlots {}
