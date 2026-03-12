import type {
  PaginationVariant,
  PaginationState,
} from "../../../tokens/components";
import type {
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../core";

interface KentraPaginationInputs extends KentraVariantInput<PaginationVariant>, KentraStateInput<PaginationState> {}

interface KentraPaginationOutputs extends KentraValueChangedOutput<number> {}

export interface KentraPaginationContract extends KentraPaginationInputs, KentraPaginationOutputs {}
