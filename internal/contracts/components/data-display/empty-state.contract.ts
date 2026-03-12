import type {
  EmptyStateVariant,
  EmptyStateState,
} from "../../../tokens/components";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraEmptyStateInputs extends KentraVariantInput<EmptyStateVariant>, KentraStateInput<EmptyStateState> {}

interface KentraEmptyStateOutputs extends KentraClickOutput {}

export interface KentraEmptyStateContract extends KentraEmptyStateInputs, KentraEmptyStateOutputs {}
