import type {
  TextVariant,
} from "./text.tokens";
import type {
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraTextInputs extends KentraVariantInput<TextVariant> {}

interface KentraTextOutputs {}

export interface KentraTextContract extends KentraTextInputs, KentraTextOutputs {}
