import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApiRoutesComponent } from './api-routes.component';
import { RouteSetupComponent } from './route-setup/route-setup.component';
import { RouteDetailsComponent } from './route-details/route-details.component';

const routes: Routes = [
  {
    path: '',
    component: ApiRoutesComponent,
  },
  {
    path: 'details/:id',
    component: RouteDetailsComponent,
    data: {
      breadcrumb: {
        alias: 'route-name',
      },
    },
  },
  {
    path: 'route-setup',
    component: RouteSetupComponent,
    data: {
      breadcrumb: {
        label: 'Route setup',
      },
    },
  },
  {
    path: 'route-setup/:id',
    component: RouteSetupComponent,
    data: {
      breadcrumb: {
        label: 'Route setup',
        alias: 'route-name',
      },
    },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiRoutesRoutingModule {}
