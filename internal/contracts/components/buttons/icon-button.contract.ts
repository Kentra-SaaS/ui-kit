import type {
  IconButtonVariant,
  IconButtonSize,
  IconButtonState,
} from "../../../tokens/components";
import type {
  KentraClickOutput,
  KentraSizeInput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraIconButtonInputs extends KentraVariantInput<IconButtonVariant>, KentraSizeInput<IconButtonSize>, KentraStateInput<IconButtonState> {}

interface KentraIconButtonOutputs extends KentraClickOutput {}

export interface KentraIconButtonContract extends KentraIconButtonInputs, KentraIconButtonOutputs {}
