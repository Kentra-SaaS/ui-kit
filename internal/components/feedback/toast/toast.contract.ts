import type {
  ToastVariant,
  ToastState,
} from "./toast.tokens";
import type {
  KentraClosedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraToastInputs extends KentraVariantInput<ToastVariant>, KentraStateInput<ToastState> {}

interface KentraToastOutputs extends KentraClosedOutput<void> {}

export interface KentraToastContract extends KentraToastInputs, KentraToastOutputs {}
