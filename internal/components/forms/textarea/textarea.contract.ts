import type { InputSignal, InputSignalWithTransform, ModelSignal } from "@angular/core";
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
  readonly maxLength: InputSignalWithTransform<number | undefined, unknown>;
  readonly placeholder: InputSignal<string | null>;
  readonly disabled: InputSignalWithTransform<boolean, unknown>;
  readonly readonly: InputSignalWithTransform<boolean, unknown>;
  readonly invalid: InputSignalWithTransform<boolean, unknown>;
  readonly required: InputSignalWithTransform<boolean, unknown>;
  readonly id: InputSignal<string | null>;
  readonly name: InputSignalWithTransform<string, unknown>;
  readonly ariaDescribedBy: InputSignal<string | null>;
}

interface KentraTextareaOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

interface KentraTextareaSlots {}

export interface KentraTextareaContract extends KentraTextareaInputs, KentraTextareaOutputs, KentraTextareaSlots {}
