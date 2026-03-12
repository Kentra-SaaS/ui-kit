import type {
  HeadingVariant,
} from "../../../tokens/components";
import type {
  KentraVariantInput,
} from "../../core";

interface KentraHeadingInputs extends KentraVariantInput<HeadingVariant> {}

interface KentraHeadingOutputs {}

export interface KentraHeadingContract extends KentraHeadingInputs, KentraHeadingOutputs {}
