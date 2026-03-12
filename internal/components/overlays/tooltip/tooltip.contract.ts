import type {
  TooltipVariant,
  TooltipState,
} from "./tooltip.tokens";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraTooltipInputs extends KentraVariantInput<TooltipVariant>, KentraStateInput<TooltipState> {}

interface KentraTooltipOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

export interface KentraTooltipContract extends KentraTooltipInputs, KentraTooltipOutputs {}
