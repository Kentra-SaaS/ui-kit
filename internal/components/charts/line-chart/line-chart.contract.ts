import type { InputSignal } from "@angular/core";
import type {
  LineChartVariant,
  LineChartState,
} from "./line-chart.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraLineChartInputs extends KentraVariantInput<LineChartVariant>, KentraStateInput<LineChartState> {
  readonly selectedPointId: InputSignal<string | null>;
}

interface KentraLineChartOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraLineChartSlots {}

export interface KentraLineChartContract extends KentraLineChartInputs, KentraLineChartOutputs, KentraLineChartSlots {}
