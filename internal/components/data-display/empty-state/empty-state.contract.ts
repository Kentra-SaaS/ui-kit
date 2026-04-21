import type { InputSignal } from "@angular/core";
import type {
  EmptyStateVariant,
  EmptyStateState,
} from "./empty-state.tokens";
import type { IconName } from "../../icons/icon";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraEmptyStateInputs extends KentraVariantInput<EmptyStateVariant>, KentraStateInput<EmptyStateState> {
  readonly icon: InputSignal<IconName | null>;
  readonly title: InputSignal<string | null>;
  readonly description: InputSignal<string | null>;
  readonly actionLabel: InputSignal<string | null>;
  readonly disabled: InputSignal<boolean>;
}

interface KentraEmptyStateOutputs extends KentraClickOutput {}

interface KentraEmptyStateSlots {}

export interface KentraEmptyStateContract extends KentraEmptyStateInputs, KentraEmptyStateOutputs, KentraEmptyStateSlots {}
