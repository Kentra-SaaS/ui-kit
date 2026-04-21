import type { InputSignal } from "@angular/core";
import type {
  BadgeVariant,
  BadgeSize,
  BadgeState,
} from "./badge.tokens";
import type { IconName } from "../../icons/icon";
import type {
  KentraSizeInput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraBadgeInputs
  extends KentraVariantInput<BadgeVariant>,
    KentraSizeInput<BadgeSize>,
    KentraStateInput<BadgeState> {
  readonly icon: InputSignal<IconName | null>;
  readonly label: InputSignal<string | null>;
}

interface KentraBadgeOutputs {}

interface KentraBadgeSlots {}

export interface KentraBadgeContract extends KentraBadgeInputs, KentraBadgeOutputs, KentraBadgeSlots {}
