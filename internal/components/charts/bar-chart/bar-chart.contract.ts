import type {
  BarChartVariant,
  BarChartState,
} from "./bar-chart.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraBarChartInputs extends KentraVariantInput<BarChartVariant>, KentraStateInput<BarChartState> {}

interface KentraBarChartOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraBarChartSlots {}

export interface KentraBarChartContract extends KentraBarChartInputs, KentraBarChartOutputs, KentraBarChartSlots {}
