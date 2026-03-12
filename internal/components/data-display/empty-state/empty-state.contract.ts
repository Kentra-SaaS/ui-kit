import type {
  EmptyStateVariant,
  EmptyStateState,
} from "./empty-state.tokens";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraEmptyStateInputs extends KentraVariantInput<EmptyStateVariant>, KentraStateInput<EmptyStateState> {}

interface KentraEmptyStateOutputs extends KentraClickOutput {}

interface KentraEmptyStateSlots extends KentraContentChildSlots<{
  icon: unknown;
  title: unknown;
  description: unknown;
  actions: unknown;
}> {}

export interface KentraEmptyStateContract extends KentraEmptyStateInputs, KentraEmptyStateOutputs, KentraEmptyStateSlots {}
