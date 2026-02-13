import { Action } from '@ngrx/store';
import {
  ApiCluster,
  ApiClusterCommandResponse,
  ApiClusterSearchRequest,
  ApiClusterUpsertRequest,
  PaginatedApiClusterList,
} from 'src/app/core/model/api-cluster.model';

export const GET_ALL_API_CLUSTERS = 'GET_ALL_API_CLUSTERS';
export const GET_ALL_API_CLUSTERS_SUCCESS = 'GET_ALL_API_CLUSTERS_SUCCESS';
export const GET_ALL_API_CLUSTERS_FAILED = 'GET_ALL_API_CLUSTERS_FAILED';

export const GET_API_CLUSTER_COUNT = 'GET_API_CLUSTER_COUNT';
export const GET_API_CLUSTER_COUNT_SUCCESS = 'GET_API_CLUSTER_COUNT_SUCCESS';

export const GET_API_CLUSTER_BY_ID = 'GET_API_CLUSTER_BY_ID';
export const GET_API_CLUSTER_BY_ID_SUCCESS = 'GET_API_CLUSTER_BY_ID_SUCCESS';

export const CREATE_API_CLUSTER = 'CREATE_API_CLUSTER';
export const CREATE_API_CLUSTER_SUCCESS = 'CREATE_API_CLUSTER_SUCCESS';
export const CREATE_API_CLUSTER_FAILED = 'CREATE_API_CLUSTER_FAILED';

export const UPDATE_API_CLUSTER = 'UPDATE_API_CLUSTER';
export const UPDATE_API_CLUSTER_SUCCESS = 'UPDATE_API_CLUSTER_SUCCESS';
export const UPDATE_API_CLUSTER_FAILED = 'UPDATE_API_CLUSTER_FAILED';

export const DELETE_API_CLUSTER = 'DELETE_API_CLUSTER';
export const DELETE_API_CLUSTER_SUCCESS = 'DELETE_API_CLUSTER_SUCCESS';
export const DELETE_API_CLUSTER_FAILED = 'DELETE_API_CLUSTER_FAILED';

export const RESET_CREATE_SUCCESS = 'RESET_CREATE_SUCCESS';
export const RESET_UPDATE_SUCCESS = 'RESET_UPDATE_SUCCESS';
export const RESET_DELETE_SUCCESS = 'RESET_DELETE_SUCCESS';

export class GetAllApiClusters implements Action {
  readonly type = GET_ALL_API_CLUSTERS;
  constructor(public payload: ApiClusterSearchRequest) {}
}

export class GetAllApiClustersSuccess implements Action {
  readonly type = GET_ALL_API_CLUSTERS_SUCCESS;
  constructor(public payload: PaginatedApiClusterList) {}
}

export class GetAllApiClustersFailed implements Action {
  readonly type = GET_ALL_API_CLUSTERS_FAILED;
  constructor() {}
}

export class GetApiClusterCount implements Action {
  readonly type = GET_API_CLUSTER_COUNT;
  constructor(public payload?: ApiClusterSearchRequest) {}
}

export class GetApiClusterCountSuccess implements Action {
  readonly type = GET_API_CLUSTER_COUNT_SUCCESS;
  constructor(public payload: number) {}
}

export class GetApiClusterById implements Action {
  readonly type = GET_API_CLUSTER_BY_ID;
  constructor(public payload: { id: string }) {}
}

export class GetApiClusterByIdSuccess implements Action {
  readonly type = GET_API_CLUSTER_BY_ID_SUCCESS;
  constructor(public payload: ApiCluster) {}
}

export class CreateApiCluster implements Action {
  readonly type = CREATE_API_CLUSTER;
  constructor(public payload: any) {}
}

export class CreateApiClusterSuccess implements Action {
  readonly type = CREATE_API_CLUSTER_SUCCESS;
  constructor(public payload: ApiClusterCommandResponse) {}
}

export class CreateApiClusterFailed implements Action {
  readonly type = CREATE_API_CLUSTER_FAILED;
  constructor() {}
}

export class UpdateApiCluster implements Action {
  readonly type = UPDATE_API_CLUSTER;
  constructor(public payload: {id: string, apiCluster: ApiClusterUpsertRequest}) {}
}

export class UpdateApiClusterSuccess implements Action {
  readonly type = UPDATE_API_CLUSTER_SUCCESS;
  constructor(public payload: { id: string }) {}
}

export class UpdateApiClusterFailed implements Action {
  readonly type = UPDATE_API_CLUSTER_FAILED;
  constructor() {}
}

export class DeleteApiCluster implements Action {
  readonly type = DELETE_API_CLUSTER;
  constructor(public payload: { id: string }) {}
}

export class DeleteApiClusterSuccess implements Action {
  readonly type = DELETE_API_CLUSTER_SUCCESS;
  constructor(public payload: { id: string }) {}
}

export class DeleteApiClusterFailed implements Action {
  readonly type = DELETE_API_CLUSTER_FAILED;
  constructor() {}
}

export class ResetCreateSuccess implements Action {
  readonly type = RESET_CREATE_SUCCESS;
}

export class ResetUpdateSuccess implements Action {
  readonly type = RESET_UPDATE_SUCCESS;
}

export class ResetDeleteSuccess implements Action {
  readonly type = RESET_DELETE_SUCCESS;
}

export type ApiClusterActions =
  | GetAllApiClusters
  | GetAllApiClustersSuccess
  | GetAllApiClustersFailed
  | GetApiClusterCount
  | GetApiClusterCountSuccess
  | GetApiClusterById
  | GetApiClusterByIdSuccess
  | CreateApiCluster
  | CreateApiClusterSuccess
  | CreateApiClusterFailed
  | UpdateApiCluster
  | UpdateApiClusterSuccess
  | UpdateApiClusterFailed
  | DeleteApiCluster
  | DeleteApiClusterSuccess
  | DeleteApiClusterFailed
  | ResetCreateSuccess
  | ResetUpdateSuccess
  | ResetDeleteSuccess;
