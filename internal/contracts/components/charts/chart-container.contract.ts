import type {
  ChartContainerVariant,
  ChartContainerState,
} from "../../../tokens/components";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraChartContainerInputs extends KentraVariantInput<ChartContainerVariant>, KentraStateInput<ChartContainerState> {}

interface KentraChartContainerOutputs {}

export interface KentraChartContainerContract extends KentraChartContainerInputs, KentraChartContainerOutputs {}
