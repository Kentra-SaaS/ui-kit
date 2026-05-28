import type { InputSignal, InputSignalWithTransform, ModelSignal } from "@angular/core";
import type {
  SwitchVariant,
} from "./switch.tokens";
import type {
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

export type KentraSwitchLabelPosition = "start" | "end";

interface KentraSwitchInputs extends KentraVariantInput<SwitchVariant> {
  readonly checked: ModelSignal<boolean>;
  readonly disabled: InputSignalWithTransform<boolean, unknown>;
  readonly labelPosition: InputSignal<KentraSwitchLabelPosition>;
}

interface KentraSwitchOutputs extends KentraValueChangedOutput<boolean> {}

interface KentraSwitchSlots {}

export interface KentraSwitchContract extends KentraSwitchInputs, KentraSwitchOutputs, KentraSwitchSlots {}
