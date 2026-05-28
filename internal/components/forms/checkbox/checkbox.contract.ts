import type { InputSignal, InputSignalWithTransform, ModelSignal } from "@angular/core";
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
  readonly disabled: InputSignalWithTransform<boolean, unknown>;
  readonly invalid: InputSignalWithTransform<boolean, unknown>;
  readonly required: InputSignalWithTransform<boolean, unknown>;
  readonly name: InputSignalWithTransform<string, unknown>;
}

interface KentraCheckboxOutputs extends KentraValueChangedOutput<boolean> {}

interface KentraCheckboxSlots {}

export interface KentraCheckboxContract extends KentraCheckboxInputs, KentraCheckboxOutputs, KentraCheckboxSlots {}
