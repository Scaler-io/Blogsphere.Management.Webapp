import { Component, Input } from '@angular/core';

@Component({
  selector: 'blogsphere-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: false,
})
export class EmptyStateComponent {
  @Input() icon: string = 'inbox';
  @Input() text: string = '';
}
