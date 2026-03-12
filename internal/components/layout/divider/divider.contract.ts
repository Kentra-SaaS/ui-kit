import type {
  DividerOrientation,
  DividerVariant,
} from "./divider.tokens";
import type {
  KentraOrientationInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraDividerInputs extends KentraOrientationInput<DividerOrientation>, KentraVariantInput<DividerVariant> {}

interface KentraDividerOutputs {}

export interface KentraDividerContract extends KentraDividerInputs, KentraDividerOutputs {}
