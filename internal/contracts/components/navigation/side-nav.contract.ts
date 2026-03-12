import type {
  SideNavVariant,
  SideNavState,
} from "../../../tokens/components";
import type {
  KentraSelectionChangedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../core";

interface KentraSideNavInputs extends KentraVariantInput<SideNavVariant>, KentraStateInput<SideNavState> {}

interface KentraSideNavOutputs extends KentraSelectionChangedOutput<string> {}

export interface KentraSideNavContract extends KentraSideNavInputs, KentraSideNavOutputs {}
