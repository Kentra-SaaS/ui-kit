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
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraButtonInputs extends KentraVariantInput<ButtonVariant>, KentraSizeInput<ButtonSize>, KentraStateInput<ButtonState> {}
interface KentraButtonOutputs extends KentraClickOutput {}

interface KentraButtonSlots extends KentraContentChildSlots<{
  leadingIcon: unknown;
  trailingIcon: unknown;
}> {}

export interface KentraButtonContract extends KentraButtonInputs, KentraButtonOutputs, KentraButtonSlots {}
