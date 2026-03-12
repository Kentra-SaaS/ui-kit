import type {
  ContainerSize,
} from "./container.tokens";
import type {
  KentraSizeInput,
} from "../../../core/contracts";

interface KentraContainerInputs extends KentraSizeInput<ContainerSize> {}

interface KentraContainerOutputs {}

export interface KentraContainerContract extends KentraContainerInputs, KentraContainerOutputs {}
