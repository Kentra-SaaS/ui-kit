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
} from "../../../core/contracts";

interface KentraDropdownMenuInputs extends KentraVariantInput<DropdownMenuVariant>, KentraStateInput<DropdownMenuState> {}

interface KentraDropdownMenuOutputs extends KentraOpenedOutput, KentraClosedOutput<void>, KentraSelectionChangedOutput<string> {}

export interface KentraDropdownMenuContract extends KentraDropdownMenuInputs, KentraDropdownMenuOutputs {}
