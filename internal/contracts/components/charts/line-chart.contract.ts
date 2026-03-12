import type {
  LineChartVariant,
  LineChartState,
} from "../../../tokens/components";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraLineChartInputs extends KentraVariantInput<LineChartVariant>, KentraStateInput<LineChartState> {}

interface KentraLineChartOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraLineChartContract extends KentraLineChartInputs, KentraLineChartOutputs {}
