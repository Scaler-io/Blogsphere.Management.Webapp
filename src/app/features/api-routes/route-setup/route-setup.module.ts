import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteSetupComponent } from './route-setup.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [RouteSetupComponent],
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule, ButtonModule],
  exports: [RouteSetupComponent],
})
export class RouteSetupModule {}
