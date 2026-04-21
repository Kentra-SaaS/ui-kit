import type { InputSignal } from "@angular/core";
import type {
  SideNavVariant,
  SideNavState,
} from "./side-nav.tokens";
import type { IconName } from "../../icons/icon";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

export type SideNavRouterLinkCommands = string | readonly unknown[];

export interface KentraSideNavItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: IconName | null;
  readonly href?: string | null;
  readonly routerLink?: SideNavRouterLinkCommands | null;
  readonly target?: string | null;
  readonly rel?: string | null;
  readonly disabled?: boolean;
}

export interface KentraSideNavGroup {
  readonly id: string;
  readonly title?: string | null;
  readonly items: readonly KentraSideNavItem[];
}

interface KentraSideNavInputs extends KentraVariantInput<SideNavVariant>, KentraStateInput<SideNavState> {
  readonly groups: InputSignal<readonly KentraSideNavGroup[]>;
  readonly items: InputSignal<readonly KentraSideNavItem[]>;
  readonly activeItemId: InputSignal<string | null>;
  readonly ariaLabel: InputSignal<string>;
  readonly disabled: InputSignal<boolean>;
}

interface KentraSideNavOutputs extends KentraSelectionChangedOutput<string> {}

interface KentraSideNavSlots {}

export interface KentraSideNavContract extends KentraSideNavInputs, KentraSideNavOutputs, KentraSideNavSlots {}
