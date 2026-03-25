import type { InputSignal } from "@angular/core";
import type {
  GridVariant,
  GridGap,
} from "./grid.tokens";
import type {
  KentraGapInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraGridInputs
  extends KentraVariantInput<GridVariant>,
    KentraGapInput<GridGap> {
  readonly columns: InputSignal<number | string | null>;
  readonly minItemWidth: InputSignal<string | null>;
}

interface KentraGridOutputs {}

interface KentraGridSlots {}

export interface KentraGridContract extends KentraGridInputs, KentraGridOutputs, KentraGridSlots {}
