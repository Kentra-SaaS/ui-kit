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

interface KentraBreadcrumbsInputs extends KentraVariantInput<BreadcrumbsVariant>, KentraStateInput<BreadcrumbsState> {}

interface KentraBreadcrumbsOutputs extends KentraClickOutput, KentraSelectionChangedOutput<string> {}

interface KentraBreadcrumbsSlots extends KentraContentChildrenSlots<{
  items: unknown;
}> {}

export interface KentraBreadcrumbsContract extends KentraBreadcrumbsInputs, KentraBreadcrumbsOutputs, KentraBreadcrumbsSlots {}
