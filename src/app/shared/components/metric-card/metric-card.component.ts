import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type MetricDeltaDirection = 'up' | 'down' | 'flat';
export type MetricDeltaTone = 'positive' | 'negative' | 'neutral';

export interface MetricDelta {
  value: string;
  direction: MetricDeltaDirection;
  tone?: MetricDeltaTone;
}

export type MetricValueFormat = 'currency' | 'percent' | 'number' | 'raw';
export type MetricAccent = 'left' | 'top' | 'none';
export type MetricAccentTone = 'primary' | 'secondary' | 'error' | 'success';
export type MetricDensity = 'comfortable' | 'compact';

/**
 * Headline KPI card — eyebrow label, large value, optional delta + subtext + icon.
 *
 * @example
 * <blogsphere-metric-card
 *   label="Most recent bill"
 *   value="248.50"
 *   valueFormat="currency"
 *   [delta]="{ value: '12%', direction: 'down', tone: 'positive' }"
 *   subtext="vs last month"
 *   icon="receipt_long"
 *   accent="left"
 *   accentTone="secondary">
 *   <a footer routerLink="/billing">View details</a>
 * </blogsphere-metric-card>
 *
 * Inputs
 *  - label        : small uppercase eyebrow (required)
 *  - value        : main figure (required, string or number)
 *  - valueFormat  : 'currency'|'percent'|'number'|'raw' — formats the rendered value
 *  - delta        : optional `{ value, direction, tone }`
 *  - subtext      : muted helper text under the delta
 *  - icon         : optional Material Symbols glyph in top-right
 *  - accent       : 'left'|'top'|'none' — accent stripe location
 *  - accentTone   : 'primary'|'secondary'|'error'|'success' (default 'secondary')
 *  - density      : 'comfortable'|'compact' (default 'comfortable')
 *
 * ng-content slots
 *  - `[badge]`    : top-right pill (replaces the icon when both present)
 *  - default      : optional footer area under the metric
 */
@Component({
  selector: 'blogsphere-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MetricCardComponent {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() valueFormat: MetricValueFormat = 'raw';
  @Input() delta?: MetricDelta;
  @Input() subtext?: string;
  @Input() icon?: string;
  @Input() accent: MetricAccent = 'none';
  @Input() accentTone: MetricAccentTone = 'secondary';
  @Input() density: MetricDensity = 'comfortable';

  get hostClasses(): { [klass: string]: boolean } {
    return {
      [`metric-card--accent-${this.accent}`]: true,
      [`metric-card--accent-tone-${this.accentTone}`]: true,
      [`metric-card--density-${this.density}`]: true,
    };
  }

  get formattedValue(): string {
    if (this.value === null || this.value === undefined || this.value === '') {
      return '—';
    }
    const raw = typeof this.value === 'number' ? this.value : Number(this.value);
    if (Number.isNaN(raw)) {
      return String(this.value);
    }
    switch (this.valueFormat) {
      case 'currency':
        return new Intl.NumberFormat('en-AU', {
          style: 'currency',
          currency: 'AUD',
          maximumFractionDigits: 2,
        }).format(raw);
      case 'percent':
        return new Intl.NumberFormat('en-AU', {
          style: 'percent',
          maximumFractionDigits: 1,
        }).format(raw);
      case 'number':
        return new Intl.NumberFormat('en-AU', { maximumFractionDigits: 2 }).format(raw);
      default:
        return String(this.value);
    }
  }

  get deltaIcon(): string {
    switch (this.delta?.direction) {
      case 'up':
        return 'trending_up';
      case 'down':
        return 'trending_down';
      default:
        return 'trending_flat';
    }
  }

  get deltaToneClass(): string {
    return `metric-card__delta--${this.delta?.tone ?? 'neutral'}`;
  }
}
