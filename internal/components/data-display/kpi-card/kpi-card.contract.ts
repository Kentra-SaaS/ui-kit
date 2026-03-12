import type { InputSignal } from "@angular/core";
import type {
  KpiCardVariant,
  KpiCardState,
} from "./kpi-card.tokens";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraKpiCardInputs extends KentraVariantInput<KpiCardVariant>, KentraStateInput<KpiCardState> {
  readonly meta: InputSignal<string | number | null>;
  readonly trend: InputSignal<string | number | null>;
}

interface KentraKpiCardOutputs extends KentraClickOutput {}

interface KentraKpiCardActionsSlot {}

interface KentraKpiCardSlots extends KentraContentChildSlots<{
  actions: KentraKpiCardActionsSlot;
}> {}

export interface KentraKpiCardContract extends KentraKpiCardInputs, KentraKpiCardOutputs, KentraKpiCardSlots {}
