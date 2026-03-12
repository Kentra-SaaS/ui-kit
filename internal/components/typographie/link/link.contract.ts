import type {
  LinkVariant,
  LinkState,
} from "./link.tokens";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraLinkInputs extends KentraVariantInput<LinkVariant>, KentraStateInput<LinkState> {}

interface KentraLinkOutputs extends KentraClickOutput {}

interface KentraLinkSlots {}

export interface KentraLinkContract extends KentraLinkInputs, KentraLinkOutputs, KentraLinkSlots {}
