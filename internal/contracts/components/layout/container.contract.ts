import type {
  ContainerSize,
} from "../../../tokens/components";
import type {
  KentraSizeInput,
} from "../../core";

interface KentraContainerInputs extends KentraSizeInput<ContainerSize> {}

interface KentraContainerOutputs {}

export interface KentraContainerContract extends KentraContainerInputs, KentraContainerOutputs {}
