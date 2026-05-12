import type { CardSize, CardVariant } from "./card.tokens";
import type { KentraSizeInput, KentraVariantInput } from "../../../core/contracts";

interface KentraCardInputs
  extends KentraVariantInput<CardVariant>,
    KentraSizeInput<CardSize> {}

interface KentraCardOutputs {}

interface KentraCardSlots {}

export interface KentraCardContract
  extends KentraCardInputs,
    KentraCardOutputs,
    KentraCardSlots {}
