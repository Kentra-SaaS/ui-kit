import type { InputSignal } from "@angular/core";
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

interface KentraTextareaInputs extends KentraVariantInput<TextareaVariant>, KentraStateInput<TextareaState> {
  readonly hint: InputSignal<string | null>;
  readonly counter: InputSignal<string | number | null>;
  readonly errorText: InputSignal<string | null>;
  readonly value: InputSignal<string>;
}

interface KentraTextareaOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

interface KentraTextareaSlots {}

export interface KentraTextareaContract extends KentraTextareaInputs, KentraTextareaOutputs, KentraTextareaSlots {}
