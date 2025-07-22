import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClusterComponent } from './api-cluster.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ApiClusterComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiClusterRoutingModule {}
