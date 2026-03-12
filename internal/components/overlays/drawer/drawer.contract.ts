import type {
  DrawerVariant,
  DrawerState,
} from "./drawer.tokens";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraDrawerInputs extends KentraVariantInput<DrawerVariant>, KentraStateInput<DrawerState> {}

interface KentraDrawerOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

export interface KentraDrawerContract extends KentraDrawerInputs, KentraDrawerOutputs {}
