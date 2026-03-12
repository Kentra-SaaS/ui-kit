import type { InputSignal } from "@angular/core";
import type {
  SwitchVariant,
  SwitchState,
} from "./switch.tokens";
import type {
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraSwitchInputs extends KentraVariantInput<SwitchVariant>, KentraStateInput<SwitchState> {
  readonly checked: InputSignal<boolean>;
}

interface KentraSwitchOutputs extends KentraValueChangedOutput<boolean> {}

interface KentraSwitchSlots {}

export interface KentraSwitchContract extends KentraSwitchInputs, KentraSwitchOutputs, KentraSwitchSlots {}
