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

interface KentraModalHeaderSlot {}
interface KentraModalBodySlot {}
interface KentraModalFooterSlot {}

interface KentraModalSlots extends KentraContentChildSlots<{
  header: KentraModalHeaderSlot;
  body: KentraModalBodySlot;
  footer: KentraModalFooterSlot;
}> {}

export interface KentraModalContract extends KentraModalInputs, KentraModalOutputs, KentraModalSlots {}
