import type {
  DrawerVariant,
  DrawerState,
} from "../../../tokens/components";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraDrawerInputs extends KentraVariantInput<DrawerVariant>, KentraStateInput<DrawerState> {}

interface KentraDrawerOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

export interface KentraDrawerContract extends KentraDrawerInputs, KentraDrawerOutputs {}
