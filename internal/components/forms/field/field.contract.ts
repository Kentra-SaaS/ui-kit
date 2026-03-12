import type {
  FieldVariant,
  FieldState,
} from "./field.tokens";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraFieldInputs extends KentraVariantInput<FieldVariant>, KentraStateInput<FieldState> {}

interface KentraFieldOutputs {}

export interface KentraFieldContract extends KentraFieldInputs, KentraFieldOutputs {}
