import type {
  ModalVariant,
  ModalState,
} from "../../../tokens/components";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraModalInputs extends KentraVariantInput<ModalVariant>, KentraStateInput<ModalState> {}

interface KentraModalOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

export interface KentraModalContract extends KentraModalInputs, KentraModalOutputs {}
