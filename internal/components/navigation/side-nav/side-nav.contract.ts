import type {
  SideNavVariant,
  SideNavState,
} from "./side-nav.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraSideNavInputs extends KentraVariantInput<SideNavVariant>, KentraStateInput<SideNavState> {}

interface KentraSideNavOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraSideNavContract extends KentraSideNavInputs, KentraSideNavOutputs {}
