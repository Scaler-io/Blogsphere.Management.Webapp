import { Component, Input } from '@angular/core';

export type StatTileTone = 'primary' | 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'blogsphere-stat-tile',
  templateUrl: './stat-tile.component.html',
  styleUrls: ['./stat-tile.component.scss'],
  standalone: false,
})
export class StatTileComponent {
  @Input() icon: string = '';
  @Input() value: string | number = '';
  @Input() label: string = '';
  @Input() tone: StatTileTone = 'primary';
}
