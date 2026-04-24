import type { InputSignal } from "@angular/core";
import type {
  SpinnerVariant,
  SpinnerState,
} from "./spinner.tokens";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraSpinnerInputs extends KentraVariantInput<SpinnerVariant>, KentraStateInput<SpinnerState> {
  readonly label: InputSignal<string | null>;
}

interface KentraSpinnerOutputs {}

interface KentraSpinnerSlots {}

export interface KentraSpinnerContract extends KentraSpinnerInputs, KentraSpinnerOutputs, KentraSpinnerSlots {}
