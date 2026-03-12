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

interface KentraTabsInputs extends KentraVariantInput<TabsVariant>, KentraStateInput<TabsState> {}

interface KentraTabsOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraTabsSlots extends KentraContentChildrenSlots<{
  tabs: unknown;
  panels: unknown;
}> {}

export interface KentraTabsContract extends KentraTabsInputs, KentraTabsOutputs, KentraTabsSlots {}
