import type {
  IconButtonVariant,
  IconButtonSize,
  IconButtonState,
} from "./icon-button.tokens";
import type {
  KentraClickOutput,
  KentraSizeInput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraIconButtonInputs extends KentraVariantInput<IconButtonVariant>, KentraSizeInput<IconButtonSize>, KentraStateInput<IconButtonState> {}

interface KentraIconButtonOutputs extends KentraClickOutput {}

export interface KentraIconButtonContract extends KentraIconButtonInputs, KentraIconButtonOutputs {}
