import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatTileComponent } from './stat-tile.component';
import { StatusPillModule } from '../status-pill/status-pill.module';

@NgModule({
  declarations: [StatTileComponent],
  imports: [CommonModule, StatusPillModule],
  exports: [StatTileComponent],
})
export class StatTileModule {}
