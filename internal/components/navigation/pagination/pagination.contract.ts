import type { InputSignal } from "@angular/core";
import type {
  PaginationVariant,
  PaginationState,
} from "./pagination.tokens";
import type {
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraPaginationInputs extends KentraVariantInput<PaginationVariant>, KentraStateInput<PaginationState> {
  readonly page: InputSignal<number>;
  readonly pageSize: InputSignal<number>;
  readonly total: InputSignal<number>;
  readonly siblingCount: InputSignal<number>;
  readonly disabled: InputSignal<boolean>;
}

interface KentraPaginationOutputs extends KentraValueChangedOutput<number> {}

interface KentraPaginationSlots {}

export interface KentraPaginationContract extends KentraPaginationInputs, KentraPaginationOutputs, KentraPaginationSlots {}
