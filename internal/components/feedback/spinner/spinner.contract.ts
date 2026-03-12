import type {
  SpinnerVariant,
  SpinnerState,
} from "./spinner.tokens";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraSpinnerInputs extends KentraVariantInput<SpinnerVariant>, KentraStateInput<SpinnerState> {}

interface KentraSpinnerOutputs {}

export interface KentraSpinnerContract extends KentraSpinnerInputs, KentraSpinnerOutputs {}
