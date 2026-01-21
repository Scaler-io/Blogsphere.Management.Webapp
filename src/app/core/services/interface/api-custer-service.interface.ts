import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiCluster,
  ApiClusterSearchRequest,
  ApiClusterUpsertRequest,
  PaginatedApiClusterList,
} from '../../model/api-cluster.model';
import { ApiClusterCommandResponse } from '../../model/api-cluster.model';

export interface IApiClusterService {
  getAllApiClusters(searchRequest: ApiClusterSearchRequest): Observable<PaginatedApiClusterList>;
  getApiClusterCount(searchRequest: ApiClusterSearchRequest): Observable<number>;
  getApiClusterById(id: string): Observable<ApiCluster>;
  createApiCluster(request: ApiClusterUpsertRequest): Observable<ApiClusterCommandResponse>;
  updateApiCluster(id: string, request: ApiClusterUpsertRequest): Observable<ApiClusterCommandResponse>;
  deleteApiCluster(id: string): Observable<ApiClusterCommandResponse>;
}

export const API_CLUSTER_SERVICE_TOKEN = new InjectionToken<IApiClusterService>(
  'ApiClusterService'
);
