import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteFilterFormComponent } from './route-filter-form.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RouteFilterFormComponent],
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule],
  exports: [RouteFilterFormComponent],
})
export class RouteFilterFormModule {}
