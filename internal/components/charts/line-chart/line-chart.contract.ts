import type { InputSignal } from "@angular/core";
import type {
  LineChartVariant,
  LineChartState,
} from "./line-chart.tokens";
import type {
  KentraLineChartSeries,
  KentraChartValueFormatter,
} from "../../../../charts/chart-models";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraLineChartInputs extends KentraVariantInput<LineChartVariant>, KentraStateInput<LineChartState> {
  readonly labels: InputSignal<readonly string[]>;
  readonly series: InputSignal<readonly KentraLineChartSeries[]>;
  readonly ariaLabel: InputSignal<string | null>;
  readonly min: InputSignal<number | null>;
  readonly max: InputSignal<number | null>;
  readonly showPoints: InputSignal<boolean>;
  readonly interactive: InputSignal<boolean>;
  readonly disabled: InputSignal<boolean>;
  readonly valueFormatter: InputSignal<KentraChartValueFormatter | null>;
  readonly emptyLabel: InputSignal<string | null>;
  readonly errorLabel: InputSignal<string | null>;
  readonly selectedPointId: InputSignal<string | null>;
}

interface KentraLineChartOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraLineChartSlots {}

export interface KentraLineChartContract extends KentraLineChartInputs, KentraLineChartOutputs, KentraLineChartSlots {}
