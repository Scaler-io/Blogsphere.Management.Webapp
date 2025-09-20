import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SUBSCRIPTION_STATE_NAME, subscriptionReducer } from './subscription.reducer';
import {
  SUBSCRIBED_API_STATE_NAME,
  subscribedApiReducer,
} from '../subscribed-api/subscribed-api.reducer';
import { API_PRODUCT_STATE_NAME, apiProductReducer } from '../api-product/api-product.reducer';
import { ApiProductEffects } from '../api-product/api-product.effect';
import { EffectsModule } from '@ngrx/effects';
import { SubscribedApiEffects } from '../subscribed-api/subscribed-api.effect';
import { SubscriptionEffects } from './subscription.effect';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(SUBSCRIPTION_STATE_NAME, subscriptionReducer),
    StoreModule.forFeature(SUBSCRIBED_API_STATE_NAME, subscribedApiReducer),
    StoreModule.forFeature(API_PRODUCT_STATE_NAME, apiProductReducer),

    EffectsModule.forFeature([ApiProductEffects, SubscribedApiEffects, SubscriptionEffects]),
  ],
  exports: [],
})
export class SubscriptionStoreModule {}
