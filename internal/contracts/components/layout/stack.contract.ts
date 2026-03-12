import type {
  StackGap,
  StackAlign,
} from "../../../tokens/components";
import type {
  KentraAlignInput,
  KentraGapInput,
} from "../../core";

interface KentraStackInputs extends KentraGapInput<StackGap>, KentraAlignInput<StackAlign> {}

interface KentraStackOutputs {}

export interface KentraStackContract extends KentraStackInputs, KentraStackOutputs {}
