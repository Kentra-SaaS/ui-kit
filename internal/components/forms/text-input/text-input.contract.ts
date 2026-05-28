import type { InputSignal, ModelSignal } from "@angular/core";
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
  readonly disabled: InputSignal<boolean>;
  readonly readonly: InputSignal<boolean>;
  readonly invalid: InputSignal<boolean>;
  readonly required: InputSignal<boolean>;
  readonly id: InputSignal<string | null>;
  readonly name: InputSignal<string>;
  readonly ariaDescribedBy: InputSignal<string | null>;
  readonly min: InputSignal<number | undefined>;
  readonly max: InputSignal<number | undefined>;
  readonly minLength: InputSignal<number | undefined>;
  readonly maxLength: InputSignal<number | undefined>;
}

interface KentraTextInputOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

interface KentraTextInputSlots {}

export interface KentraTextInputContract extends KentraTextInputInputs, KentraTextInputOutputs, KentraTextInputSlots {}
