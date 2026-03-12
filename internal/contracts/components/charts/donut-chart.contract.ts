import type {
  DonutChartVariant,
  DonutChartState,
} from "../../../tokens/components";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraDonutChartInputs extends KentraVariantInput<DonutChartVariant>, KentraStateInput<DonutChartState> {}

interface KentraDonutChartOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraDonutChartContract extends KentraDonutChartInputs, KentraDonutChartOutputs {}
