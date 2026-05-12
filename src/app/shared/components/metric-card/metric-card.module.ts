import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricCardComponent } from './metric-card.component';
import { StatusPillModule } from '../status-pill/status-pill.module';

@NgModule({
  declarations: [MetricCardComponent],
  imports: [CommonModule, StatusPillModule],
  exports: [MetricCardComponent],
})
export class MetricCardModule {}
