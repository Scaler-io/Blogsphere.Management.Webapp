import { createFeatureSelector, createSelector } from '@ngrx/store';
import { API_ROUTE_STATE_NAME, ApiRouteState } from './api-route.reducer';

export const selectApiRouteState = createFeatureSelector<ApiRouteState>(API_ROUTE_STATE_NAME);

export const selectApiRoutes = createSelector(selectApiRouteState, (state) => state.apiRoutes);

export const selectApiRoutesPageMetadata = createSelector(selectApiRouteState, (state) => ({
    top: state.top,
    currentPage: state.currentPage,
    count: state.count,
}));

export const selectTotalApiRoutes = createSelector(selectApiRouteState, (state) => state.totalApiRoutes);

export const selectApiRoute = createSelector(selectApiRouteState, (state) => state.apiRoute);

export const selectApiRoutesLoading = createSelector(selectApiRouteState, (state) => state.isApiRoutesLoading);
export const selectApiRouteLoading = createSelector(selectApiRouteState, (state) => state.isApiRouteLoading);
export const selectApiRouteCountLoading = createSelector(selectApiRouteState, (state) => state.isCountLoading);

export const selectApiRouteCreating = createSelector(selectApiRouteState, (state) => state.isCreating);

export const selectApiRouteUpdating = createSelector(selectApiRouteState, (state) => state.isUpdating);

export const selectApiRouteDeleting = createSelector(selectApiRouteState, (state) => state.isDeleting);

export const selectApiRouteCommandResponse = createSelector(selectApiRouteState, (state) => state.apiRouteCommandResponse);
 