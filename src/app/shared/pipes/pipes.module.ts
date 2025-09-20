import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';
import { FormatDatePipe } from './format-date.pipe';
import { FormatStatusPipe } from './format-status.pipe';
import { TextMaskPipe } from './text-mask.pipe';

@NgModule({
  declarations: [CapitalizePipe, FormatDatePipe, FormatStatusPipe, TextMaskPipe],
  imports: [CommonModule],
  exports: [CapitalizePipe, FormatDatePipe, FormatStatusPipe, TextMaskPipe],
})
export class PipesModule {}
