import type { InputSignal } from "@angular/core";
import type {
  FieldVariant,
  FieldState,
} from "./field.tokens";
import type {
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraFieldInputs extends KentraVariantInput<FieldVariant>, KentraStateInput<FieldState> {
  readonly label: InputSignal<string | null>;
  readonly hint: InputSignal<string | null>;
  readonly errorText: InputSignal<string | null>;
  readonly prefix: InputSignal<string | null>;
  readonly suffix: InputSignal<string | null>;
}

interface KentraFieldOutputs {}

interface KentraFieldSlots {}

export interface KentraFieldContract extends KentraFieldInputs, KentraFieldOutputs, KentraFieldSlots {}
