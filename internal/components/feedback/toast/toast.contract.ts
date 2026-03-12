import type { InputSignal } from "@angular/core";
import type {
  ToastVariant,
  ToastState,
} from "./toast.tokens";
import type {
  KentraClosedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraToastInputs extends KentraVariantInput<ToastVariant>, KentraStateInput<ToastState> {
  readonly icon: InputSignal<string | null>;
  readonly title: InputSignal<string | null>;
}

interface KentraToastOutputs extends KentraClosedOutput<void> {}

interface KentraToastActionsSlot {}

interface KentraToastSlots extends KentraContentChildSlots<{
  actions: KentraToastActionsSlot;
}> {}

export interface KentraToastContract extends KentraToastInputs, KentraToastOutputs, KentraToastSlots {}
