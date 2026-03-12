import type {
  TooltipVariant,
  TooltipState,
} from "../../../tokens/components";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraTooltipInputs extends KentraVariantInput<TooltipVariant>, KentraStateInput<TooltipState> {}

interface KentraTooltipOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

export interface KentraTooltipContract extends KentraTooltipInputs, KentraTooltipOutputs {}
