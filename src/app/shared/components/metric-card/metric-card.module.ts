import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricCardComponent } from './metric-card.component';

@NgModule({
  declarations: [MetricCardComponent],
  imports: [CommonModule],
  exports: [MetricCardComponent],
})
export class MetricCardModule {}
