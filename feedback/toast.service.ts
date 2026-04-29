import { Injectable, Signal, computed, signal } from "@angular/core";
import {
  IconName,
  ToastState,
  ToastVariant,
} from "@kentra-saas/ui-kit";

export type KentraToastPlacement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface KentraToastOptions {
  readonly id?: string;
  readonly variant?: ToastVariant;
  readonly icon?: IconName | null;
  readonly title?: string | null;
  readonly message?: string | null;
  readonly dismissible?: boolean;
  readonly duration?: number | null;
  readonly ariaLive?: "polite" | "assertive" | null;
  readonly placement?: KentraToastPlacement;
}

export interface KentraManagedToast {
  readonly id: string;
  readonly state: ToastState;
  readonly variant: ToastVariant;
  readonly icon: IconName | null;
  readonly title: string | null;
  readonly message: string | null;
  readonly dismissible: boolean;
  readonly duration: number | null;
  readonly ariaLive: "polite" | "assertive" | null;
  readonly placement: KentraToastPlacement;
  readonly createdAt: number;
}

let toastInstanceCounter = 0;

@Injectable({ providedIn: "root" })
export class KentraToastService {
  readonly toasts = computed(() => this.toastStore());

  private readonly toastStore = signal<readonly KentraManagedToast[]>([]);
  private readonly enterTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly dismissTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly removeTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly exitDurationMs = 220;

  show(options: KentraToastOptions): string {
    const id = this.normalizeId(options.id);

    this.clearTimersForToast(id);

    const nextToast: KentraManagedToast = {
      id,
      state: "enter",
      variant: options.variant ?? "info",
      icon: this.normalizeIcon(options.icon ?? null),
      title: this.normalizeText(options.title ?? null),
      message: this.normalizeText(options.message ?? null),
      dismissible: options.dismissible ?? false,
      duration: options.duration ?? null,
      ariaLive: options.ariaLive ?? null,
      placement: options.placement ?? "bottom-right",
      createdAt: Date.now(),
    };

    this.toastStore.update((previous) => [
      ...previous.filter((toast) => toast.id !== id),
      nextToast,
    ]);

    const enterTimer = globalThis.setTimeout(() => {
      this.setToastState(id, "visible");
      this.scheduleAutoClose(id);
    }, 16);

    this.enterTimers.set(id, enterTimer);

    return id;
  }

  close(id: string): void {
    const normalizedId = this.normalizeText(id);
    if (normalizedId === null) {
      return;
    }

    const toast = this.toastStore().find((item) => item.id === normalizedId);
    if (toast === undefined) {
      return;
    }

    if (toast.state === "exit") {
      return;
    }

    this.clearTimer(this.enterTimers, normalizedId);
    this.clearTimer(this.dismissTimers, normalizedId);

    this.setToastState(normalizedId, "exit");

    const removeTimer = globalThis.setTimeout(() => {
      this.remove(normalizedId);
    }, this.exitDurationMs);

    this.removeTimers.set(normalizedId, removeTimer);
  }

  closeAll(): void {
    for (const toast of this.toastStore()) {
      this.close(toast.id);
    }
  }

  remove(id: string): void {
    const normalizedId = this.normalizeText(id);
    if (normalizedId === null) {
      return;
    }

    this.clearTimersForToast(normalizedId);
    this.toastStore.update((previous) =>
      previous.filter((toast) => toast.id !== normalizedId),
    );
  }

  clear(): void {
    this.clearAllTimers(this.enterTimers);
    this.clearAllTimers(this.dismissTimers);
    this.clearAllTimers(this.removeTimers);
    this.toastStore.set([]);
  }

  toastsForPlacement(
    placement: KentraToastPlacement,
  ): Signal<readonly KentraManagedToast[]> {
    return computed(() =>
      this.toasts().filter((toast) => toast.placement === placement),
    );
  }

  private setToastState(id: string, state: ToastState): void {
    this.toastStore.update((previous) =>
      previous.map((toast) =>
        toast.id === id
          ? {
              ...toast,
              state,
            }
          : toast,
      ),
    );
  }

  private scheduleAutoClose(id: string): void {
    const toast = this.toastStore().find((item) => item.id === id);
    if (toast === undefined) {
      return;
    }

    if (toast.duration === null || toast.duration <= 0) {
      return;
    }

    this.clearTimer(this.dismissTimers, id);

    const dismissTimer = globalThis.setTimeout(() => {
      this.close(id);
    }, toast.duration);

    this.dismissTimers.set(id, dismissTimer);
  }

  private normalizeId(value: string | undefined): string {
    const normalized = this.normalizeText(value ?? null);
    if (normalized !== null) {
      return normalized;
    }

    toastInstanceCounter += 1;
    return `k-toast-${toastInstanceCounter}`;
  }

  private normalizeIcon(value: IconName | null): IconName | null {
    if (value === null || value === "") {
      return null;
    }

    return value;
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }

  private clearTimersForToast(id: string): void {
    this.clearTimer(this.enterTimers, id);
    this.clearTimer(this.dismissTimers, id);
    this.clearTimer(this.removeTimers, id);
  }

  private clearTimer(
    timers: Map<string, ReturnType<typeof setTimeout>>,
    id: string,
  ): void {
    const timer = timers.get(id);
    if (timer === undefined) {
      return;
    }

    globalThis.clearTimeout(timer);
    timers.delete(id);
  }

  private clearAllTimers(timers: Map<string, ReturnType<typeof setTimeout>>): void {
    for (const timer of timers.values()) {
      globalThis.clearTimeout(timer);
    }

    timers.clear();
  }
}
