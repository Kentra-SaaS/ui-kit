import type {
  SpinnerVariant,
  SpinnerState,
} from "../../../tokens/components";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraSpinnerInputs extends KentraVariantInput<SpinnerVariant>, KentraStateInput<SpinnerState> {}

interface KentraSpinnerOutputs {}

export interface KentraSpinnerContract extends KentraSpinnerInputs, KentraSpinnerOutputs {}
