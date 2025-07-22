import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApiRoutesComponent } from './api-routes.component';

const routes: Routes = [
  {
    path: '',
    component: ApiRoutesComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiRoutesRoutingModule {}
