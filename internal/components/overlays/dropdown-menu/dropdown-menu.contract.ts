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

interface KentraDropdownMenuInputs extends KentraVariantInput<DropdownMenuVariant>, KentraStateInput<DropdownMenuState> {}

interface KentraDropdownMenuOutputs extends KentraOpenedOutput, KentraClosedOutput<void>, KentraSelectionChangedOutput<string> {}

interface KentraDropdownMenuSlots extends KentraContentChildrenSlots<{
  groups: unknown;
  items: unknown;
}> {}

export interface KentraDropdownMenuContract extends KentraDropdownMenuInputs, KentraDropdownMenuOutputs, KentraDropdownMenuSlots {}
