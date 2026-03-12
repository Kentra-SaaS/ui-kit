import type {
  BreadcrumbsVariant,
  BreadcrumbsState,
} from "./breadcrumbs.tokens";
import type {
  KentraClickOutput,
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraBreadcrumbsInputs extends KentraVariantInput<BreadcrumbsVariant>, KentraStateInput<BreadcrumbsState> {}

interface KentraBreadcrumbsOutputs extends KentraClickOutput, KentraSelectionChangedOutput<string> {}

export interface KentraBreadcrumbsContract extends KentraBreadcrumbsInputs, KentraBreadcrumbsOutputs {}
