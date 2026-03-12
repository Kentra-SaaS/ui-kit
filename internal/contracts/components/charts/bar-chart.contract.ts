import type {
  BarChartVariant,
  BarChartState,
} from "../../../tokens/components";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraBarChartInputs extends KentraVariantInput<BarChartVariant>, KentraStateInput<BarChartState> {}

interface KentraBarChartOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraBarChartContract extends KentraBarChartInputs, KentraBarChartOutputs {}
