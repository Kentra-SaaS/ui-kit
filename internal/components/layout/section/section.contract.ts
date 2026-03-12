import type {
  SectionVariant,
} from "./section.tokens";
import type {
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraSectionInputs extends KentraVariantInput<SectionVariant> {}

interface KentraSectionOutputs {}

interface KentraSectionSlots extends KentraContentChildSlots<{
  header: unknown;
  actions: unknown;
}> {}

export interface KentraSectionContract extends KentraSectionInputs, KentraSectionOutputs, KentraSectionSlots {}
