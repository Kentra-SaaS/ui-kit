import type { IconName, IconSize, IconWeight } from "./icon.tokens";
import type {
  KentraClickOutput,
  KentraColorInput,
  KentraNameInput,
  KentraSizeInput,
  KentraWeightInput,
} from "../../../core/contracts";

interface KentraIconInputs
  extends KentraNameInput<IconName>,
    KentraSizeInput<IconSize>,
    KentraWeightInput<IconWeight>,
    KentraColorInput<string> {}

interface KentraIconOutputs extends KentraClickOutput {}

interface KentraIconSlots {}

export interface KentraIconContract extends KentraIconInputs, KentraIconOutputs, KentraIconSlots {}
