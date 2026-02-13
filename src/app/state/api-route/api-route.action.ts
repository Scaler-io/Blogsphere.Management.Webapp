import { Action } from '@ngrx/store';
import { ApiRoute, ApiRouteCommandResponse, ApiRouteSearchRequest, ApiRouteUpsertRequest, PaginatedApiRouteList } from 'src/app/core/model/api-route.model';

export const GET_ALL_API_ROUTES = 'GET_ALL_API_ROUTES';
export const GET_ALL_API_ROUTES_SUCCESS = 'GET_ALL_API_ROUTES_SUCCESS';

export const GET_API_ROUTE_COUNT = 'GET_API_ROUTE_COUNT';
export const GET_API_ROUTE_COUNT_SUCCESS = 'GET_API_ROUTE_COUNT_SUCCESS';

export const GET_API_ROUTE_BY_ID = 'GET_API_ROUTE_BY_ID';
export const GET_API_ROUTE_BY_ID_SUCCESS = 'GET_API_ROUTE_BY_ID_SUCCESS';

export const CREATE_API_ROUTE = 'CREATE_API_ROUTE';
export const CREATE_API_ROUTE_SUCCESS = 'CREATE_API_ROUTE_SUCCESS';
export const CREATE_API_ROUTE_FAILED = 'CREATE_API_ROUTE_FAILED';

export const UPDATE_API_ROUTE = 'UPDATE_API_ROUTE';
export const UPDATE_API_ROUTE_SUCCESS = 'UPDATE_API_ROUTE_SUCCESS';
export const UPDATE_API_ROUTE_FAILED = 'UPDATE_API_ROUTE_FAILED';

export const DELETE_API_ROUTE = 'DELETE_API_ROUTE';
export const DELETE_API_ROUTE_SUCCESS = 'DELETE_API_ROUTE_SUCCESS';
export const DELETE_API_ROUTE_FAILED = 'DELETE_API_ROUTE_FAILED';

export const RESET_CREATE_SUCCESS = 'RESET_CREATE_SUCCESS';
export const RESET_UPDATE_SUCCESS = 'RESET_UPDATE_SUCCESS';
export const RESET_DELETE_SUCCESS = 'RESET_DELETE_SUCCESS';

export class GetAllApiRoutes implements Action {
  readonly type = GET_ALL_API_ROUTES;
  constructor(public payload: ApiRouteSearchRequest) {}
}

export class GetAllApiRoutesSuccess implements Action {
  readonly type = GET_ALL_API_ROUTES_SUCCESS;
  constructor(public payload: PaginatedApiRouteList) {}
}

export class GetApiRouteCount implements Action {
  readonly type = GET_API_ROUTE_COUNT;
  constructor(public payload?: ApiRouteSearchRequest) {}
}

export class GetApiRouteCountSuccess implements Action {
  readonly type = GET_API_ROUTE_COUNT_SUCCESS;
  constructor(public payload: number) {}
}

export class GetApiRouteById implements Action {
  readonly type = GET_API_ROUTE_BY_ID;
  constructor(public payload: { id: string }) {}
}

export class GetApiRouteByIdSuccess implements Action {
  readonly type = GET_API_ROUTE_BY_ID_SUCCESS;
  constructor(public payload: ApiRoute) {}
}

export class CreateApiRoute implements Action {
  readonly type = CREATE_API_ROUTE;
  constructor(public payload: any) {}
}

export class CreateApiRouteSuccess implements Action {
  readonly type = CREATE_API_ROUTE_SUCCESS;
  constructor(public payload: ApiRouteCommandResponse) {}
}

export class CreateApiRouteFailed implements Action {
  readonly type = CREATE_API_ROUTE_FAILED;
  constructor() {}
}

export class UpdateApiRoute implements Action {
  readonly type = UPDATE_API_ROUTE;
  constructor(public payload: {id: string, apiRoute: ApiRouteUpsertRequest}) {}
}

export class UpdateApiRouteSuccess implements Action {
  readonly type = UPDATE_API_ROUTE_SUCCESS;
  constructor(public payload: ApiRouteCommandResponse) {}
}

export class UpdateApiRouteFailed implements Action {
  readonly type = UPDATE_API_ROUTE_FAILED;
  constructor() {}
}

export class DeleteApiRoute implements Action {
  readonly type = DELETE_API_ROUTE;
  constructor(public payload: { id: string }) {}
}

export class DeleteApiRouteSuccess implements Action {
  readonly type = DELETE_API_ROUTE_SUCCESS;
  constructor(public payload: { id: string }) {}
}

export class DeleteApiRouteFailed implements Action {
  readonly type = DELETE_API_ROUTE_FAILED;
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

export type ApiRouteActions =
  | GetAllApiRoutes
  | GetAllApiRoutesSuccess
  | GetApiRouteCount
  | GetApiRouteCountSuccess
  | GetApiRouteById
  | GetApiRouteByIdSuccess
  | CreateApiRoute
  | CreateApiRouteSuccess
  | CreateApiRouteFailed
  | UpdateApiRoute
  | UpdateApiRouteSuccess
  | UpdateApiRouteFailed
  | DeleteApiRoute
  | DeleteApiRouteSuccess
  | DeleteApiRouteFailed
  | ResetCreateSuccess
  | ResetUpdateSuccess
  | ResetDeleteSuccess;
