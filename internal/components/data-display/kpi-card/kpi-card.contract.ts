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

interface KentraKpiCardInputs extends KentraVariantInput<KpiCardVariant>, KentraStateInput<KpiCardState> {}

interface KentraKpiCardOutputs extends KentraClickOutput {}

interface KentraKpiCardSlots extends KentraContentChildSlots<{
  meta: unknown;
  trend: unknown;
  actions: unknown;
}> {}

export interface KentraKpiCardContract extends KentraKpiCardInputs, KentraKpiCardOutputs, KentraKpiCardSlots {}
