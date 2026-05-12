import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export interface SegmentedOption {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export type SegmentedSize = 'sm' | 'md' | 'lg';
export type SegmentedTone = 'neutral' | 'primary' | 'secondary';

/**
 * Segmented control — a small pill-shaped tab group (used on chart toolbars,
 * filter switches, range pickers).
 *
 * @example
 * <blogsphere-segmented-control
 *   [options]="[
 *     { id: '7d', label: '7d' },
 *     { id: '30d', label: '30d' },
 *     { id: '90d', label: '90d' }
 *   ]"
 *   [value]="range"
 *   size="sm"
 *   tone="secondary"
 *   (valueChange)="range = $event">
 * </blogsphere-segmented-control>
 *
 * Inputs
 *  - options    : array of `{ id, label, icon?, disabled? }`
 *  - value      : id of the currently selected option
 *  - size       : 'sm'|'md'|'lg' (default 'md')
 *  - tone       : 'neutral'|'primary'|'secondary' — selected pill color
 *  - fullWidth  : stretches to fill parent (default false)
 *  - ariaLabel  : group label for accessibility
 *
 * Output
 *  - valueChange: emits the newly selected option id
 */
@Component({
  selector: 'blogsphere-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SegmentedControlComponent {
  @Input() options: SegmentedOption[] = [];
  @Input() value = '';
  @Input() size: SegmentedSize = 'md';
  @Input() tone: SegmentedTone = 'neutral';
  @Input() fullWidth = false;
  @Input() ariaLabel?: string;

  @Output() valueChange = new EventEmitter<string>();

  onSelect(option: SegmentedOption): void {
    if (option.disabled || option.id === this.value) {
      return;
    }
    this.valueChange.emit(option.id);
  }

  trackById(_index: number, option: SegmentedOption): string {
    return option.id;
  }

  get hostClasses(): { [klass: string]: boolean } {
    return {
      [`segmented-control--size-${this.size}`]: true,
      [`segmented-control--tone-${this.tone}`]: true,
      'segmented-control--full-width': this.fullWidth,
    };
  }
}
