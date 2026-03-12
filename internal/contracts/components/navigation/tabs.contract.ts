import type {
  TabsVariant,
  TabsState,
} from "../../../tokens/components";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraTabsInputs extends KentraVariantInput<TabsVariant>, KentraStateInput<TabsState> {}

interface KentraTabsOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraTabsContract extends KentraTabsInputs, KentraTabsOutputs {}
