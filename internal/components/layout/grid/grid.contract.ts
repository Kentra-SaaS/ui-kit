import type {
  GridVariant,
  GridGap,
} from "./grid.tokens";
import type {
  KentraGapInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraGridInputs extends KentraVariantInput<GridVariant>, KentraGapInput<GridGap> {}

interface KentraGridOutputs {}

export interface KentraGridContract extends KentraGridInputs, KentraGridOutputs {}
