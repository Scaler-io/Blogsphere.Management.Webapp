import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CdkTableModule } from '@angular/cdk/table';
import { BadgeModule } from '../badge/badge.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    CdkTableModule,
    BadgeModule,
    PipesModule,
  ],
  exports: [TableComponent],
})
export class TableModule {}
