import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRoutesComponent } from './api-routes.component';
import { ApiRoutesRoutingModule } from './api-routes-routing.module';

@NgModule({
  declarations: [ApiRoutesComponent],
  imports: [CommonModule],
  exports: [ApiRoutesRoutingModule],
})
export class ApiRoutesModule {}
