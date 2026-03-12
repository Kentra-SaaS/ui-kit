import type {
  FieldVariant,
  FieldState,
} from "./field.tokens";
import type {
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraFieldInputs extends KentraVariantInput<FieldVariant>, KentraStateInput<FieldState> {}

interface KentraFieldOutputs {}

interface KentraFieldSlots extends KentraContentChildSlots<{
  label: unknown;
  hint: unknown;
  error: unknown;
  prefix: unknown;
  suffix: unknown;
}> {}

export interface KentraFieldContract extends KentraFieldInputs, KentraFieldOutputs, KentraFieldSlots {}
