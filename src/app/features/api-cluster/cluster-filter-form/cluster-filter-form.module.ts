import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterFilterFormComponent } from './cluster-filter-form.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClusterFilterFormComponent],
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule],
  exports: [ClusterFilterFormComponent],
})
export class ClusterFilterFormModule {}
