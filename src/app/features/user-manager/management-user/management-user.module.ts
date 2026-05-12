import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementUserComponent } from './management-user.component';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  declarations: [ManagementUserComponent],
  imports: [CommonModule, TableModule, AppMaterialModule],
  exports: [ManagementUserComponent],
})
export class ManagementUserModule {}
