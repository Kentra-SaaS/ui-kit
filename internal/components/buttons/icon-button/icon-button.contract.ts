import type { InputSignal } from "@angular/core";
import type {
  IconButtonVariant,
  IconButtonSize,
  IconButtonState,
} from "./icon-button.tokens";
import type { IconName } from "../../icons/icon";
import type {
  KentraClickOutput,
  KentraSizeInput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraIconButtonInputs
  extends KentraVariantInput<IconButtonVariant>,
    KentraSizeInput<IconButtonSize>,
    KentraStateInput<IconButtonState> {
  readonly icon: InputSignal<IconName | null>;
  readonly ariaLabel: InputSignal<string | null>;
  readonly type: InputSignal<"button" | "submit" | "reset">;
  readonly disabled: InputSignal<boolean>;
}

interface KentraIconButtonOutputs extends KentraClickOutput {}

interface KentraIconButtonSlots {}

export interface KentraIconButtonContract
  extends KentraIconButtonInputs,
    KentraIconButtonOutputs,
    KentraIconButtonSlots {}
