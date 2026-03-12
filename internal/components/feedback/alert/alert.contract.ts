import type {
  AlertVariant,
  AlertState,
} from "./alert.tokens";
import type {
  KentraClosedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraAlertInputs extends KentraVariantInput<AlertVariant>, KentraStateInput<AlertState> {}

interface KentraAlertOutputs extends KentraClosedOutput<void> {}

export interface KentraAlertContract extends KentraAlertInputs, KentraAlertOutputs {}
