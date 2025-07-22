import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [CommonModule, BreadcrumbModule],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
