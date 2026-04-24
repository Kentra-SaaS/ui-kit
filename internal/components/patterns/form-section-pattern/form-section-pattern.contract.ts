import type { InputSignal } from "@angular/core";

import type {
  FormSectionPatternState,
  FormSectionPatternVariant,
} from "./form-section-pattern.tokens";
import type {
  KentraContentChildSlots,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraFormSectionPatternInputs
  extends KentraVariantInput<FormSectionPatternVariant>,
    KentraStateInput<FormSectionPatternState> {
  readonly title: InputSignal<string | null>;
  readonly description: InputSignal<string | null>;
  readonly ariaLabel: InputSignal<string | null>;
  readonly alertTitle: InputSignal<string | null>;
  readonly alertMessage: InputSignal<string | null>;
  readonly alertVariant: InputSignal<"info" | "success" | "warning" | "danger">;
  readonly disabled: InputSignal<boolean>;
}

interface KentraFormSectionPatternOutputs {}

interface KentraFormSectionPatternTitleSlot {}
interface KentraFormSectionPatternDescriptionSlot {}
interface KentraFormSectionPatternFieldsSlot {}
interface KentraFormSectionPatternFooterSlot {}
interface KentraFormSectionPatternAsideSlot {}
interface KentraFormSectionPatternHeaderActionsSlot {}

interface KentraFormSectionPatternSlots
  extends KentraContentChildSlots<{
    titleSlot: KentraFormSectionPatternTitleSlot;
    descriptionSlot: KentraFormSectionPatternDescriptionSlot;
    fields: KentraFormSectionPatternFieldsSlot;
    footer: KentraFormSectionPatternFooterSlot;
    aside: KentraFormSectionPatternAsideSlot;
    headerActions: KentraFormSectionPatternHeaderActionsSlot;
  }> {}

export interface KentraFormSectionPatternContract
  extends KentraFormSectionPatternInputs,
    KentraFormSectionPatternOutputs,
    KentraFormSectionPatternSlots {}
