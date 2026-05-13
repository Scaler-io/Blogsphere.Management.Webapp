import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonVariant = 'ghost' | 'filled' | 'tonal' | 'outlined';
export type IconButtonTone = 'primary' | 'secondary' | 'on-surface' | 'on-inverse' | 'error';

/**
 * Compact icon-only button — mirrors the AGL prototype's pill-shaped IconButton.
 *
 * @example
 * <blogsphere-icon-button
 *   icon="notifications"
 *   ariaLabel="Open notifications"
 *   variant="ghost"
 *   tone="on-surface"
 *   [badgeCount]="3"
 *   (next)="openNotifications($event)">
 * </blogsphere-icon-button>
 *
 * Inputs
 *  - icon         : Material Symbols glyph name (required)
 *  - ariaLabel    : aria-label; should describe the action (required)
 *  - size         : 'sm'|'md'|'lg' (default 'md' = 40px hit target)
 *  - variant      : 'ghost'|'filled'|'tonal'|'outlined' (default 'ghost')
 *  - tone         : 'primary'|'secondary'|'on-surface'|'on-inverse'|'error'
 *  - tooltipText  : optional matTooltip text (renders title attr fallback)
 *  - disabled     : disables click + applies disabled styling
 *  - loading      : replaces glyph with a small spinner; disables click
 *  - badgeCount   : optional number rendered as a small dot+count badge
 *
 * Output
 *  - next         : emits the underlying MouseEvent on activation
 */
@Component({
  selector: 'blogsphere-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class IconButtonComponent {
  @Input() icon = '';
  @Input() ariaLabel = '';
  @Input() size: IconButtonSize = 'md';
  @Input() variant: IconButtonVariant = 'ghost';
  @Input() tone: IconButtonTone = 'on-surface';
  @Input() tooltipText?: string;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() badgeCount?: number;

  @Output() next = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.next.emit(event);
  }

  get hostClasses(): { [klass: string]: boolean } {
    return {
      [`icon-button--size-${this.size}`]: true,
      [`icon-button--variant-${this.variant}`]: true,
      [`icon-button--tone-${this.tone}`]: true,
      'icon-button--disabled': this.disabled,
      'icon-button--loading': this.loading,
    };
  }

  get badgeDisplay(): string | null {
    if (this.badgeCount === undefined || this.badgeCount === null) {
      return null;
    }
    if (this.badgeCount <= 0) {
      return null;
    }
    return this.badgeCount > 99 ? '99+' : String(this.badgeCount);
  }
}
