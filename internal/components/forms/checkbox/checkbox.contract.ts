import type {
  CheckboxVariant,
  CheckboxState,
} from "./checkbox.tokens";
import type {
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraCheckboxInputs extends KentraVariantInput<CheckboxVariant>, KentraStateInput<CheckboxState> {}

interface KentraCheckboxOutputs extends KentraValueChangedOutput<boolean> {}

interface KentraCheckboxSlots {}

export interface KentraCheckboxContract extends KentraCheckboxInputs, KentraCheckboxOutputs, KentraCheckboxSlots {}
