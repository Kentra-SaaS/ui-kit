import type {
  TextVariant,
} from "../../../tokens/components";
import type {
  KentraVariantInput,
} from "../../core";

interface KentraTextInputs extends KentraVariantInput<TextVariant> {}

interface KentraTextOutputs {}

export interface KentraTextContract extends KentraTextInputs, KentraTextOutputs {}
