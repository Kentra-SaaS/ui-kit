import type { OutputEmitterRef } from "@angular/core";

/**
 * Generic change event payload.
 */
export interface KentraChangeEvent<TValue> {
  readonly value: TValue;
  readonly previousValue: TValue | null;
  readonly userTriggered: boolean;
}

/**
 * Generic click output contract.
 */
export interface KentraClickOutput<TEvent = MouseEvent> {
  readonly click: OutputEmitterRef<TEvent>;
}

/**
 * Generic value-change output contract.
 */
export interface KentraValueChangedOutput<TValue> {
  readonly valueChanged: OutputEmitterRef<KentraChangeEvent<TValue>>;
}

/**
 * Selection-change output contract.
 */
export interface KentraSelectionChangedOutput<TSelection> {
  readonly selectionChanged: OutputEmitterRef<KentraChangeEvent<TSelection>>;
}

/**
 * Lifecycle-like open event output contracts.
 */
export interface KentraOpenedOutput {
  readonly opened: OutputEmitterRef<void>;
}

export interface KentraClosedOutput<TResult = void> {
  readonly closed: OutputEmitterRef<TResult>;
}

/**
 * Focus state output contracts.
 */
export interface KentraFocusOutput {
  readonly focused: OutputEmitterRef<FocusEvent>;
}

export interface KentraBlurOutput {
  readonly blurred: OutputEmitterRef<FocusEvent>;
}
