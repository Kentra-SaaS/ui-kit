import type {
  DropdownMenuVariant,
  DropdownMenuState,
} from "../../../tokens/components";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraDropdownMenuInputs extends KentraVariantInput<DropdownMenuVariant>, KentraStateInput<DropdownMenuState> {}

interface KentraDropdownMenuOutputs extends KentraOpenedOutput, KentraClosedOutput<void>, KentraSelectionChangedOutput<string> {}

export interface KentraDropdownMenuContract extends KentraDropdownMenuInputs, KentraDropdownMenuOutputs {}
