import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type ProgressBarTone =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

/**
 * Linear progress bar with optional label + value + caption — used on the
 * "Usage breakdown" rows on the dashboard.
 *
 * @example
 * <blogsphere-progress-bar
 *   [value]="1240"
 *   [max]="1500"
 *   label="Heating"
 *   valueLabel="83%"
 *   caption="Last 30 days vs. plan limit"
 *   tone="secondary"
 *   size="md">
 * </blogsphere-progress-bar>
 *
 * Inputs
 *  - value         : current progress (required, 0..max)
 *  - max           : maximum (default 100)
 *  - label         : left side label
 *  - valueLabel    : right side label (defaults to `value/max` ratio if omitted)
 *  - caption       : muted helper line under the bar
 *  - tone          : 'primary'|'secondary'|'success'|'warning'|'error'|'neutral'
 *  - size          : 'sm'|'md'|'lg' — bar thickness
 *  - indeterminate : ignores value, shows an animated bar
 *  - striped       : diagonal stripe pattern overlay
 *  - animated      : marches the stripes (requires striped)
 */
@Component({
  selector: 'blogsphere-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() max = 100;
  @Input() label?: string;
  @Input() valueLabel?: string;
  @Input() caption?: string;
  @Input() tone: ProgressBarTone = 'primary';
  @Input() size: ProgressBarSize = 'md';
  @Input() indeterminate = false;
  @Input() striped = false;
  @Input() animated = false;

  get clampedValue(): number {
    if (this.max <= 0) {
      return 0;
    }
    return Math.max(0, Math.min(this.value, this.max));
  }

  get percentage(): number {
    if (this.max <= 0) {
      return 0;
    }
    return Math.round((this.clampedValue / this.max) * 100);
  }

  get hostClasses(): { [klass: string]: boolean } {
    return {
      [`progress-bar--tone-${this.tone}`]: true,
      [`progress-bar--size-${this.size}`]: true,
      'progress-bar--indeterminate': this.indeterminate,
      'progress-bar--striped': this.striped,
      'progress-bar--animated': this.striped && this.animated,
    };
  }

  get resolvedValueLabel(): string | null {
    if (this.indeterminate) {
      return null;
    }
    if (this.valueLabel) {
      return this.valueLabel;
    }
    return `${this.percentage}%`;
  }
}
