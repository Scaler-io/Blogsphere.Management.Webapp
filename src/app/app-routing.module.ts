import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericErrorComponent } from './features/generic-error/generic-error.component';
import { CanActivateErrorPageGuard } from './core/guards/can-activate-error-page.guard';
import { CanActivateSuccessPageGuard } from './core/guards/can-activate-success-page.guard';
import { MaintenanceModeGuard } from './core/guards/maintenance-mode.guard';
import { CanActivateMaintenancePageGuard } from './core/guards/can-activate-maintenance-page.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { breadcrumb: { label: 'Dashboard' } },
    canActivate: [MaintenanceModeGuard],
  },
  {
    path: 'api-cluster',
    loadChildren: () =>
      import('./features/api-cluster/api-cluster.module').then(m => m.ApiClusterModule),
    data: { breadcrumb: { label: 'Clusters' } },
    canActivate: [MaintenanceModeGuard],
  },
  {
    path: 'api-route',
    loadChildren: () =>
      import('./features/api-routes/api-routes.module').then(m => m.ApiRoutesModule),
    data: { breadcrumb: { label: 'Routes' } },
    canActivate: [MaintenanceModeGuard],
  },
  {
    path: 'subscription',
    loadChildren: () =>
      import('./features/subscription/subscription.module').then(m => m.SubscriptionModule),
    data: { breadcrumb: { label: 'Subscription manager' } },
    canActivate: [MaintenanceModeGuard],
  },
  {
    path: 'success',
    loadChildren: () =>
      import('./features/success-page/success-page.module').then(m => m.SuccessPageModule),
    canActivate: [MaintenanceModeGuard, CanActivateSuccessPageGuard],
  },
  {
    path: 'generic-error',
    component: GenericErrorComponent,
    canActivate: [MaintenanceModeGuard, CanActivateErrorPageGuard],
  },
  {
    path: 'maintenance',
    loadChildren: () =>
      import('./features/maintenance-mode/maintenance-mode.module').then(
        m => m.MaintenanceModeModule
      ),
    canActivate: [CanActivateMaintenancePageGuard],
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./features/user-profile/user-profile.module').then(m => m.UserProfileModule),
    data: { breadcrumb: { label: 'User profile' } },
    canActivate: [MaintenanceModeGuard],
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
