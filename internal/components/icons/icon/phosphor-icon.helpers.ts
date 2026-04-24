import type { IconWeight } from './icon.tokens';
import { phosphorDuotoneCodeMap } from './phosphor-duotone-map';

export const resolvePhosphorLigatureName = (
  name: string | null,
  weight: IconWeight,
): string | null => {
  if (name === null) {
    return null;
  }

  switch (weight) {
    case 'regular':
      return name;
    case 'duotone':
      return null;
    default:
      return `${name}-${weight}`;
  }
};

export const resolvePhosphorDuotoneCodes = (
  name: string | null,
): readonly [number, number] | null => {
  if (name === null) {
    return null;
  }

  return phosphorDuotoneCodeMap[name] ?? null;
};

export const formatPhosphorCodepointForCss = (
  code: number | null,
): string | null => {
  if (code === null) {
    return null;
  }

  return `"\\${code.toString(16).padStart(4, '0')}"`;
};
