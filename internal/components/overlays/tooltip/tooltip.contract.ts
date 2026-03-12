import type {
  TooltipVariant,
  TooltipState,
} from "./tooltip.tokens";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraTooltipInputs extends KentraVariantInput<TooltipVariant>, KentraStateInput<TooltipState> {}

interface KentraTooltipOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

interface KentraTooltipSlots extends KentraContentChildSlots<{
  trigger: unknown;
  content: unknown;
}> {}

export interface KentraTooltipContract extends KentraTooltipInputs, KentraTooltipOutputs, KentraTooltipSlots {}
