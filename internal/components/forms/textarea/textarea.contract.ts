import type { InputSignal, ModelSignal } from "@angular/core";
import type {
  TextareaVariant,
} from "./textarea.tokens";
import type {
  KentraBlurOutput,
  KentraFocusOutput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraTextareaInputs extends KentraVariantInput<TextareaVariant> {
  readonly value: ModelSignal<string>;
  readonly rows: InputSignal<number>;
  readonly maxLength: InputSignal<number | undefined>;
  readonly placeholder: InputSignal<string | null>;
  readonly disabled: InputSignal<boolean>;
  readonly readonly: InputSignal<boolean>;
  readonly invalid: InputSignal<boolean>;
  readonly required: InputSignal<boolean>;
  readonly name: InputSignal<string>;
}

interface KentraTextareaOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

interface KentraTextareaSlots {}

export interface KentraTextareaContract extends KentraTextareaInputs, KentraTextareaOutputs, KentraTextareaSlots {}
