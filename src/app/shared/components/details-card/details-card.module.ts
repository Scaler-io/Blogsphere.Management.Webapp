import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsCardComponent } from './details-card.component';
import { KvRowComponent } from './kv-row/kv-row.component';

@NgModule({
  declarations: [DetailsCardComponent, KvRowComponent],
  imports: [CommonModule],
  exports: [DetailsCardComponent, KvRowComponent],
})
export class DetailsCardModule {}

