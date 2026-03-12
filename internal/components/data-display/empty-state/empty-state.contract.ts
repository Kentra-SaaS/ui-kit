import type { InputSignal } from "@angular/core";
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

interface KentraEmptyStateInputs extends KentraVariantInput<EmptyStateVariant>, KentraStateInput<EmptyStateState> {
  readonly icon: InputSignal<string | null>;
  readonly title: InputSignal<string | null>;
  readonly description: InputSignal<string | null>;
}

interface KentraEmptyStateOutputs extends KentraClickOutput {}

interface KentraEmptyStateActionsSlot {}

interface KentraEmptyStateSlots extends KentraContentChildSlots<{
  actions: KentraEmptyStateActionsSlot;
}> {}

export interface KentraEmptyStateContract extends KentraEmptyStateInputs, KentraEmptyStateOutputs, KentraEmptyStateSlots {}
