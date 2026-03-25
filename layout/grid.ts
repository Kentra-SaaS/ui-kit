import {
  ChangeDetectionStrategy,
  Component,
  input,
} from "@angular/core";
import {
  GridGap,
  GridVariant,
  KentraElementBase,
  KentraGridContract,
  gridStyleMap,
} from "../internal";

@Component({
  selector: gridStyleMap.baseClass,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  styles: `
    :host {
      display: var(--k-grid-display, grid);
      gap: var(--k-grid-gap, var(--k-grid-gap-md));
      grid-template-columns: var(
        --k-grid-columns,
        repeat(auto-fit, minmax(var(--k-grid-min-item-width, 16rem), 1fr))
      );
    }
  `,
  template: "<ng-content></ng-content>",
})
export class KentraGrid extends KentraElementBase implements KentraGridContract {
  protected readonly baseClass = gridStyleMap.baseClass;

  readonly variant = input<GridVariant>("autoFit");
  readonly gap = input<GridGap>("md");
  readonly columns = input<number | string | null>(null);
  readonly minItemWidth = input<string | null>(null);

  protected override styleValues() {
    return {
      size: this.gap(),
      variant: this.variant(),
    };
  }

  protected override cssVars() {
    return {
      "--k-grid-columns": this.toTrackList(this.columns()),
      "--k-grid-min-item-width": this.toCssLength(this.minItemWidth()),
    };
  }

  private toTrackList(value: number | string | null): string | null {
    if (value === null) {
      return null;
    }

    if (typeof value === "number") {
      const normalized = Math.max(1, Math.floor(value));
      return `repeat(${normalized}, minmax(0, 1fr))`;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  private toCssLength(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
}
