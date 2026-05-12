import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type StatusPillTone = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type StatusPillSize = 'sm' | 'md';

export type StatusPillState = 'success' | 'warning' | 'danger' | 'neutral';

const DEFAULT_ICON_FOR_STATE: Record<StatusPillState, string> = {
  success: 'check_circle',
  warning: 'warning',
  danger: 'cancel',
  neutral: 'help',
};

/**
 * Compact pill used to surface a status / delta / badge value.
 *
 * Preferred inputs (new):
 *  - `tone`   semantic color (success / warning / error / info / neutral)
 *  - `icon`   optional Material symbol shown to the left of the label
 *  - `label`  required text content (also used as accessible label)
 *  - `size`   `sm` (24px h) or `md` (28px h, default)
 *
 * Legacy compatibility inputs (kept so older call sites keep working):
 *  - `state`  `success` | `warning` | `danger` | `neutral` — maps to a tone.
 *             When `state` is set and `icon` is `null`, a sensible default
 *             icon is rendered (`check_circle`, `warning`, `cancel`, `help`).
 */
@Component({
  selector: 'blogsphere-status-pill',
  templateUrl: './status-pill.component.html',
  styleUrls: ['./status-pill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class StatusPillComponent {
  @Input() tone?: StatusPillTone;
  @Input() icon?: string | null;
  @Input() label = '';
  @Input() size: StatusPillSize = 'md';

  @Input() state?: StatusPillState;

  get resolvedTone(): StatusPillTone {
    if (this.tone) {
      return this.tone;
    }
    switch (this.state) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error';
      case 'neutral':
        return 'neutral';
      default:
        return 'neutral';
    }
  }

  get resolvedIcon(): string | null {
    if (this.icon !== undefined && this.icon !== null && this.icon !== '') {
      return this.icon;
    }
    if (this.state) {
      return DEFAULT_ICON_FOR_STATE[this.state];
    }
    return null;
  }
}
