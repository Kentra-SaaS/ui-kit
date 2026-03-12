import type {
  KpiCardVariant,
  KpiCardState,
} from "../../../tokens/components";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraKpiCardInputs extends KentraVariantInput<KpiCardVariant>, KentraStateInput<KpiCardState> {}

interface KentraKpiCardOutputs extends KentraClickOutput {}

export interface KentraKpiCardContract extends KentraKpiCardInputs, KentraKpiCardOutputs {}
