import type { InputSignal } from "@angular/core";
import type {
  TabsVariant,
  TabsState,
} from "./tabs.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildrenSlots,
} from "../../../core/contracts";

interface KentraTabsInputs extends KentraVariantInput<TabsVariant>, KentraStateInput<TabsState> {
  readonly activeTabId: InputSignal<string | null>;
}

interface KentraTabsOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraTabsTabsSlot {}
interface KentraTabsPanelsSlot {}

interface KentraTabsSlots extends KentraContentChildrenSlots<{
  tabs: KentraTabsTabsSlot;
  panels: KentraTabsPanelsSlot;
}> {}

export interface KentraTabsContract extends KentraTabsInputs, KentraTabsOutputs, KentraTabsSlots {}
