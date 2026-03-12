import type {
  ButtonVariant,
  ButtonSize,
  ButtonState,
} from "../../../tokens/components";
import type {
  KentraClickOutput,
  KentraSizeInput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraButtonInputs extends KentraVariantInput<ButtonVariant>, KentraSizeInput<ButtonSize>, KentraStateInput<ButtonState> {}
interface KentraButtonOutputs extends KentraClickOutput {}

export interface KentraButtonContract extends KentraButtonInputs, KentraButtonOutputs {}
