import type { InputSignal } from "@angular/core";
import type {
  SectionVariant,
} from "./section.tokens";
import type {
  KentraVariantInput,
  KentraContentChildSlots,
} from "../../../core/contracts";

interface KentraSectionInputs extends KentraVariantInput<SectionVariant> {
  readonly title: InputSignal<string | null>;
  readonly description: InputSignal<string | null>;
}

interface KentraSectionOutputs {}

interface KentraSectionActionsSlot {}

interface KentraSectionSlots extends KentraContentChildSlots<{
  actions: KentraSectionActionsSlot;
}> {}

export interface KentraSectionContract extends KentraSectionInputs, KentraSectionOutputs, KentraSectionSlots {}
