import type {
  ProgressVariant,
  ProgressState,
} from "../../../tokens/components";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraProgressInputs extends KentraVariantInput<ProgressVariant>, KentraStateInput<ProgressState> {}

interface KentraProgressOutputs {}

export interface KentraProgressContract extends KentraProgressInputs, KentraProgressOutputs {}
