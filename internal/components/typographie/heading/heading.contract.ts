import type {
  HeadingVariant,
} from "./heading.tokens";
import type {
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraHeadingInputs extends KentraVariantInput<HeadingVariant> {}

interface KentraHeadingOutputs {}

interface KentraHeadingSlots {}

export interface KentraHeadingContract extends KentraHeadingInputs, KentraHeadingOutputs, KentraHeadingSlots {}
