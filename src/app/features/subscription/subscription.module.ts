import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionStoreModule } from 'src/app/state/subscription/subscription-store.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { BadgeModule } from 'src/app/shared/components/badge/badge.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import { ApiProductCreateDialogModule } from './api-product-create-dialog/api-product-create-dialog.module';
import { ApiProductDetailsModule } from './api-product-details/api-product-details.module';
import { SubscribedApiCreateDialogModule } from './subscribed-api-create-dialog/subscribed-api-create-dialog.module';
import { SubscriptionCreateDialogModule } from './subscription-create-dialog/subscription-create-dialog.module';

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    SubscriptionStoreModule,
    AppMaterialModule,
    BadgeModule,
    ButtonModule,
    LoaderModule,
    PaginatorModule,
    ApiProductCreateDialogModule,
    ApiProductDetailsModule,
    SubscribedApiCreateDialogModule,
    SubscriptionCreateDialogModule,
  ],
  exports: [SubscriptionComponent],
})
export class SubscriptionModule {}
