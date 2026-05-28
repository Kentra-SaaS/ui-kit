import type { InputSignal, InputSignalWithTransform, ModelSignal } from "@angular/core";
import type {
  TextInputVariant,
} from "./text-input.tokens";
import type {
  KentraBlurOutput,
  KentraFocusOutput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

export type KentraTextInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "tel"
  | "url";

interface KentraTextInputInputs extends KentraVariantInput<TextInputVariant> {
  readonly prefix: InputSignal<string | null>;
  readonly suffix: InputSignal<string | null>;
  readonly value: ModelSignal<string>;
  readonly type: InputSignal<KentraTextInputType>;
  readonly placeholder: InputSignal<string | null>;
  readonly autocomplete: InputSignal<string | null>;
  readonly disabled: InputSignalWithTransform<boolean, unknown>;
  readonly readonly: InputSignalWithTransform<boolean, unknown>;
  readonly invalid: InputSignalWithTransform<boolean, unknown>;
  readonly required: InputSignalWithTransform<boolean, unknown>;
  readonly id: InputSignal<string | null>;
  readonly name: InputSignalWithTransform<string, unknown>;
  readonly ariaDescribedBy: InputSignal<string | null>;
  readonly min: InputSignalWithTransform<number | undefined, unknown>;
  readonly max: InputSignalWithTransform<number | undefined, unknown>;
  readonly minLength: InputSignalWithTransform<number | undefined, unknown>;
  readonly maxLength: InputSignalWithTransform<number | undefined, unknown>;
}

interface KentraTextInputOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

interface KentraTextInputSlots {}

export interface KentraTextInputContract extends KentraTextInputInputs, KentraTextInputOutputs, KentraTextInputSlots {}
