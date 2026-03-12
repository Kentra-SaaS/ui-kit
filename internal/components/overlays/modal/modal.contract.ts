import type {
  ModalVariant,
  ModalState,
} from "./modal.tokens";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraModalInputs extends KentraVariantInput<ModalVariant>, KentraStateInput<ModalState> {}

interface KentraModalOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

interface KentraModalSlots extends KentraContentChildSlots<{
  header: unknown;
  body: unknown;
  footer: unknown;
}> {}

export interface KentraModalContract extends KentraModalInputs, KentraModalOutputs, KentraModalSlots {}
