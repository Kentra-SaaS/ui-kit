import { Injectable, NgZone, computed, inject, signal } from "@angular/core";
import {
  KentraBreakpoint,
  KentraViewportRange,
  kentraBreakpointOrder,
  kentraBreakpointToPx,
} from "./breakpoints";

type BreakpointQuery = {
  readonly breakpoint: KentraBreakpoint;
  readonly query: string;
};

@Injectable({
  providedIn: "root",
})
export class KentraBreakpointService {
  private readonly zone = inject(NgZone);
  private readonly activeBreakpointSignal = signal<KentraBreakpoint>("lg");
  private readonly canObserveViewport =
    typeof globalThis !== "undefined" &&
    typeof globalThis.matchMedia === "function";
  private readonly queries: readonly BreakpointQuery[] = kentraBreakpointOrder.map(
    (breakpoint) => ({
      breakpoint,
      query: `(min-width: ${kentraBreakpointToPx(breakpoint)}px)`,
    }),
  );

  readonly activeBreakpoint = this.activeBreakpointSignal.asReadonly();
  readonly range = computed<KentraViewportRange>(() => {
    const activeBreakpoint = this.activeBreakpoint();

    if (activeBreakpoint === "xs" || activeBreakpoint === "sm") {
      return "phone";
    }

    if (activeBreakpoint === "md") {
      return "tablet";
    }

    if (activeBreakpoint === "lg") {
      return "desktop";
    }

    return "wide";
  });
  readonly isPhone = computed(() => this.range() === "phone");
  readonly isTablet = computed(() => this.range() === "tablet");
  readonly isDesktop = computed(() => this.range() === "desktop" || this.range() === "wide");
  readonly isWide = computed(() => this.range() === "wide");

  constructor() {
    if (!this.canObserveViewport) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      const mediaQueries = this.queries.map(({ breakpoint, query }) => ({
        breakpoint,
        mediaQuery: globalThis.matchMedia(query),
      }));

      const update = () => {
        const nextBreakpoint =
          [...mediaQueries].reverse().find(({ mediaQuery }) => mediaQuery.matches)
            ?.breakpoint ?? "xs";

        this.zone.run(() => {
          this.activeBreakpointSignal.set(nextBreakpoint);
        });
      };

      for (const { mediaQuery } of mediaQueries) {
        mediaQuery.addEventListener("change", update);
      }

      update();
    });
  }

  isAtLeast(breakpoint: KentraBreakpoint): boolean {
    return this.indexOf(this.activeBreakpoint()) >= this.indexOf(breakpoint);
  }

  isBelow(breakpoint: KentraBreakpoint): boolean {
    return this.indexOf(this.activeBreakpoint()) < this.indexOf(breakpoint);
  }

  isBetween(from: KentraBreakpoint, to: KentraBreakpoint): boolean {
    const activeIndex = this.indexOf(this.activeBreakpoint());

    return activeIndex >= this.indexOf(from) && activeIndex < this.indexOf(to);
  }

  private indexOf(breakpoint: KentraBreakpoint): number {
    return kentraBreakpointOrder.indexOf(breakpoint);
  }
}
