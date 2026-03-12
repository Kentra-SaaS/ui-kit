import type { InputSignal } from "@angular/core";
import type {
  AlertVariant,
  AlertState,
} from "./alert.tokens";
import type {
  KentraClosedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraAlertInputs extends KentraVariantInput<AlertVariant>, KentraStateInput<AlertState> {
  readonly icon: InputSignal<string | null>;
  readonly title: InputSignal<string | null>;
}

interface KentraAlertOutputs extends KentraClosedOutput<void> {}

interface KentraAlertActionsSlot {}

interface KentraAlertSlots extends KentraContentChildSlots<{
  actions: KentraAlertActionsSlot;
}> {}

export interface KentraAlertContract extends KentraAlertInputs, KentraAlertOutputs, KentraAlertSlots {}
