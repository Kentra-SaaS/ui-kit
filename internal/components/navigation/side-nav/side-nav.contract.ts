import type { InputSignal } from "@angular/core";
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

interface KentraSideNavInputs extends KentraVariantInput<SideNavVariant>, KentraStateInput<SideNavState> {
  readonly activeItemId: InputSignal<string | null>;
}

interface KentraSideNavOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraSideNavGroupsSlot {}
interface KentraSideNavItemsSlot {}

interface KentraSideNavSlots extends KentraContentChildrenSlots<{
  groups: KentraSideNavGroupsSlot;
  items: KentraSideNavItemsSlot;
}> {}

export interface KentraSideNavContract extends KentraSideNavInputs, KentraSideNavOutputs, KentraSideNavSlots {}
