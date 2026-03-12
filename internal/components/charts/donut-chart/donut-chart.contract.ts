import type { InputSignal } from "@angular/core";
import type {
  DonutChartVariant,
  DonutChartState,
} from "./donut-chart.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraDonutChartInputs extends KentraVariantInput<DonutChartVariant>, KentraStateInput<DonutChartState> {
  readonly selectedSliceId: InputSignal<string | null>;
}

interface KentraDonutChartOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraDonutChartSlots {}

export interface KentraDonutChartContract extends KentraDonutChartInputs, KentraDonutChartOutputs, KentraDonutChartSlots {}
