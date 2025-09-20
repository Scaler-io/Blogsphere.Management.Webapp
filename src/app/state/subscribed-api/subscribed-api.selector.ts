import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SUBSCRIBED_API_STATE_NAME, SubscribedApiState } from './subscribed-api.reducer';

// TODO: Implement selectors after AppState is updated
const state = createFeatureSelector<SubscribedApiState>(SUBSCRIBED_API_STATE_NAME);

export const selectSubscribedApis = createSelector(state, state => state.subscribedApis);

export const selectSubscribedApiByProductId = (productId: string) =>
  createSelector(state, state =>
    state.subscribedApis?.filter(subscribedApi => subscribedApi.apiProductDetails.id === productId)
  );
export const selectSubscribedApisLoading = createSelector(state, state => state.isLoading);
export const selectSubscribedApisCreating = createSelector(state, state => state.isCreating);
export const selectSubscribedApisDeleting = createSelector(state, state => state.isDeleting);
export const selectSubscribedApisCreateSuccess = createSelector(
  state,
  state => state.createSuccess
);
export const selectSubscribedApisDeleteSuccess = createSelector(
  state,
  state => state.deleteSuccess
);
