import type {
  ModalVariant,
  ModalState,
} from "./modal.tokens";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraModalInputs extends KentraVariantInput<ModalVariant>, KentraStateInput<ModalState> {}

interface KentraModalOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

export interface KentraModalContract extends KentraModalInputs, KentraModalOutputs {}
