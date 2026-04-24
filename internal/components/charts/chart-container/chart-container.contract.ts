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
  readonly title: InputSignal<string | null>;
  readonly description: InputSignal<string | null>;
  readonly ariaLabel: InputSignal<string | null>;
  readonly height: InputSignal<string | number | null>;
  readonly desktopHeight: InputSignal<string | number | null>;
  readonly showLegend: InputSignal<boolean>;
  readonly loadingLabel: InputSignal<string | null>;
  readonly emptyLabel: InputSignal<string | null>;
  readonly errorLabel: InputSignal<string | null>;
}

interface KentraChartContainerOutputs {}

interface KentraChartContainerToolbarSlot {}
interface KentraChartContainerLegendSlot {}

interface KentraChartContainerSlots extends KentraContentChildSlots<{
  toolbar: KentraChartContainerToolbarSlot;
  legend: KentraChartContainerLegendSlot;
}> {}

export interface KentraChartContainerContract extends KentraChartContainerInputs, KentraChartContainerOutputs, KentraChartContainerSlots {}
