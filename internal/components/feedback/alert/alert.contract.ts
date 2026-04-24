import type { InputSignal } from "@angular/core";
import type {
  AlertVariant,
  AlertState,
} from "./alert.tokens";
import type { IconName } from "../../icons/icon";
import type {
  KentraClosedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraAlertInputs extends KentraVariantInput<AlertVariant>, KentraStateInput<AlertState> {
  readonly icon: InputSignal<IconName | null>;
  readonly title: InputSignal<string | null>;
  readonly message: InputSignal<string | null>;
  readonly dismissible: InputSignal<boolean>;
  readonly ariaLive: InputSignal<"polite" | "assertive" | null>;
}

interface KentraAlertOutputs extends KentraClosedOutput<void> {}

interface KentraAlertSlots {}

export interface KentraAlertContract extends KentraAlertInputs, KentraAlertOutputs, KentraAlertSlots {}
