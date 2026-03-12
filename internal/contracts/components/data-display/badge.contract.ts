import type {
  BadgeVariant,
  BadgeSize,
  BadgeState,
} from "../../../tokens/components";
import type {
  KentraSizeInput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraBadgeInputs extends KentraVariantInput<BadgeVariant>, KentraSizeInput<BadgeSize>, KentraStateInput<BadgeState> {}

interface KentraBadgeOutputs {}

export interface KentraBadgeContract extends KentraBadgeInputs, KentraBadgeOutputs {}
