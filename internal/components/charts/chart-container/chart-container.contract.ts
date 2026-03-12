import type { InputSignal } from "@angular/core";
import type {
  ChartContainerVariant,
  ChartContainerState,
} from "./chart-container.tokens";
import type {
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraChartContainerInputs extends KentraVariantInput<ChartContainerVariant>, KentraStateInput<ChartContainerState> {
  readonly header: InputSignal<string | null>;
  readonly legend: InputSignal<string | null>;
  readonly empty: InputSignal<string | null>;
}

interface KentraChartContainerOutputs {}

interface KentraChartContainerToolbarSlot {}

interface KentraChartContainerSlots extends KentraContentChildSlots<{
  toolbar: KentraChartContainerToolbarSlot;
}> {}

export interface KentraChartContainerContract extends KentraChartContainerInputs, KentraChartContainerOutputs, KentraChartContainerSlots {}
