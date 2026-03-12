import type {
  DividerOrientation,
  DividerVariant,
} from "../../../tokens/components";
import type {
  KentraOrientationInput,
  KentraVariantInput,
} from "../../core";

interface KentraDividerInputs extends KentraOrientationInput<DividerOrientation>, KentraVariantInput<DividerVariant> {}

interface KentraDividerOutputs {}

export interface KentraDividerContract extends KentraDividerInputs, KentraDividerOutputs {}
