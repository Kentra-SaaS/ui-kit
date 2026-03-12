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

interface KentraTooltipTriggerSlot {}
interface KentraTooltipContentSlot {}

interface KentraTooltipSlots extends KentraContentChildSlots<{
  trigger: KentraTooltipTriggerSlot;
  content: KentraTooltipContentSlot;
}> {}

export interface KentraTooltipContract extends KentraTooltipInputs, KentraTooltipOutputs, KentraTooltipSlots {}
