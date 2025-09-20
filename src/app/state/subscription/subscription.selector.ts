import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SUBSCRIPTION_STATE_NAME, SubscriptionState } from './subscription.reducer';

const state = createFeatureSelector<SubscriptionState>(SUBSCRIPTION_STATE_NAME);

export const selectSubscriptions = createSelector(state, state => state.subscriptions);

export const selectSubscribedApiByProductId = (productId: string) =>
  createSelector(state, state =>
    state.subscriptions?.filter(subscription => subscription.apiProductDetails.id === productId)
  );
export const selectSubscriptionsLoading = createSelector(state, state => state.loading);
export const selectSubscriptionsCreating = createSelector(state, state => state.creating);
export const selectSubscriptionsDeleting = createSelector(state, state => state.deleting);
export const selectSubscribedApisCreateSuccess = createSelector(
  state,
  state => state.createSuccess
);
export const selectSubscriptionsDeleteSuccess = createSelector(state, state => state.deleteSuccess);
