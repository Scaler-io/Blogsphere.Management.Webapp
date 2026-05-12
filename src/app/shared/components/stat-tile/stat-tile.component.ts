import { Component, Input } from '@angular/core';

export type StatTileTone = 'primary' | 'info' | 'success' | 'warning' | 'danger';

export type StatTileDeltaDirection = 'up' | 'down' | 'flat';
export type StatTileDeltaTone = 'positive' | 'negative' | 'neutral';

export interface StatTileDelta {
  value: string;
  direction: StatTileDeltaDirection;
  tone?: StatTileDeltaTone;
}

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

  // Phase-1 redesign additions — optional, backward-compatible.
  @Input() delta?: StatTileDelta;
  @Input() caption?: string;

  get deltaIcon(): string {
    switch (this.delta?.direction) {
      case 'up':
        return 'trending_up';
      case 'down':
        return 'trending_down';
      default:
        return 'trending_flat';
    }
  }

  get deltaToneClass(): string {
    return `stat-tile__delta--${this.delta?.tone ?? 'neutral'}`;
  }
}
