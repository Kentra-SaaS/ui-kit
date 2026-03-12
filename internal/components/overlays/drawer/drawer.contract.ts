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

interface KentraDrawerHeaderSlot {}
interface KentraDrawerBodySlot {}
interface KentraDrawerFooterSlot {}

interface KentraDrawerSlots extends KentraContentChildSlots<{
  header: KentraDrawerHeaderSlot;
  body: KentraDrawerBodySlot;
  footer: KentraDrawerFooterSlot;
}> {}

export interface KentraDrawerContract extends KentraDrawerInputs, KentraDrawerOutputs, KentraDrawerSlots {}
