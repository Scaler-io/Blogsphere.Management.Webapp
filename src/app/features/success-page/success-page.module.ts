import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessPageComponent } from './success-page.component';
import { SuccessPageRoutingModule } from './success-page-routing.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [SuccessPageComponent],
  imports: [CommonModule, ButtonModule],
  exports: [SuccessPageRoutingModule],
})
export class SuccessPageModule {}
