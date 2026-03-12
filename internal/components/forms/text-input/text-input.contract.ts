import type { InputSignal } from "@angular/core";
import type {
  TextInputVariant,
  TextInputState,
} from "./text-input.tokens";
import type {
  KentraBlurOutput,
  KentraFocusOutput,
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraTextInputInputs extends KentraVariantInput<TextInputVariant>, KentraStateInput<TextInputState> {
  readonly prefix: InputSignal<string | null>;
  readonly suffix: InputSignal<string | null>;
  readonly value: InputSignal<string>;
}

interface KentraTextInputOutputs extends KentraValueChangedOutput<string>, KentraFocusOutput, KentraBlurOutput {}

interface KentraTextInputSlots {}

export interface KentraTextInputContract extends KentraTextInputInputs, KentraTextInputOutputs, KentraTextInputSlots {}
