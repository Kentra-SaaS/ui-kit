import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from "@angular/core";
import {
  KentraElementBase,
  KentraSectionContract,
  SectionVariant,
  sectionStyleMap,
} from "../internal";

@Component({
  selector: "k-section",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  template: `
    <header class="header" [attr.hidden]="hasHeaderContent() ? null : ''">
      <div class="headings">
        <h2 class="title" [attr.hidden]="title() ? null : ''">
          {{ title() }}
        </h2>

        <p class="description" [attr.hidden]="description() ? null : ''">
          {{ description() }}
        </p>
      </div>

      <div class="actions">
        <ng-content select="[k-section-actions]"></ng-content>
      </div>
    </header>

    <div class="content">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      border-style: solid;
      border-width: var(--k-section-border-width, 1px);
      border-color: var(--k-section-colors-border, transparent);
      border-radius: var(--k-section-radius, 0);
      background: var(--k-section-colors-bg, transparent);
      color: var(--k-section-colors-text, inherit);
      box-shadow: var(--k-section-shadow, none);
      padding-inline: var(--k-section-padding-x, 0);
      padding-block: var(--k-section-padding-y, 0);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--k-section-title-gap, 0);
      margin-bottom: var(--k-section-content-gap, 0);
    }

    .title {
      margin: 0;
    }

    .description {
      margin: 0;
      color: var(--k-section-colors-text, inherit);
      opacity: 0.8;
    }

    .headings {
      display: grid;
      gap: var(--k-section-title-gap, 0);
    }

    .actions {
      display: inline-flex;
      align-items: center;
      gap: var(--k-section-title-gap, 0);
    }

    .content {
      display: block;
    }

    @media (max-width: 48rem) {
      :host {
        padding-inline: var(
            --k-section-padding-xmobile,
            var(--k-section-padding-x, 0)
        );
        padding-block: var(
            --k-section-padding-ymobile,
            var(--k-section-padding-y, 0)
        );
      }
    }
  `,
})
export class KentraSection
  extends KentraElementBase
  implements KentraSectionContract
{
  readonly variant = input<SectionVariant>("default");
  readonly title = input<string | null>(null);
  readonly description = input<string | null>(null);
  readonly actions = signal<object | undefined>(undefined);

  readonly hasHeaderContent = computed(() =>
    this.hasNonEmptyText(this.title()) || this.hasNonEmptyText(this.description()),
  );

  protected readonly baseClass = sectionStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  private hasNonEmptyText(value: string | null): boolean {
    return value !== null && value.trim().length > 0;
  }
}
