import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import { BreadcrumbComponent } from 'xng-breadcrumb';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [CommonModule, BreadcrumbComponent],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
