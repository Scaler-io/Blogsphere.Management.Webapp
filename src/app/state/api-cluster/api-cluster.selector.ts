import { createFeatureSelector, createSelector } from '@ngrx/store';
import { API_CLUSTER_STATE_NAME, ApiClusterState } from './api-cluster.reducer';

export const selectApiClusterState = createFeatureSelector<ApiClusterState>(API_CLUSTER_STATE_NAME);

export const selectApiClusters = createSelector(selectApiClusterState, (state) => state.apiClusters);

export const selectApiClustersPageMetadata = createSelector(selectApiClusterState, (state) => ({
    top: state.top,
    currentPage: state.currentPage,
    count: state.count,
}));

export const selectTotalApiClusters = createSelector(selectApiClusterState, (state) => state.totalApiClusters);

export const selectApiCluster = createSelector(selectApiClusterState, (state) => state.apiCluster);

export const selectApiClustersLoading = createSelector(selectApiClusterState, (state) => state.isApiClustersLoading);
export const selectApiClusterLoading = createSelector(selectApiClusterState, (state) => state.isApiClusterLoading);
export const selectApiClusterCountLoading = createSelector(selectApiClusterState, (state) => state.isCountLoading);

export const selectApiClusterCreating = createSelector(selectApiClusterState, (state) => state.isCreating);

export const selectApiClusterUpdating = createSelector(selectApiClusterState, (state) => state.isUpdating);

export const selectApiClusterDeleting = createSelector(selectApiClusterState, (state) => state.isDeleting);

export const selectApiClusterCommandResponse = createSelector(selectApiClusterState, (state) => state.apiClusterCommandResponse);
 