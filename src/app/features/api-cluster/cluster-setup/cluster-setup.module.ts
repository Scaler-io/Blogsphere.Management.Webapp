import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterSetupComponent } from './cluster-setup.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [ClusterSetupComponent],
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule, ButtonModule],
  exports: [ClusterSetupComponent],
})
export class ClusterSetupModule {}
