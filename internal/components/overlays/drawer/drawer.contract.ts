import type { InputSignal } from "@angular/core";
import type {
  DrawerVariant,
  DrawerState,
} from "./drawer.tokens";
import type {
  KentraClosedOutput,
  KentraOpenedOutput,
  KentraStateInput,
  KentraVariantInput,
} from "../../../core/contracts";

interface KentraDrawerInputs extends KentraVariantInput<DrawerVariant>, KentraStateInput<DrawerState> {
  readonly title: InputSignal<string | null>;
  readonly description: InputSignal<string | null>;
  readonly ariaLabel: InputSignal<string | null>;
  readonly dismissible: InputSignal<boolean>;
  readonly closeOnBackdrop: InputSignal<boolean>;
  readonly closeOnEscape: InputSignal<boolean>;
}

interface KentraDrawerOutputs extends KentraOpenedOutput, KentraClosedOutput<void> {}

interface KentraDrawerSlots {}

export interface KentraDrawerContract extends KentraDrawerInputs, KentraDrawerOutputs, KentraDrawerSlots {}
