import type { ComponentStyleMap } from "./core";
import { buttonStyleMap } from "./components";

export const componentStyleMaps = [buttonStyleMap] as const satisfies readonly ComponentStyleMap[];

export type ComponentStyleMapId = (typeof componentStyleMaps)[number]["id"];

export const getComponentStyleMap = (
  id: ComponentStyleMapId,
): (typeof componentStyleMaps)[number] | undefined =>
  componentStyleMaps.find((styleMap) => styleMap.id === id);
