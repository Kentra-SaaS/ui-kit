import type {
  ChartContainerVariant,
  ChartContainerState,
} from "./chart-container.tokens";
import type {
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraChartContainerInputs extends KentraVariantInput<ChartContainerVariant>, KentraStateInput<ChartContainerState> {}

interface KentraChartContainerOutputs {}

interface KentraChartContainerSlots extends KentraContentChildSlots<{
  header: unknown;
  toolbar: unknown;
  legend: unknown;
  empty: unknown;
}> {}

export interface KentraChartContainerContract extends KentraChartContainerInputs, KentraChartContainerOutputs, KentraChartContainerSlots {}
