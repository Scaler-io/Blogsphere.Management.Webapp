import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClusterComponent } from './api-cluster.component';
import { ApiClusterRoutingModule } from './api-cluster-routing.module';

@NgModule({
  declarations: [ApiClusterComponent],
  imports: [CommonModule],
  exports: [ApiClusterRoutingModule],
})
export class ApiClusterModule {}
