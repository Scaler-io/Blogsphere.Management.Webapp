import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { RouterModule, Routes } from '@angular/router';
import { ApiProductDetailsComponent } from './api-product-details/api-product-details.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionComponent,
  },
  {
    path: ':id',
    component: ApiProductDetailsComponent,
    data: { breadcrumb: { alias: 'api-product-name' } },
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
