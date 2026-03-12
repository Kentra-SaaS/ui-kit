import type {
  GridVariant,
  GridGap,
} from "./grid.tokens";
import type {
  KentraGapInput,
  KentraVariantInput,
  KentraContentChildrenSlots,
} from "../../../core/contracts";

interface KentraGridInputs extends KentraVariantInput<GridVariant>, KentraGapInput<GridGap> {}

interface KentraGridOutputs {}

interface KentraGridSlots extends KentraContentChildrenSlots<{
  items: unknown;
}> {}

export interface KentraGridContract extends KentraGridInputs, KentraGridOutputs, KentraGridSlots {}
