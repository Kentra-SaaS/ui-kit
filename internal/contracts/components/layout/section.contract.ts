import type {
  SectionVariant,
} from "../../../tokens/components";
import type {
  KentraVariantInput,
} from "../../core";

interface KentraSectionInputs extends KentraVariantInput<SectionVariant> {}

interface KentraSectionOutputs {}

export interface KentraSectionContract extends KentraSectionInputs, KentraSectionOutputs {}
