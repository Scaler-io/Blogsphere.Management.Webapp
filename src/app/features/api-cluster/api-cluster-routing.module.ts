import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClusterComponent } from './api-cluster.component';
import { RouterModule, Routes } from '@angular/router';
import { ClusterSetupComponent } from './cluster-setup/cluster-setup.component';
import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';

const routes: Routes = [
  {
    path: '',
    component: ApiClusterComponent,
  },
  {
    path: 'details/:id',
    component: ClusterDetailsComponent,
    data: {
      breadcrumb: {
        alias: 'cluster-name',
      },
    },
  },
  {
    path: 'cluster-setup',
    component: ClusterSetupComponent,
    data: {
      breadcrumb: {
        label: 'Cluster setup',
      },
    },
  },
  {
    path: 'cluster-setup',
    data: {
      breadcrumb: {
        label: 'Cluster setup',
      },
    },
    children: [
      {
        path: ':id',
        component: ClusterSetupComponent,
        data: {
          breadcrumb: {
            alias: 'cluster-name',
          },
        },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiClusterRoutingModule {}
