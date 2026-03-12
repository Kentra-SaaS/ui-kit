import type {
  EmptyStateVariant,
  EmptyStateState,
} from "./empty-state.tokens";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraEmptyStateInputs extends KentraVariantInput<EmptyStateVariant>, KentraStateInput<EmptyStateState> {}

interface KentraEmptyStateOutputs extends KentraClickOutput {}

export interface KentraEmptyStateContract extends KentraEmptyStateInputs, KentraEmptyStateOutputs {}
