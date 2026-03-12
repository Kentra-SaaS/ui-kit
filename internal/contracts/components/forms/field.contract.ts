import type {
  FieldVariant,
  FieldState,
} from "../../../tokens/components";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraFieldInputs extends KentraVariantInput<FieldVariant>, KentraStateInput<FieldState> {}

interface KentraFieldOutputs {}

export interface KentraFieldContract extends KentraFieldInputs, KentraFieldOutputs {}
