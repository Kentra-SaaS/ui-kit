import type {
  KpiCardVariant,
  KpiCardState,
} from "./kpi-card.tokens";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraKpiCardInputs extends KentraVariantInput<KpiCardVariant>, KentraStateInput<KpiCardState> {}

interface KentraKpiCardOutputs extends KentraClickOutput {}

export interface KentraKpiCardContract extends KentraKpiCardInputs, KentraKpiCardOutputs {}
