import type { InputSignal } from "@angular/core";
import type {
  DonutChartVariant,
  DonutChartState,
} from "./donut-chart.tokens";
import type {
  KentraDonutChartSegment,
  KentraChartValueFormatter,
} from "../../../../charts/chart-models";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraDonutChartInputs extends KentraVariantInput<DonutChartVariant>, KentraStateInput<DonutChartState> {
  readonly segments: InputSignal<readonly KentraDonutChartSegment[]>;
  readonly size: InputSignal<string | number | null>;
  readonly ariaLabel: InputSignal<string | null>;
  readonly totalLabel: InputSignal<string | null>;
  readonly showLegend: InputSignal<boolean>;
  readonly interactive: InputSignal<boolean>;
  readonly disabled: InputSignal<boolean>;
  readonly valueFormatter: InputSignal<KentraChartValueFormatter | null>;
  readonly emptyLabel: InputSignal<string | null>;
  readonly errorLabel: InputSignal<string | null>;
  readonly selectedSliceId: InputSignal<string | null>;
}

interface KentraDonutChartOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraDonutChartSlots {}

export interface KentraDonutChartContract extends KentraDonutChartInputs, KentraDonutChartOutputs, KentraDonutChartSlots {}
