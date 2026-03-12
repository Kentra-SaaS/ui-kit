import type {
  SwitchVariant,
  SwitchState,
} from "../../../tokens/components";
import type {
  KentraStateInput,
  KentraValueChangedOutput,
  KentraVariantInput,
} from "../../core";

interface KentraSwitchInputs extends KentraVariantInput<SwitchVariant>, KentraStateInput<SwitchState> {}

interface KentraSwitchOutputs extends KentraValueChangedOutput<boolean> {}

export interface KentraSwitchContract extends KentraSwitchInputs, KentraSwitchOutputs {}
