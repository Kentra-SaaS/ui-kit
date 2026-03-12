import type {
  SideNavVariant,
  SideNavState,
} from "./side-nav.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildrenSlots,
} from "../../../core/contracts";

interface KentraSideNavInputs extends KentraVariantInput<SideNavVariant>, KentraStateInput<SideNavState> {}

interface KentraSideNavOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraSideNavSlots extends KentraContentChildrenSlots<{
  groups: unknown;
  items: unknown;
}> {}

export interface KentraSideNavContract extends KentraSideNavInputs, KentraSideNavOutputs, KentraSideNavSlots {}
