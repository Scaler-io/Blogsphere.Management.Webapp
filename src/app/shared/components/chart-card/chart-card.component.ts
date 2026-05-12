import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type ChartCardTone = 'neutral' | 'primary' | 'secondary';

/**
 * Surface for visualisations (line / bar / doughnut / etc).
 *
 * Slots:
 *  - default          : the chart canvas / svg body.
 *  - `[toolbar]`      : trailing toolbar shown next to the title (segmented
 *                       controls, date range pickers, etc).
 *  - `[loading]`      : custom loading placeholder (otherwise the built-in
 *                       spinner block is rendered when `loading=true`).
 *
 * Inputs:
 *  - eyebrow          : small uppercase tag above the title.
 *  - title            : main heading (required for accessibility).
 *  - subtitle         : optional muted helper text under the title.
 *  - tone             : `neutral` | `primary` | `secondary` — drives eyebrow color.
 *  - loading          : when true, hides the body and renders the loading block.
 *  - bodyHeight       : optional CSS value for the body height (e.g. `'320px'`).
 *  - bodyMaxWidth     : optional CSS value to center small charts (e.g. doughnut).
 */
@Component({
  selector: 'blogsphere-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ChartCardComponent {
  @Input() eyebrow?: string;
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() tone: ChartCardTone = 'neutral';
  @Input() loading = false;
  @Input() bodyHeight?: string;
  @Input() bodyMaxWidth?: string;
  @Input() loadingLabel = 'Loading chart…';
}
