import type { InputSignal } from "@angular/core";
import type {
  BreadcrumbsVariant,
  BreadcrumbsState,
} from "./breadcrumbs.tokens";
import type {
  KentraClickOutput,
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildrenSlots,
} from "../../../core/contracts";

interface KentraBreadcrumbsInputs extends KentraVariantInput<BreadcrumbsVariant>, KentraStateInput<BreadcrumbsState> {
  readonly activeItemId: InputSignal<string | null>;
}

interface KentraBreadcrumbsOutputs extends KentraClickOutput, KentraSelectionChangedOutput<string> {}

interface KentraBreadcrumbsItemsSlot {}

interface KentraBreadcrumbsSlots extends KentraContentChildrenSlots<{
  items: KentraBreadcrumbsItemsSlot;
}> {}

export interface KentraBreadcrumbsContract extends KentraBreadcrumbsInputs, KentraBreadcrumbsOutputs, KentraBreadcrumbsSlots {}
