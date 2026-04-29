import { Injectable, Signal, computed, signal } from "@angular/core";

import { ModalState } from "@kentra-saas/ui-kit";

export interface KentraModalRegistryEntry {
  readonly id: string;
  readonly state: ModalState;
}

@Injectable({ providedIn: "root" })
export class KentraModalService {
  readonly registry = computed(() => this.stateStore());

  private readonly stateStore = signal<Readonly<Record<string, ModalState>>>({});
  private readonly stateSignalCache = new Map<string, Signal<ModalState>>();
  private readonly openSignalCache = new Map<string, Signal<boolean>>();

  open(id: string): void {
    this.setState(id, "open");
  }

  close(id: string): void {
    this.setState(id, "closed");
  }

  toggle(id: string): void {
    const normalizedId = this.normalizeId(id);
    if (normalizedId === null) {
      return;
    }

    const nextState = this.currentState(normalizedId) === "open" ? "closed" : "open";
    this.setState(normalizedId, nextState);
  }

  closeAll(): void {
    this.stateStore.set({});
  }

  setState(id: string, state: ModalState): void {
    const normalizedId = this.normalizeId(id);
    if (normalizedId === null) {
      return;
    }

    this.stateStore.update((previous) => {
      const currentState = previous[normalizedId] ?? "closed";

      if (currentState === state) {
        return previous;
      }

      if (state === "closed") {
        if (!(normalizedId in previous)) {
          return previous;
        }

        const { [normalizedId]: _removed, ...remainingEntries } = previous;
        return remainingEntries;
      }

      return {
        ...previous,
        [normalizedId]: state,
      };
    });
  }

  stateFor(id: string): Signal<ModalState> {
    const normalizedId = this.normalizeId(id);
    if (normalizedId === null) {
      return computed(() => "closed");
    }

    const cachedSignal = this.stateSignalCache.get(normalizedId);
    if (cachedSignal !== undefined) {
      return cachedSignal;
    }

    const nextSignal = computed(() => this.currentState(normalizedId));
    this.stateSignalCache.set(normalizedId, nextSignal);

    return nextSignal;
  }

  isOpen(id: string): Signal<boolean> {
    const normalizedId = this.normalizeId(id);
    if (normalizedId === null) {
      return computed(() => false);
    }

    const cachedSignal = this.openSignalCache.get(normalizedId);
    if (cachedSignal !== undefined) {
      return cachedSignal;
    }

    const stateSignal = this.stateFor(normalizedId);
    const nextSignal = computed(() => stateSignal() === "open");
    this.openSignalCache.set(normalizedId, nextSignal);

    return nextSignal;
  }

  entries(): readonly KentraModalRegistryEntry[] {
    return Object.entries(this.stateStore()).map(([id, state]) => ({
      id,
      state,
    }));
  }

  private currentState(id: string): ModalState {
    return this.stateStore()[id] ?? "closed";
  }

  private normalizeId(id: string): string | null {
    const normalizedId = id.trim();
    return normalizedId.length > 0 ? normalizedId : null;
  }
}
