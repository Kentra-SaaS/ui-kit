import type {
  ButtonVariant,
  ButtonSize,
  ButtonState,
} from "./button.tokens";
import type {
  KentraClickOutput,
  KentraSizeInput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraButtonInputs extends KentraVariantInput<ButtonVariant>, KentraSizeInput<ButtonSize>, KentraStateInput<ButtonState> {}
interface KentraButtonOutputs extends KentraClickOutput {}

export interface KentraButtonContract extends KentraButtonInputs, KentraButtonOutputs {}
