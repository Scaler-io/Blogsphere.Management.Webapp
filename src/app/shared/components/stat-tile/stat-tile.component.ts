import { Component, Input } from '@angular/core';
import { StatusPillTone } from '../status-pill/status-pill.component';

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
  @Input() icon = '';
  @Input() value: string | number = '';
  @Input() label = '';
  @Input() tone: StatTileTone = 'primary';
  /** Smaller padding, icon tile, and type — for dense detail pages. */
  @Input() compact = false;
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

  get deltaPillTone(): StatusPillTone {
    switch (this.delta?.tone ?? 'neutral') {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      default:
        return 'neutral';
    }
  }
}
