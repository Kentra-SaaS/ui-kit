import type { InputSignal } from "@angular/core";
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

interface KentraTooltipInputs extends KentraVariantInput<TooltipVariant>, KentraStateInput<TooltipState> {
  readonly content: InputSignal<string | null>;
  readonly disabled: InputSignal<boolean>;
  readonly showArrow: InputSignal<boolean>;
}

interface KentraTooltipOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

interface KentraTooltipSlots {}

export interface KentraTooltipContract extends KentraTooltipInputs, KentraTooltipOutputs, KentraTooltipSlots {}
