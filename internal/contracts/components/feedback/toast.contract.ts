import type {
  ToastVariant,
  ToastState,
} from "../../../tokens/components";
import type {
  KentraClosedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraToastInputs extends KentraVariantInput<ToastVariant>, KentraStateInput<ToastState> {}

interface KentraToastOutputs extends KentraClosedOutput<void> {}

export interface KentraToastContract extends KentraToastInputs, KentraToastOutputs {}
