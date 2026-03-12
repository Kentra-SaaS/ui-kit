import type { InputSignal } from "@angular/core";
import type {
  DropdownMenuVariant,
  DropdownMenuState,
} from "./dropdown-menu.tokens";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
  KentraContentChildrenSlots,
} from "../../../core/contracts";

interface KentraDropdownMenuInputs extends KentraVariantInput<DropdownMenuVariant>, KentraStateInput<DropdownMenuState> {
  readonly activeItemId: InputSignal<string | null>;
}

interface KentraDropdownMenuOutputs extends KentraOpenedOutput, KentraClosedOutput<void>, KentraSelectionChangedOutput<string> {}

interface KentraDropdownMenuGroupsSlot {}
interface KentraDropdownMenuItemsSlot {}

interface KentraDropdownMenuSlots extends KentraContentChildrenSlots<{
  groups: KentraDropdownMenuGroupsSlot;
  items: KentraDropdownMenuItemsSlot;
}> {}

export interface KentraDropdownMenuContract extends KentraDropdownMenuInputs, KentraDropdownMenuOutputs, KentraDropdownMenuSlots {}
