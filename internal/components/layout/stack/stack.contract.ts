import type {
  StackGap,
  StackAlign,
} from "./stack.tokens";
import type {
  KentraAlignInput,
  KentraGapInput,
} from "../../../core/contracts";

interface KentraStackInputs extends KentraGapInput<StackGap>, KentraAlignInput<StackAlign> {}

interface KentraStackOutputs {}

export interface KentraStackContract extends KentraStackInputs, KentraStackOutputs {}
