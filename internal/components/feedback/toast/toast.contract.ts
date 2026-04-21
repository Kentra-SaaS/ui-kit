import type { InputSignal } from "@angular/core";
import type {
  ToastVariant,
  ToastState,
} from "./toast.tokens";
import type { IconName } from "../../icons/icon";
import type {
  KentraClosedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraToastInputs extends KentraVariantInput<ToastVariant>, KentraStateInput<ToastState> {
  readonly icon: InputSignal<IconName | null>;
  readonly title: InputSignal<string | null>;
  readonly message: InputSignal<string | null>;
  readonly dismissible: InputSignal<boolean>;
  readonly duration: InputSignal<number | null>;
  readonly ariaLive: InputSignal<"polite" | "assertive" | null>;
}

interface KentraToastOutputs extends KentraClosedOutput<void> {}

interface KentraToastSlots {}

export interface KentraToastContract extends KentraToastInputs, KentraToastOutputs, KentraToastSlots {}
