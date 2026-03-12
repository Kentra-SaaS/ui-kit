import type {
  BreadcrumbsVariant,
  BreadcrumbsState,
} from "../../../tokens/components";
import type {
  KentraClickOutput,
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraBreadcrumbsInputs extends KentraVariantInput<BreadcrumbsVariant>, KentraStateInput<BreadcrumbsState> {}

interface KentraBreadcrumbsOutputs extends KentraClickOutput, KentraSelectionChangedOutput<string> {}

export interface KentraBreadcrumbsContract extends KentraBreadcrumbsInputs, KentraBreadcrumbsOutputs {}
