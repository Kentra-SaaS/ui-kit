import type {
  AlertVariant,
  AlertState,
} from "../../../tokens/components";
import type {
  KentraClosedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraAlertInputs extends KentraVariantInput<AlertVariant>, KentraStateInput<AlertState> {}

interface KentraAlertOutputs extends KentraClosedOutput<void> {}

export interface KentraAlertContract extends KentraAlertInputs, KentraAlertOutputs {}
