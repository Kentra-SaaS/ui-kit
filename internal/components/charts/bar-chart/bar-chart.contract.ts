import type { InputSignal } from "@angular/core";
import type {
  BarChartVariant,
  BarChartState,
} from "./bar-chart.tokens";
import type {
  KentraBarChartSeries,
  KentraChartValueFormatter,
} from "../../../../charts/chart-models";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraBarChartInputs extends KentraVariantInput<BarChartVariant>, KentraStateInput<BarChartState> {
  readonly labels: InputSignal<readonly string[]>;
  readonly series: InputSignal<readonly KentraBarChartSeries[]>;
  readonly ariaLabel: InputSignal<string | null>;
  readonly interactive: InputSignal<boolean>;
  readonly disabled: InputSignal<boolean>;
  readonly valueFormatter: InputSignal<KentraChartValueFormatter | null>;
  readonly emptyLabel: InputSignal<string | null>;
  readonly errorLabel: InputSignal<string | null>;
  readonly selectedPointId: InputSignal<string | null>;
}

interface KentraBarChartOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraBarChartSlots {}

export interface KentraBarChartContract extends KentraBarChartInputs, KentraBarChartOutputs, KentraBarChartSlots {}
