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
} from "../../../core/contracts";

export type BreadcrumbsRouterLinkCommands = string | readonly unknown[];

export interface KentraBreadcrumbItem {
  readonly id: string;
  readonly label: string;
  readonly href?: string | null;
  readonly routerLink?: BreadcrumbsRouterLinkCommands | null;
  readonly target?: string | null;
  readonly rel?: string | null;
  readonly disabled?: boolean;
}

interface KentraBreadcrumbsInputs extends KentraVariantInput<BreadcrumbsVariant>, KentraStateInput<BreadcrumbsState> {
  readonly items: InputSignal<readonly KentraBreadcrumbItem[]>;
  readonly activeItemId: InputSignal<string | null>;
  readonly separator: InputSignal<string>;
  readonly maxItems: InputSignal<number | null>;
  readonly ariaLabel: InputSignal<string>;
  readonly disabled: InputSignal<boolean>;
}

interface KentraBreadcrumbsOutputs extends KentraClickOutput, KentraSelectionChangedOutput<string> {}

interface KentraBreadcrumbsSlots {}

export interface KentraBreadcrumbsContract extends KentraBreadcrumbsInputs, KentraBreadcrumbsOutputs, KentraBreadcrumbsSlots {}
