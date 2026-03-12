import type {
  DonutChartVariant,
  DonutChartState,
} from "./donut-chart.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraDonutChartInputs extends KentraVariantInput<DonutChartVariant>, KentraStateInput<DonutChartState> {}

interface KentraDonutChartOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraDonutChartContract extends KentraDonutChartInputs, KentraDonutChartOutputs {}
