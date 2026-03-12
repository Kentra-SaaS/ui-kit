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

interface KentraAlertInputs extends KentraVariantInput<AlertVariant>, KentraStateInput<AlertState> {}

interface KentraAlertOutputs extends KentraClosedOutput<void> {}

interface KentraAlertSlots extends KentraContentChildSlots<{
  icon: unknown;
  title: unknown;
  actions: unknown;
}> {}

export interface KentraAlertContract extends KentraAlertInputs, KentraAlertOutputs, KentraAlertSlots {}
