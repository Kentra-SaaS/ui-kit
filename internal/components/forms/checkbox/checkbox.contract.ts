import type { InputSignal, ModelSignal } from "@angular/core";
import type {
  CheckboxVariant,
} from "./checkbox.tokens";
import type {
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraCheckboxInputs extends KentraVariantInput<CheckboxVariant> {
  readonly checked: ModelSignal<boolean>;
  readonly indeterminate: InputSignal<boolean>;
  readonly disabled: InputSignal<boolean>;
  readonly invalid: InputSignal<boolean>;
  readonly required: InputSignal<boolean>;
  readonly name: InputSignal<string>;
}

interface KentraCheckboxOutputs extends KentraValueChangedOutput<boolean> {}

interface KentraCheckboxSlots {}

export interface KentraCheckboxContract extends KentraCheckboxInputs, KentraCheckboxOutputs, KentraCheckboxSlots {}
