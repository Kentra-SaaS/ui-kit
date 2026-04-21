import type { InputSignal } from "@angular/core";
import type {
  ProgressVariant,
  ProgressState,
} from "./progress.tokens";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraProgressInputs extends KentraVariantInput<ProgressVariant>, KentraStateInput<ProgressState> {
  readonly value: InputSignal<number | null>;
  readonly max: InputSignal<number>;
  readonly label: InputSignal<string | null>;
}

interface KentraProgressOutputs {}

interface KentraProgressSlots {}

export interface KentraProgressContract extends KentraProgressInputs, KentraProgressOutputs, KentraProgressSlots {}
