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
} from "../../../core/contracts";

interface KentraTextareaInputs extends KentraVariantInput<TextareaVariant>, KentraStateInput<TextareaState> {}

interface KentraTextareaOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

export interface KentraTextareaContract extends KentraTextareaInputs, KentraTextareaOutputs {}
