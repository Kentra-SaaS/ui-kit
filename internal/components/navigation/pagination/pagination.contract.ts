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
}

interface KentraPaginationOutputs extends KentraValueChangedOutput<number> {}

interface KentraPaginationSlots {}

export interface KentraPaginationContract extends KentraPaginationInputs, KentraPaginationOutputs, KentraPaginationSlots {}
