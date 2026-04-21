import type { InputSignal } from "@angular/core";
import type {
  ModalVariant,
  ModalState,
} from "./modal.tokens";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraModalInputs extends KentraVariantInput<ModalVariant>, KentraStateInput<ModalState> {
  readonly id: InputSignal<string | null>;
  readonly title: InputSignal<string | null>;
  readonly description: InputSignal<string | null>;
  readonly ariaLabel: InputSignal<string | null>;
  readonly dismissible: InputSignal<boolean>;
  readonly closeOnBackdrop: InputSignal<boolean>;
  readonly closeOnEscape: InputSignal<boolean>;
}

interface KentraModalOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

interface KentraModalSlots {}

export interface KentraModalContract extends KentraModalInputs, KentraModalOutputs, KentraModalSlots {}
