import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroHeaderComponent } from './hero-header.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [HeroHeaderComponent],
  imports: [CommonModule, ButtonModule],
  exports: [HeroHeaderComponent],
})
export class HeroHeaderModule {}

