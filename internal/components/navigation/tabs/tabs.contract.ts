import type {
  TabsVariant,
  TabsState,
} from "./tabs.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraTabsInputs extends KentraVariantInput<TabsVariant>, KentraStateInput<TabsState> {}

interface KentraTabsOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraTabsContract extends KentraTabsInputs, KentraTabsOutputs {}
