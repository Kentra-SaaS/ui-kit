import type {
  ToastVariant,
  ToastState,
} from "./toast.tokens";
import type {
  KentraClosedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraToastInputs extends KentraVariantInput<ToastVariant>, KentraStateInput<ToastState> {}

interface KentraToastOutputs extends KentraClosedOutput<void> {}

interface KentraToastSlots extends KentraContentChildSlots<{
  icon: unknown;
  title: unknown;
  actions: unknown;
}> {}

export interface KentraToastContract extends KentraToastInputs, KentraToastOutputs, KentraToastSlots {}
