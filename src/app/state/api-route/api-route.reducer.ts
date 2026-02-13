import * as ApiRouteActions from './api-route.action';
import {
  ApiRoute,
  ApiRouteCommandResponse,
  ApiRouteSummary,
} from 'src/app/core/model/api-route.model';

export const API_ROUTE_STATE_NAME = 'apiRoute';

export interface ApiRouteState {
  apiRoutes: ApiRouteSummary[];
  apiRoute: ApiRoute;
  count: number;
  top: number;
  currentPage: number;
  totalApiRoutes: number;
  isApiRoutesLoading: boolean;
  isCountLoading: boolean;
  isApiRouteLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  apiRouteCommandResponse: ApiRouteCommandResponse;
}

const initialState: ApiRouteState = {
  apiRoutes: [],
  apiRoute: null,
  count: 0,
  top: 0,
  currentPage: 1,
  totalApiRoutes: 0,
  isApiRoutesLoading: false,
  isCountLoading: false,
  isApiRouteLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  apiRouteCommandResponse: null,
};

export function apiRouteReducers(
  state: ApiRouteState = initialState,
  action: ApiRouteActions.ApiRouteActions
): ApiRouteState {
  switch (action.type) {
    case ApiRouteActions.GET_ALL_API_ROUTES:
      return {
        ...state,
        isApiRoutesLoading: true,
      };
    case ApiRouteActions.GET_ALL_API_ROUTES_SUCCESS:
      const { count, data, pageIndex, pageSize } = action.payload;
      return {
        ...state,
        apiRoutes: data,
        count: count,
        top: pageSize,
        currentPage: pageIndex,
        isApiRoutesLoading: false,
      };

    case ApiRouteActions.GET_API_ROUTE_COUNT:
      return {
        ...state,
        isCountLoading: true,
      };

    case ApiRouteActions.GET_API_ROUTE_COUNT_SUCCESS:
      return {
        ...state,
        totalApiRoutes: action.payload,
        isCountLoading: false,
      };

    case ApiRouteActions.GET_API_ROUTE_BY_ID:
      return {
        ...state,
        isApiRouteLoading: true,
      };

    case ApiRouteActions.GET_API_ROUTE_BY_ID_SUCCESS:
      return {
        ...state,
        apiRoute: action.payload as unknown as ApiRoute,
        isApiRouteLoading: false,
      };

    case ApiRouteActions.CREATE_API_ROUTE:
      return {
        ...state,
        isCreating: true,
      };

    case ApiRouteActions.CREATE_API_ROUTE_SUCCESS:
      return {
        ...state,
        apiRouteCommandResponse: action.payload,
        isCreating: false,
      };

    case ApiRouteActions.CREATE_API_ROUTE_FAILED:
      return {
        ...state,
        isCreating: false,
      };

    case ApiRouteActions.UPDATE_API_ROUTE:
      return {
        ...state,
        isUpdating: true,
      };

    case ApiRouteActions.UPDATE_API_ROUTE_SUCCESS:
      return {
        ...state,
        apiRouteCommandResponse: action.payload as unknown as ApiRouteCommandResponse,
        isUpdating: false,
      };

    case ApiRouteActions.UPDATE_API_ROUTE_FAILED:
      return {
        ...state,
        isUpdating: false,
      };

    case ApiRouteActions.DELETE_API_ROUTE:
      return {
        ...state,
        isDeleting: true,
      };

    case ApiRouteActions.DELETE_API_ROUTE_SUCCESS:
      return {
        ...state,
        apiRouteCommandResponse: action.payload as unknown as ApiRouteCommandResponse,
        isDeleting: false,
      };

    case ApiRouteActions.DELETE_API_ROUTE_FAILED:
      return {
        ...state,
        isDeleting: false,
      };

    case ApiRouteActions.RESET_CREATE_SUCCESS:
      return {
        ...state,
        apiRouteCommandResponse: null,
      };
    case ApiRouteActions.RESET_UPDATE_SUCCESS:
      return {
        ...state,
        apiRouteCommandResponse: null,
      };
    case ApiRouteActions.RESET_DELETE_SUCCESS:
      return {
        ...state,
        apiRouteCommandResponse: null,
      };

    default:
      return state;
  }
}
