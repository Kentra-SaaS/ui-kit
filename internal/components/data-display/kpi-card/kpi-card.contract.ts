import type { InputSignal } from "@angular/core";
import type {
  KpiCardVariant,
  KpiCardState,
} from "./kpi-card.tokens";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraKpiCardInputs extends KentraVariantInput<KpiCardVariant>, KentraStateInput<KpiCardState> {
  readonly label: InputSignal<string | null>;
  readonly value: InputSignal<string | number | null>;
  readonly trend: InputSignal<string | number | null>;
  readonly delta: InputSignal<string | number | null>;
  readonly clickable: InputSignal<boolean>;
}

interface KentraKpiCardOutputs extends KentraClickOutput {}

interface KentraKpiCardSlots {}

export interface KentraKpiCardContract extends KentraKpiCardInputs, KentraKpiCardOutputs, KentraKpiCardSlots {}
