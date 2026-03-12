import type {
  TextareaVariant,
  TextareaState,
} from "../../../tokens/components";
import type {
  KentraBlurOutput,
  KentraFocusOutput,
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../core";

interface KentraTextareaInputs extends KentraVariantInput<TextareaVariant>, KentraStateInput<TextareaState> {}

interface KentraTextareaOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

export interface KentraTextareaContract extends KentraTextareaInputs, KentraTextareaOutputs {}
