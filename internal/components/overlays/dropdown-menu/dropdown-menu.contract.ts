import type { InputSignal, OutputEmitterRef } from "@angular/core";
import type {
  DropdownMenuVariant,
  DropdownMenuState,
} from "./dropdown-menu.tokens";
import type { IconName } from "../../icons/icon";
import type {
  KentraClosedOutput,
  KentraChangeEvent,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

export interface KentraDropdownMenuItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: IconName | null;
  readonly disabled?: boolean;
  readonly danger?: boolean;
}

export interface KentraDropdownMenuGroup {
  readonly id: string;
  readonly label?: string;
  readonly items: readonly KentraDropdownMenuItem[];
}

interface KentraDropdownMenuInputs extends KentraVariantInput<DropdownMenuVariant>, KentraStateInput<DropdownMenuState> {
  readonly activeItemId: InputSignal<string | null>;
  readonly triggerLabel: InputSignal<string>;
  readonly disabled: InputSignal<boolean>;
  readonly closeOnSelect: InputSignal<boolean>;
  readonly items: InputSignal<readonly KentraDropdownMenuItem[]>;
  readonly groups: InputSignal<readonly KentraDropdownMenuGroup[]>;
}

interface KentraDropdownMenuOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {
  readonly selectionChanged: OutputEmitterRef<KentraChangeEvent<string>>;
}

interface KentraDropdownMenuSlots {}

export interface KentraDropdownMenuContract extends KentraDropdownMenuInputs, KentraDropdownMenuOutputs, KentraDropdownMenuSlots {}
