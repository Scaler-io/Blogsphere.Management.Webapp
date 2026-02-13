import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiCluster,
  ApiClusterCommandResponse,
  ApiClusterSearchRequest,
  ApiClusterUpsertRequest,
  PaginatedApiClusterList,
} from '../model/api-cluster.model';
import { BaseService } from './base.service';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiClusterService } from './interface/api-custer-service.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiClusterService extends BaseService implements IApiClusterService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAllApiClusters(
    searchRequest: ApiClusterSearchRequest
  ): Observable<PaginatedApiClusterList> {
    return this.http.post<PaginatedApiClusterList>(
      `${environment.blogsphereSearchApiBaseUrl}/apicluster-search-index`,
      searchRequest,
      {
        headers: this.getHttpHeaders(environment.blogsphereSearchApiSubscriptionKey, 'v1'),
      }
    );
  }

  public getApiClusterCount(searchRequest: ApiClusterSearchRequest): Observable<number> {
    return this.http.post<number>(
      `${environment.blogsphereSearchApiBaseUrl}/count/apicluster-search-index`,
      searchRequest,
      {
        headers: this.getHttpHeaders(environment.blogsphereSearchApiSubscriptionKey, 'v1'),
      }
    );
  }

  public getApiClusterById(id: string): Observable<ApiCluster> {
    return this.http
      .get<ApiCluster>(`${environment.blogsphereBffBaseUrl}/apigateway/cluster/${id}`,
        {
          headers: this.getHttpHeaders(environment.blogsphereBffSubscriptionKey, 'v2'),
        }
      )
      .pipe(
        map(res => {
          return this.toApiClusterModel(res);
        })
      );
  }

  public createApiCluster(request: ApiClusterUpsertRequest): Observable<ApiClusterCommandResponse> {
    return this.http.post<ApiClusterCommandResponse>(
      `${environment.blogShereApiGatewayBaseUrl}/proxycluster`,
      request
    );
  }

  public updateApiCluster(
    id: string,
    request: ApiClusterUpsertRequest
  ): Observable<ApiClusterCommandResponse> {
    return this.http.put<ApiClusterCommandResponse>(
      `${environment.blogShereApiGatewayBaseUrl}/proxycluster/${id}`,
      request
    );
  }

  public deleteApiCluster(id: string): Observable<ApiClusterCommandResponse> {
    return this.http.delete<ApiClusterCommandResponse>(
      `${environment.blogShereApiGatewayBaseUrl}/proxycluster/${id}`
    );
  }

  public toApiClusterModel(res: any): ApiCluster {
    return {
      ...res,
      routes: res.routes.map(r => ({
        id: r.id,
        routeId: r.routeId,
        methods: r.methods,
        isActive: r.isActive,
        path: r.path,
      })),
    };
  }
}
