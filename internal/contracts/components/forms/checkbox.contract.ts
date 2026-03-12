import type {
  CheckboxVariant,
  CheckboxState,
} from "../../../tokens/components";
import type {
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../core";

interface KentraCheckboxInputs extends KentraVariantInput<CheckboxVariant>, KentraStateInput<CheckboxState> {}

interface KentraCheckboxOutputs extends KentraValueChangedOutput<boolean> {}

export interface KentraCheckboxContract extends KentraCheckboxInputs, KentraCheckboxOutputs {}
