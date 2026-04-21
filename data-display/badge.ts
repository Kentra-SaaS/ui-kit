import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { KentraIcon } from "../icons/icon";
import {
  BadgeSize,
  BadgeState,
  BadgeVariant,
  IconName,
  KentraBadgeContract,
  KentraElementBase,
  badgeStyleMap,
} from "../internal";

@Component({
  selector: "k-badge",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  template: `
    <span class="badge">
      @if (icon(); as iconName) {
        <k-icon class="icon" [name]="iconName" [size]="size()" aria-hidden="true"></k-icon>
      }

      @if (resolvedLabel(); as resolvedText) {
        <span class="text">{{ resolvedText }}</span>
      } @else {
        <span class="text"><ng-content></ng-content></span>
      }
    </span>
  `,
  styles: `
    :host {
      display: inline-flex;
      max-inline-size: 100%;
    }

    .badge {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--k-badge-gap, var(--k-space-1));
      min-block-size: var(--k-badge-min-height, var(--k-space-6));
      max-inline-size: 100%;
      padding-inline: var(--k-badge-padding-x, var(--k-space-2));
      padding-block: var(--k-badge-padding-y, var(--k-space-1));
      border: var(--k-badge-border-width, 1px) solid
        var(--k-badge-colors-border, transparent);
      border-radius: var(--k-badge-border-radius, var(--k-radius-pill));
      background: var(--k-badge-colors-bg, transparent);
      color: var(--k-badge-colors-text, currentColor);
      font-family: var(--k-badge-typography-family, inherit);
      font-size: var(--k-badge-typography-font-size, 0.75rem);
      line-height: var(--k-badge-typography-line-height, 1);
      font-weight: var(--k-badge-typography-font-weight, 600);
      white-space: nowrap;
    }

    .icon {
      --k-icon-font-size: var(--k-badge-icon-size, var(--k-icon-size-sm));
      --k-icon-color: var(--k-badge-colors-icon, currentColor);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-badge-icon-size, var(--k-icon-size-sm));
      block-size: var(--k-badge-icon-size, var(--k-icon-size-sm));
      flex: none;
      line-height: 1;
    }

    .text {
      min-inline-size: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: 64rem) {
      .badge {
        min-block-size: max(var(--k-badge-min-height, var(--k-space-6)), var(--k-space-5));
      }
    }

    @media (max-width: 48rem) {
      .badge {
        min-block-size: max(var(--k-badge-min-height, var(--k-space-6)), 1.5rem);
      }
    }
  `,
})
export class KentraBadge extends KentraElementBase implements KentraBadgeContract {
  readonly variant = input<BadgeVariant>("neutral");
  readonly size = input<BadgeSize>("md");
  readonly state = input<BadgeState>("default");
  readonly icon = input<IconName | null>(null);
  readonly label = input<string | null>(null);

  readonly resolvedLabel = computed(() => this.normalizeText(this.label()));

  protected readonly baseClass = badgeStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    return this.state() === "default"
      ? {}
      : {
          [this.state()]: true,
        };
  }

  protected override cssVars() {
    const size = this.size();

    return {
      "--k-badge-min-height": `var(--k-badge-size-${size}-min-height)`,
      "--k-badge-padding-x": `var(--k-badge-size-${size}-padding-x)`,
      "--k-badge-padding-y": `var(--k-badge-size-${size}-padding-y)`,
      "--k-badge-gap": `var(--k-badge-size-${size}-gap)`,
      "--k-badge-icon-size": `var(--k-badge-size-${size}-icon-size)`,
    };
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
