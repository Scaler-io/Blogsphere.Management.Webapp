import { Observable } from 'rxjs';
import {
  ApiRoute,
  ApiRouteCommandResponse,
  ApiRouteSearchRequest,
  ApiRouteUpsertRequest,
  PaginatedApiRouteList,
} from '../../model/api-route.model';
import { InjectionToken } from '@angular/core';

export interface IApiRouteService {
  getAllApiRoutes(searchRequest: ApiRouteSearchRequest): Observable<PaginatedApiRouteList>;
  getApiRouteCount(searchRequest: ApiRouteSearchRequest): Observable<number>;
  getApiRouteById(id: string): Observable<ApiRoute>;
  createApiRoute(request: ApiRouteUpsertRequest): Observable<ApiRouteCommandResponse>;
  updateApiRoute(id: string, request: ApiRouteUpsertRequest): Observable<ApiRouteCommandResponse>;
  deleteApiRoute(id: string): Observable<ApiRouteCommandResponse>;
}

export const API_ROUTE_SERVICE_TOKEN = new InjectionToken<IApiRouteService>('ApiRouteService');
