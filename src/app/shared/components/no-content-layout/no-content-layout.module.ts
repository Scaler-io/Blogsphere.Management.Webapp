import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoContentLayoutComponent } from './no-content-layout.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [NoContentLayoutComponent],
  imports: [CommonModule, ButtonModule],
  exports: [NoContentLayoutComponent],
})
export class NoContentLayoutModule {}
