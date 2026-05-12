import { Component, Input } from '@angular/core';

export type StatusPillState = 'success' | 'warning' | 'danger' | 'neutral';

const DEFAULT_ICON_FOR_STATE: Record<StatusPillState, string> = {
  success: 'check_circle',
  warning: 'warning',
  danger: 'cancel',
  neutral: 'help',
};

@Component({
  selector: 'blogsphere-status-pill',
  templateUrl: './status-pill.component.html',
  styleUrls: ['./status-pill.component.scss'],
  standalone: false,
})
export class StatusPillComponent {
  @Input() state: StatusPillState = 'neutral';
  @Input() label: string = '';
  @Input() icon: string | null = null;

  public get resolvedIcon(): string {
    return this.icon ?? DEFAULT_ICON_FOR_STATE[this.state];
  }
}
