import type { InputSignal } from "@angular/core";
import type {
  DividerOrientation,
  DividerSpacing,
  DividerVariant,
} from "./divider.tokens";
import type {
  KentraOrientationInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraDividerInputs
  extends KentraOrientationInput<DividerOrientation>,
    KentraVariantInput<DividerVariant> {
  readonly spacing: InputSignal<DividerSpacing>;
}

interface KentraDividerOutputs {}

interface KentraDividerSlots {}

export interface KentraDividerContract extends KentraDividerInputs, KentraDividerOutputs, KentraDividerSlots {}
