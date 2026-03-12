import type {
  LineChartVariant,
  LineChartState,
} from "./line-chart.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraLineChartInputs extends KentraVariantInput<LineChartVariant>, KentraStateInput<LineChartState> {}

interface KentraLineChartOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraLineChartSlots {}

export interface KentraLineChartContract extends KentraLineChartInputs, KentraLineChartOutputs, KentraLineChartSlots {}
