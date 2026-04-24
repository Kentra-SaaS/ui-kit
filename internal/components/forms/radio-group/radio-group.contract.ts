import type { InputSignal, ModelSignal } from "@angular/core";
import type {
  RadioGroupVariant,
} from "./radio-group.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

export interface KentraRadioOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

interface KentraRadioGroupInputs extends KentraVariantInput<RadioGroupVariant> {
  readonly value: ModelSignal<string | null>;
  readonly options: InputSignal<readonly KentraRadioOption[]>;
  readonly name: InputSignal<string>;
  readonly disabled: InputSignal<boolean>;
  readonly invalid: InputSignal<boolean>;
  readonly required: InputSignal<boolean>;
}

interface KentraRadioGroupOutputs extends KentraSelectionChangedOutput<string | null> {}

interface KentraRadioGroupSlots {}

export interface KentraRadioGroupContract extends KentraRadioGroupInputs, KentraRadioGroupOutputs, KentraRadioGroupSlots {}
