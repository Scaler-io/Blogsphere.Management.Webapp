import {
  ApiCluster,
  ApiClusterCommandResponse,
  ApiClusterSummary,
} from 'src/app/core/model/api-cluster.model';
import * as ApiClusterActions from './api-custer.action';

export const API_CLUSTER_STATE_NAME = 'apiCluster';

export interface ApiClusterState {
  apiCluster: ApiCluster;
  apiClusters: ApiClusterSummary[];
  count: number;
  top: number;
  currentPage: number;
  totalApiClusters: number;
  isApiClustersLoading: boolean;
  isCountLoading: boolean;
  isApiClusterLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  apiClusterCommandResponse: ApiClusterCommandResponse;
}

const initialState: ApiClusterState = {
  apiCluster: null,
  apiClusters: [],
  count: 0,
  top: 0,
  currentPage: 1,
  totalApiClusters: 0,
  isApiClustersLoading: false,
  isCountLoading: false,
  isApiClusterLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  apiClusterCommandResponse: null,
};

export function apiClusterReducers(
  state: ApiClusterState = initialState,
  action: ApiClusterActions.ApiClusterActions
): ApiClusterState {
  switch (action.type) {
    case ApiClusterActions.GET_ALL_API_CLUSTERS:
      return {
        ...state,
        isApiClustersLoading: true,
      };
    case ApiClusterActions.GET_ALL_API_CLUSTERS_SUCCESS:
      const { count, data, pageIndex, pageSize } = action.payload;
      return {
        ...state,
        apiClusters: data,
        count: count,
        top: pageSize,
        currentPage: pageIndex,
        isApiClustersLoading: false,
      };

    case ApiClusterActions.GET_API_CLUSTER_COUNT:
      return {
        ...state,
        isCountLoading: true,
      };

    case ApiClusterActions.GET_API_CLUSTER_COUNT_SUCCESS:
      return {
        ...state,
        totalApiClusters: action.payload,
        isCountLoading: false,
      };

    case ApiClusterActions.GET_API_CLUSTER_BY_ID:
      return {
        ...state,
        isApiClusterLoading: true,
      };

    case ApiClusterActions.GET_API_CLUSTER_BY_ID_SUCCESS:
      return {
        ...state,
        apiCluster: action.payload,
        isApiClusterLoading: false,
      };

    case ApiClusterActions.CREATE_API_CLUSTER:
      return {
        ...state,
        isCreating: true,
      };

    case ApiClusterActions.CREATE_API_CLUSTER_SUCCESS:
      return {
        ...state,
        apiClusterCommandResponse: action.payload,
        isCreating: false,
      };

    case ApiClusterActions.CREATE_API_CLUSTER_FAILED:
      return {
        ...state,
        isCreating: false,
      };

    case ApiClusterActions.UPDATE_API_CLUSTER:
      return {
        ...state,
        isUpdating: true,
      };

    case ApiClusterActions.UPDATE_API_CLUSTER_SUCCESS:
      return {
        ...state,
        apiClusterCommandResponse: action.payload as unknown as ApiClusterCommandResponse,
        isUpdating: false,
      };

    case ApiClusterActions.UPDATE_API_CLUSTER_FAILED:
      return {
        ...state,
        isUpdating: false,
      };

    case ApiClusterActions.DELETE_API_CLUSTER:
      return {
        ...state,
        isDeleting: true,
      };

    case ApiClusterActions.DELETE_API_CLUSTER_SUCCESS:
      return {
        ...state,
        apiClusterCommandResponse: action.payload as unknown as ApiClusterCommandResponse,
        isDeleting: false,
      };

    case ApiClusterActions.DELETE_API_CLUSTER_FAILED:
      return {
        ...state,
        isDeleting: false,
      };

    case ApiClusterActions.RESET_CREATE_SUCCESS:
      return {
        ...state,
        apiClusterCommandResponse: null,
      };
    case ApiClusterActions.RESET_UPDATE_SUCCESS:
      return {
        ...state,
        apiClusterCommandResponse: null,
      };
    case ApiClusterActions.RESET_DELETE_SUCCESS:
      return {
        ...state,
        apiClusterCommandResponse: null,
      };

    default:
      return state;
  }
}
