import type {
  LinkVariant,
  LinkState,
} from "../../../tokens/components";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraLinkInputs extends KentraVariantInput<LinkVariant>, KentraStateInput<LinkState> {}

interface KentraLinkOutputs extends KentraClickOutput {}

export interface KentraLinkContract extends KentraLinkInputs, KentraLinkOutputs {}
