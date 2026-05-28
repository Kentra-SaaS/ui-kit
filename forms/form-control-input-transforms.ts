export function coerceBooleanInput(value: unknown): boolean {
  return value === true || value === "" || value === "true";
}

export function coerceStringInput(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

export function coerceOptionalNumberInput(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}
