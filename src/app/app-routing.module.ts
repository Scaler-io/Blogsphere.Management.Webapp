import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericErrorComponent } from './features/generic-error/generic-error.component';
import { CanActivateErrorPageGuard } from './core/guards/can-activate-error-page.guard';
import { CanActivateSuccessPageGuard } from './core/guards/can-activate-success-page.guard';
import { MaintenanceModeGuard } from './core/guards/maintenance-mode.guard';
import { CanActivateMaintenancePageGuard } from './core/guards/can-activate-maintenance-page.guard';
import { permissionsGuard } from './core/guards/permission.guard';
import { AppPermission } from './core/auth/permissions.constants';

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
    data: {
      breadcrumb: { label: 'Clusters' },
      requiredPermission: AppPermission.SYSTEM_VIEW_SETTINGS,
    },
    canActivate: [MaintenanceModeGuard, permissionsGuard],
  },
  {
    path: 'api-route',
    loadChildren: () =>
      import('./features/api-routes/api-routes.module').then(m => m.ApiRoutesModule),
    data: {
      breadcrumb: { label: 'Routes' },
      requiredPermission: AppPermission.SYSTEM_VIEW_SETTINGS,
    },
    canActivate: [MaintenanceModeGuard, permissionsGuard],
  },
  {
    path: 'subscription',
    loadChildren: () =>
      import('./features/subscription/subscription.module').then(m => m.SubscriptionModule),
    data: {
      breadcrumb: { label: 'Subscription manager' },
      requiredPermission: AppPermission.SYSTEM_VIEW_SETTINGS,
    },
    canActivate: [MaintenanceModeGuard, permissionsGuard],
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
    canActivate: [MaintenanceModeGuard],
  },
  {
    path: 'user-manager',
    loadChildren: () =>
      import('./features/user-manager/user-manager.module').then(m => m.UserManagerModule),
    data: { breadcrumb: { label: 'User manager' }, requiredPermission: AppPermission.USER_VIEW },
    canActivate: [MaintenanceModeGuard, permissionsGuard],
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
