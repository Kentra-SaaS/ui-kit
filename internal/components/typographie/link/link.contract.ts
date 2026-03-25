import type { InputSignal } from "@angular/core";
import type {
  LinkVariant,
  LinkState,
} from "./link.tokens";
import type {
  KentraClickOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraLinkInputs
  extends KentraVariantInput<LinkVariant>,
    KentraStateInput<LinkState> {
  readonly href: InputSignal<string | null>;
  readonly routerLink: InputSignal<string | unknown[] | null>;
  readonly target: InputSignal<string | null>;
  readonly rel: InputSignal<string | null>;
  readonly disabled: InputSignal<boolean>;
}

interface KentraLinkOutputs extends KentraClickOutput {}

interface KentraLinkSlots {}

export interface KentraLinkContract extends KentraLinkInputs, KentraLinkOutputs, KentraLinkSlots {}
