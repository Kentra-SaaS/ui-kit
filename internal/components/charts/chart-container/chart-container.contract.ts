import type {
  ChartContainerVariant,
  ChartContainerState,
} from "./chart-container.tokens";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraChartContainerInputs extends KentraVariantInput<ChartContainerVariant>, KentraStateInput<ChartContainerState> {}

interface KentraChartContainerOutputs {}

export interface KentraChartContainerContract extends KentraChartContainerInputs, KentraChartContainerOutputs {}
