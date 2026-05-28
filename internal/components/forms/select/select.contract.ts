import type { InputSignal, ModelSignal } from "@angular/core";
import type {
  SelectVariant,
} from "./select.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

export interface KentraSelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface KentraSelectOptionGroup {
  readonly label: string;
  readonly options: readonly KentraSelectOption[];
}

interface KentraSelectInputs extends KentraVariantInput<SelectVariant> {
  readonly value: ModelSignal<string | null>;
  readonly options: InputSignal<readonly KentraSelectOption[]>;
  readonly optionGroups: InputSignal<readonly KentraSelectOptionGroup[]>;
  readonly placeholder: InputSignal<string | null>;
  readonly disabled: InputSignal<boolean>;
  readonly invalid: InputSignal<boolean>;
  readonly required: InputSignal<boolean>;
  readonly id: InputSignal<string | null>;
  readonly name: InputSignal<string>;
  readonly ariaDescribedBy: InputSignal<string | null>;
}

interface KentraSelectOutputs extends KentraSelectionChangedOutput<string | null> {}

interface KentraSelectSlots {}

export interface KentraSelectContract extends KentraSelectInputs, KentraSelectOutputs, KentraSelectSlots {}
