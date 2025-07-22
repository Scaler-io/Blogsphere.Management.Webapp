import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { breadcrumb: { label: 'Dashboard' } }
  },
  {
    path: 'api-cluster',
    loadChildren: () => import('./features/api-cluster/api-cluster.module').then(m => m.ApiClusterModule),
    data: { breadcrumb: { label: 'Clusters' } }
  },
  {
    path: 'api-routes',
    loadChildren: () => import('./features/api-routes/api-routes.module').then(m => m.ApiRoutesModule),
    data: { breadcrumb: { label: 'Routes' } }
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
