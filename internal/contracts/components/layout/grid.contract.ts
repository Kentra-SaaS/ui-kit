import type {
  GridVariant,
  GridGap,
} from "../../../tokens/components";
import type {
  KentraGapInput,
  KentraVariantInput,
} from "../../core";

interface KentraGridInputs extends KentraVariantInput<GridVariant>, KentraGapInput<GridGap> {}

interface KentraGridOutputs {}

export interface KentraGridContract extends KentraGridInputs, KentraGridOutputs {}
