import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  ApiRoute,
  ApiRouteCommandResponse,
  ApiRouteSearchRequest,
  ApiRouteUpsertRequest,
  PaginatedApiRouteList,
} from '../model/api-route.model';
import { Observable } from 'rxjs';
import { IApiRouteService } from './interface/api-route-service.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiRouteService extends BaseService implements IApiRouteService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAllApiRoutes(searchRequest: ApiRouteSearchRequest): Observable<PaginatedApiRouteList> {
    return this.http.post<PaginatedApiRouteList>(
      `${environment.blogsphereSearchApiBaseUrl}/apiroute-search-index`,
      searchRequest,
      {
        headers: this.getHttpHeaders(environment.blogsphereSearchApiSubscriptionKey, 'v1'),
      }
    );
  }

  public getApiRouteCount(searchRequest: ApiRouteSearchRequest): Observable<number> {
    return this.http.post<number>(
      `${environment.blogsphereSearchApiBaseUrl}/count/apiroute-search-index`,
      searchRequest,
      {
        headers: this.getHttpHeaders(environment.blogsphereSearchApiSubscriptionKey, 'v1'),
      }
    );
  }

  public getApiRouteById(id: string): Observable<ApiRoute> {
    return this.http.get<ApiRoute>(`${environment.blogsphereBffBaseUrl}/apigateway/route/${id}`, {
      headers: this.getHttpHeaders(environment.blogsphereBffSubscriptionKey, 'v2'),
    });
  }

  public createApiRoute(request: ApiRouteUpsertRequest): Observable<ApiRouteCommandResponse> {
    return this.http.post<ApiRouteCommandResponse>(
      `${environment.blogShereApiGatewayBaseUrl}/proxyroute`,
      request
    );
  }

  public updateApiRoute(
    id: string,
    request: ApiRouteUpsertRequest
  ): Observable<ApiRouteCommandResponse> {
    return this.http.put<ApiRouteCommandResponse>(
      `${environment.blogShereApiGatewayBaseUrl}/proxyroute/${id}`,
      request
    );
  }

  public deleteApiRoute(id: string): Observable<ApiRouteCommandResponse> {
    return this.http.delete<ApiRouteCommandResponse>(
      `${environment.blogShereApiGatewayBaseUrl}/proxyroute/${id}`
    );
  }
}
