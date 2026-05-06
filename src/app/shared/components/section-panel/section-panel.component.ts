import { Component, Input } from '@angular/core';

@Component({
  selector: 'blogsphere-section-panel',
  templateUrl: './section-panel.component.html',
  styleUrls: ['./section-panel.component.scss'],
  standalone: false,
})
export class SectionPanelComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() count: number | null = null;
  @Input() description: string | null = null;
}
