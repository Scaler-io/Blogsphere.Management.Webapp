import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export type QuickActionIconBackground =
  | 'primary-fixed'
  | 'secondary-fixed'
  | 'tertiary-tonal'
  | 'neutral'
  | 'inverse';

/**
 * Quick action tile — clickable card with rounded icon tile, label, and helper
 * description. Used on the dashboard's "Quick actions" bento row.
 *
 * @example
 * <blogsphere-quick-action-tile
 *   icon="payments"
 *   label="Pay bill"
 *   description="Settle your most recent invoice"
 *   iconBackground="secondary-fixed"
 *   routerLink="/billing/pay"
 *   (next)="trackAction('pay-bill')">
 * </blogsphere-quick-action-tile>
 *
 * Inputs
 *  - icon            : Material Symbols glyph (required)
 *  - label           : tile title (required)
 *  - description     : muted helper text
 *  - iconBackground  : 'primary-fixed'|'secondary-fixed'|'tertiary-tonal'|'neutral'|'inverse'
 *  - disabled        : disables click + applies disabled styling
 *  - loading         : shows spinner over icon, prevents click
 *  - routerLink      : optional router link (consumer can attach [routerLink] outside)
 *
 * Output
 *  - next            : emits on tile activation
 */
@Component({
  selector: 'blogsphere-quick-action-tile',
  templateUrl: './quick-action-tile.component.html',
  styleUrls: ['./quick-action-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class QuickActionTileComponent {
  @Input() icon = '';
  @Input() label = '';
  @Input() description?: string;
  @Input() iconBackground: QuickActionIconBackground = 'secondary-fixed';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() routerLink?: string | unknown[];

  @Output() next = new EventEmitter<void>();

  onActivate(event: Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.next.emit();
  }

  get hostClasses(): { [klass: string]: boolean } {
    return {
      [`quick-action-tile--icon-${this.iconBackground}`]: true,
      'quick-action-tile--disabled': this.disabled,
      'quick-action-tile--loading': this.loading,
    };
  }
}
