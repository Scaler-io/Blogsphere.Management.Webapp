import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, merge, Observable, of, switchMap } from 'rxjs';
import * as ApiRouteActions from './api-route.action';
import * as ErrorActions from '../error/error.action';
import { Action } from '@ngrx/store';
import {
  API_ROUTE_SERVICE_TOKEN,
  IApiRouteService,
} from 'src/app/core/services/interface/api-route-service.interface';
import {
  ApiRouteCommandResponse,
  ApiRouteCommandType,
} from 'src/app/core/model/api-route.model';
import { CommandResultStatus } from 'src/app/core/model/core';

@Injectable({ providedIn: 'root' })
export class ApiRouteEffects {
  constructor(
    @Inject(API_ROUTE_SERVICE_TOKEN) private readonly apiRouteService: IApiRouteService,
    private actions$: Actions
  ) {}

  getAllApiRoutes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiRouteActions.GET_ALL_API_ROUTES),
      switchMap((action: ApiRouteActions.GetAllApiRoutes) => {
        return this.apiRouteService.getAllApiRoutes(action.payload).pipe(
          map(apiRoutes => new ApiRouteActions.GetAllApiRoutesSuccess(apiRoutes)),
          catchError(error => {
            return this.handleError(error);
          })
        );
      })
    )
  );

  getApiRouteCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiRouteActions.GET_API_ROUTE_COUNT),
      switchMap((action: ApiRouteActions.GetApiRouteCount) => {
        return this.apiRouteService.getApiRouteCount(action.payload).pipe(
          map(apiRouteCount => new ApiRouteActions.GetApiRouteCountSuccess(apiRouteCount)),
          catchError(error => {
            return this.handleError(error);
          })
        );
      })
    )
  );

  getApiRouteById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiRouteActions.GET_API_ROUTE_BY_ID),
      switchMap((action: ApiRouteActions.GetApiRouteById) => {
        return this.apiRouteService.getApiRouteById(action.payload.id).pipe(
          map(apiRoute => new ApiRouteActions.GetApiRouteByIdSuccess(apiRoute)),
          catchError(error => {
            return this.handleError(error, 'Route Details', 'details/' + action.payload.id);
          })
        );
      })
    )
  );

  createApiRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiRouteActions.CREATE_API_ROUTE),
      switchMap((action: ApiRouteActions.CreateApiRoute) => {
        return this.apiRouteService.createApiRoute(action.payload).pipe(
          map(apiRoute => {
            const commandResponse: ApiRouteCommandResponse = {
              ...apiRoute,
              commandtType: ApiRouteCommandType.Create,
              status: CommandResultStatus.Success,
            };
            return new ApiRouteActions.CreateApiRouteSuccess(commandResponse);
          }),
          catchError(error => {
            return this.handleError(error, 'Route Setup', 'route-setup');
          })
        );
      })
    )
  );

  updateApiRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiRouteActions.UPDATE_API_ROUTE),
      switchMap((action: ApiRouteActions.UpdateApiRoute) => {
        return this.apiRouteService.updateApiRoute(action.payload.id, action.payload.apiRoute).pipe(
          delay(3000),
          map(apiRoute => {
            const commandResponse: ApiRouteCommandResponse = {
              ...apiRoute,
              commandtType: ApiRouteCommandType.Update,
              status: CommandResultStatus.Success,
            };
            return new ApiRouteActions.UpdateApiRouteSuccess(commandResponse);
          }),
          catchError(error => {
            return this.handleError(error, 'Route Setup', `route-setup/${action.payload.id}`);
          })
        );
      })
    )
  );

  deleteApiRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiRouteActions.DELETE_API_ROUTE),
      switchMap((action: ApiRouteActions.DeleteApiRoute) => {
        return this.apiRouteService.deleteApiRoute(action.payload.id).pipe(
          map(() => {
            const commandResponse: ApiRouteCommandResponse = {
              id: action.payload.id,
              commandtType: ApiRouteCommandType.Delete,
              status: CommandResultStatus.Success,
            };
            return new ApiRouteActions.DeleteApiRouteSuccess(commandResponse);
          }),
          catchError(error => this.handleError(error, 'ApiRoute'))
        );
      })
    )
  );

  private handleError(error: any, source?: string, route?: string): Observable<Action> {
    const errorState = {
      error: error,
      source: source ? source : 'ApiRoute',
      componentRoute: !route ? '/api-route' : `/api-route/${route}`,
    };
    return merge(
      of(new ErrorActions.SetError(errorState)),
      of(new ApiRouteActions.CreateApiRouteFailed()),
      of(new ApiRouteActions.UpdateApiRouteFailed()),
      of(new ApiRouteActions.DeleteApiRouteFailed())
    );
  }
}
