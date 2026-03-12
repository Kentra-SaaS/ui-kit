import type {
  SectionVariant,
} from "./section.tokens";
import type {
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraSectionInputs extends KentraVariantInput<SectionVariant> {}

interface KentraSectionOutputs {}

export interface KentraSectionContract extends KentraSectionInputs, KentraSectionOutputs {}
