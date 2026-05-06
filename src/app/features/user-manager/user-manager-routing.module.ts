import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { ManagementUserComponent } from './management-user/management-user.component';
import { AppUserComponent } from './app-user/app-user.component';
import { ManagementUserDetailsComponent } from './management-user/management-user-details/management-user-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'app-users',
      },
      {
        path: 'management-users',
        data: { breadcrumb: { label: 'Management users' } },
        children: [
          {
            path: '',
            component: ManagementUserComponent,
          },
          {
            path: 'details/:id',
            component: ManagementUserDetailsComponent,
            data: { breadcrumb: { alias: 'mgmt-user-name' } },
          },
        ],
      },
      {
        path: 'app-users',
        component: AppUserComponent,
        data: { breadcrumb: { label: 'App users' } },
      },
    ],
    component: UserManagerComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagerRoutingModule {}
