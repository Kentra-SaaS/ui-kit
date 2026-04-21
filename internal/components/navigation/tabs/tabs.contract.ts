import type { InputSignal } from "@angular/core";
import type {
  TabsVariant,
  TabsState,
} from "./tabs.tokens";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

export interface KentraTabItem {
  readonly id: string;
  readonly label: string;
  readonly disabled?: boolean;
}

interface KentraTabsInputs extends KentraVariantInput<TabsVariant>, KentraStateInput<TabsState> {
  readonly items: InputSignal<readonly KentraTabItem[]>;
  readonly activeTabId: InputSignal<string | null>;
  readonly orientation: InputSignal<"horizontal" | "vertical">;
  readonly lazy: InputSignal<boolean>;
  readonly disabled: InputSignal<boolean>;
}

interface KentraTabsOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraTabsSlots {}

export interface KentraTabsContract extends KentraTabsInputs, KentraTabsOutputs, KentraTabsSlots {}
