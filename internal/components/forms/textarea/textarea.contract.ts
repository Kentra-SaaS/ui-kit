import type {
  TextareaVariant,
  TextareaState,
} from "./textarea.tokens";
import type {
  KentraBlurOutput,
  KentraFocusOutput,
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraTextareaInputs extends KentraVariantInput<TextareaVariant>, KentraStateInput<TextareaState> {}

interface KentraTextareaOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

interface KentraTextareaSlots extends KentraContentChildSlots<{
  hint: unknown;
  counter: unknown;
  error: unknown;
}> {}

export interface KentraTextareaContract extends KentraTextareaInputs, KentraTextareaOutputs, KentraTextareaSlots {}
