import type {
  DrawerVariant,
  DrawerState,
} from "./drawer.tokens";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraDrawerInputs extends KentraVariantInput<DrawerVariant>, KentraStateInput<DrawerState> {}

interface KentraDrawerOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

interface KentraDrawerSlots extends KentraContentChildSlots<{
  header: unknown;
  body: unknown;
  footer: unknown;
}> {}

export interface KentraDrawerContract extends KentraDrawerInputs, KentraDrawerOutputs, KentraDrawerSlots {}
