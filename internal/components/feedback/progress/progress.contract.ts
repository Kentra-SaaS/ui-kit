import type {
  ProgressVariant,
  ProgressState,
} from "./progress.tokens";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraProgressInputs extends KentraVariantInput<ProgressVariant>, KentraStateInput<ProgressState> {}

interface KentraProgressOutputs {}

interface KentraProgressSlots {}

export interface KentraProgressContract extends KentraProgressInputs, KentraProgressOutputs, KentraProgressSlots {}
