import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericErrorComponent } from './generic-error.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { InfoCardModule } from 'src/app/shared/components/info-card/info-card.module';

@NgModule({
  declarations: [GenericErrorComponent],
  imports: [CommonModule, ButtonModule, InfoCardModule],
  exports: [GenericErrorComponent],
})
export class GenericErrorModule {}
