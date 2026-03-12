import type { InputSignal } from "@angular/core";
import type { IconTokensContract } from "../../../tokens/core/contracts";
import type {
  KentraClickOutput,
  KentraColorInput,
  KentraSizeInput,
  KentraWeightInput,
} from "../../core";

export type KentraIconSize = keyof IconTokensContract["size"];
export type KentraIconWeight = "regular" | "thin" | "light" | "bold" | "fill" | "duotone";
export type KentraIconName = string;

interface KentraIconInputs
  extends KentraSizeInput<KentraIconSize>,
    KentraWeightInput<KentraIconWeight>,
    KentraColorInput<string> {
  readonly name: InputSignal<KentraIconName>;
}

interface KentraIconOutputs extends KentraClickOutput {}

export interface KentraIconContract extends KentraIconInputs, KentraIconOutputs {}
