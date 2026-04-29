import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  KentraElementBase,
  KentraLinkContract,
  LinkState,
  LinkVariant,
  linkStyleMap,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-link",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <a
      class="content"
      [attr.href]="resolvedHref()"
      [routerLink]="resolvedRouterLink()"
      [attr.target]="target()"
      [attr.rel]="resolvedRel()"
      [attr.aria-disabled]="disabled() ? 'true' : null"
      [attr.tabindex]="disabled() ? -1 : null"
      (click)="onAnchorClick($event)"
    >
      <ng-content></ng-content>
    </a>
  `,
  styles: `
    :host {
      display: inline-block;
      max-inline-size: 100%;
      color: var(--k-link-color, currentColor);
    }

    .content {
      display: inline;
      font-family: var(--k-link-family, inherit);
      font-size: var(--k-link-font-size, inherit);
      line-height: var(--k-link-line-height, inherit);
      font-weight: var(--k-link-font-weight, 400);
      color: inherit;
      text-decoration: none;
      border-radius: var(--k-link-border-radius, 0);
      transition: color var(--k-link-motion-duration, 0s)
        var(--k-link-motion-easing, linear);
      cursor: pointer;
    }

    .content:focus-visible {
      outline: 2px solid var(--k-link-color, currentColor);
      outline-offset: 2px;
      box-shadow: none;
    }

    :host(.is-disabled) .content,
    :host([aria-disabled="true"]) .content {
      pointer-events: none;
      cursor: not-allowed;
    }
  `,
  imports: [RouterLink],
})
export class KentraLink extends KentraElementBase implements KentraLinkContract {
  readonly variant = input<LinkVariant>("default");
  readonly state = input<LinkState>("default");
  readonly href = input<string | null>(null);
  readonly routerLink = input<string | unknown[] | null>(null);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly click = output<MouseEvent>();

  readonly resolvedRouterLink = computed(() =>
    this.disabled() ? null : this.routerLink(),
  );
  readonly resolvedHref = computed(() =>
    this.disabled() || this.resolvedRouterLink() !== null
      ? null
      : this.normalizeValue(this.href()),
  );
  readonly resolvedRel = computed(() => {
    const explicitRel = this.normalizeValue(this.rel());
    if (explicitRel !== null) {
      return explicitRel;
    }

    return this.target() === "_blank" ? "noopener noreferrer" : null;
  });
  readonly effectiveState = computed<LinkState>(() =>
    this.disabled() ? "disabled" : this.state(),
  );

  protected readonly baseClass = linkStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    const state = this.effectiveState();

    return state === "default"
      ? {}
      : {
          [state]: true,
        };
  }

  onAnchorClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.click.emit(event);
  }

  private normalizeValue(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
