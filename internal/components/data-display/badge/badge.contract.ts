import type {
  BadgeVariant,
  BadgeSize,
  BadgeState,
} from "./badge.tokens";
import type {
  KentraSizeInput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraBadgeInputs extends KentraVariantInput<BadgeVariant>, KentraSizeInput<BadgeSize>, KentraStateInput<BadgeState> {}

interface KentraBadgeOutputs {}

export interface KentraBadgeContract extends KentraBadgeInputs, KentraBadgeOutputs {}
