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

interface KentraGridItemsSlot {}

interface KentraGridSlots extends KentraContentChildrenSlots<{
  items: KentraGridItemsSlot;
}> {}

export interface KentraGridContract extends KentraGridInputs, KentraGridOutputs, KentraGridSlots {}
