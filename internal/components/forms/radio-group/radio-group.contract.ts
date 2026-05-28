import type { InputSignal, InputSignalWithTransform, ModelSignal } from "@angular/core";
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
  readonly name: InputSignalWithTransform<string, unknown>;
  readonly disabled: InputSignalWithTransform<boolean, unknown>;
  readonly invalid: InputSignalWithTransform<boolean, unknown>;
  readonly required: InputSignalWithTransform<boolean, unknown>;
}

interface KentraRadioGroupOutputs extends KentraSelectionChangedOutput<string | null> {}

interface KentraRadioGroupSlots {}

export interface KentraRadioGroupContract extends KentraRadioGroupInputs, KentraRadioGroupOutputs, KentraRadioGroupSlots {}
