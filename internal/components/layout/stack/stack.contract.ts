import type {
  StackGap,
  StackAlign,
  StackOrientation,
} from "./stack.tokens";
import type {
  KentraAlignInput,
  KentraGapInput,
  KentraOrientationInput,
} from "../../../core/contracts";

interface KentraStackInputs
  extends KentraGapInput<StackGap>,
    KentraAlignInput<StackAlign>,
    KentraOrientationInput<StackOrientation> {}

interface KentraStackOutputs {}

interface KentraStackSlots {}

export interface KentraStackContract extends KentraStackInputs, KentraStackOutputs, KentraStackSlots {}
