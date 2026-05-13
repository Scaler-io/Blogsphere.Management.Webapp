import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'blogsphere-user-profile-action-row',
  templateUrl: './user-profile-action-row.component.html',
  styleUrls: ['./user-profile-action-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UserProfileActionRowComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() actionLabel: string = 'Manage';

  @Output() next = new EventEmitter<void>();

  onActivate(event: Event): void {
    event.preventDefault();
    this.next.emit();
  }
}
