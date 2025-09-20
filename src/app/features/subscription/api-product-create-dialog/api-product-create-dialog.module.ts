import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiProductCreateDialogComponent } from './api-product-create-dialog.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [ApiProductCreateDialogComponent],
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule, ButtonModule],
  exports: [ApiProductCreateDialogComponent],
})
export class ApiProductCreateDialogModule {}
