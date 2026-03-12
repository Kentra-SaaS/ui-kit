import type { InputSignal } from "@angular/core";
import type {
  BarChartVariant,
  BarChartState,
} from "./bar-chart.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraBarChartInputs extends KentraVariantInput<BarChartVariant>, KentraStateInput<BarChartState> {
  readonly selectedPointId: InputSignal<string | null>;
}

interface KentraBarChartOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraBarChartSlots {}

export interface KentraBarChartContract extends KentraBarChartInputs, KentraBarChartOutputs, KentraBarChartSlots {}
