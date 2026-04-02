import type { InputSignal } from "@angular/core";
import type {
  FieldVariant,
} from "./field.tokens";
import type {
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraFieldInputs extends KentraVariantInput<FieldVariant> {
  readonly label: InputSignal<string | null>;
  readonly hint: InputSignal<string | null>;
  readonly errorText: InputSignal<string | null>;
  readonly forId: InputSignal<string | null>;
  readonly required: InputSignal<boolean>;
  readonly disabled: InputSignal<boolean>;
  readonly invalid: InputSignal<boolean>;
}

interface KentraFieldOutputs {}

interface KentraFieldSlots {}

export interface KentraFieldContract extends KentraFieldInputs, KentraFieldOutputs, KentraFieldSlots {}
