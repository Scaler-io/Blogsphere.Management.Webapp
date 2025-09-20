import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericErrorComponent } from './features/generic-error/generic-error.component';
import { CanActivateErrorPageGuard } from './core/guards/can-activate-error-page.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    data: { breadcrumb: { label: 'Dashboard' } },
  },
  {
    path: 'api-cluster',
    loadChildren: () =>
      import('./features/api-cluster/api-cluster.module').then(
        (m) => m.ApiClusterModule
      ),
    data: { breadcrumb: { label: 'Clusters' } },
  },
  {
    path: 'api-routes',
    loadChildren: () =>
      import('./features/api-routes/api-routes.module').then(
        (m) => m.ApiRoutesModule
      ),
    data: { breadcrumb: { label: 'Routes' } },
  },
  {
    path: 'subscription',
    loadChildren: () =>
      import('./features/subscription/subscription.module').then(
        (m) => m.SubscriptionModule
      ),
    data: { breadcrumb: { label: 'Subscription manager' } },
  },
  {
    path: 'generic-error',
    component: GenericErrorComponent,
    canActivate: [CanActivateErrorPageGuard],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
