import type { InputSignal } from "@angular/core";
import type {
  ButtonVariant,
  ButtonSize,
  ButtonState,
} from "./button.tokens";
import type {
  KentraClickOutput,
  KentraSizeInput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraButtonInputs
  extends KentraVariantInput<ButtonVariant>,
    KentraSizeInput<ButtonSize>,
    KentraStateInput<ButtonState> {
  readonly startIcon: InputSignal<string | null>;
  readonly endIcon: InputSignal<string | null>;
  readonly type: InputSignal<"button" | "submit" | "reset">;
  readonly disabled: InputSignal<boolean>;
  readonly loading: InputSignal<boolean>;
}
interface KentraButtonOutputs extends KentraClickOutput {}

interface KentraButtonSlots {}

export interface KentraButtonContract
  extends KentraButtonInputs,
    KentraButtonOutputs,
    KentraButtonSlots {}
