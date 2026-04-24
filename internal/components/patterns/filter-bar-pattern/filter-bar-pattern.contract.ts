import type { InputSignal } from "@angular/core";

import type {
  FilterBarPatternState,
  FilterBarPatternVariant,
} from "./filter-bar-pattern.tokens";
import type {
  KentraContentChildSlots,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraFilterBarPatternInputs
  extends KentraVariantInput<FilterBarPatternVariant>,
    KentraStateInput<FilterBarPatternState> {
  readonly ariaLabel: InputSignal<string | null>;
  readonly disabled: InputSignal<boolean>;
}

interface KentraFilterBarPatternOutputs {}

interface KentraFilterBarPatternSearchSlot {}
interface KentraFilterBarPatternFiltersSlot {}
interface KentraFilterBarPatternSecondaryActionsSlot {}
interface KentraFilterBarPatternChipsSlot {}

interface KentraFilterBarPatternSlots
  extends KentraContentChildSlots<{
    search: KentraFilterBarPatternSearchSlot;
    filters: KentraFilterBarPatternFiltersSlot;
    secondaryActions: KentraFilterBarPatternSecondaryActionsSlot;
    chips: KentraFilterBarPatternChipsSlot;
  }> {}

export interface KentraFilterBarPatternContract
  extends KentraFilterBarPatternInputs,
    KentraFilterBarPatternOutputs,
    KentraFilterBarPatternSlots {}
