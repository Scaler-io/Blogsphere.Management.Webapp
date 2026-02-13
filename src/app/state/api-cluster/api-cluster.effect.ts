import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, merge, Observable, of, switchMap } from 'rxjs';
import * as ApiClusterActions from './api-custer.action';
import * as ErrorActions from '../error/error.action';
import { Action } from '@ngrx/store';
import {
  ApiClusterCommandResponse,
  ApiClusterCommandType,
} from 'src/app/core/model/api-cluster.model';
import { CommandResultStatus } from 'src/app/core/model/core';
import {
  IApiClusterService,
  API_CLUSTER_SERVICE_TOKEN,
} from 'src/app/core/services/interface/api-custer-service.interface';

@Injectable({ providedIn: 'root' })
export class ApiClusterEffects {
  constructor(
    @Inject(API_CLUSTER_SERVICE_TOKEN) private readonly apiClusterService: IApiClusterService,
    private actions$: Actions
  ) {}

  getAllApiClusters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiClusterActions.GET_ALL_API_CLUSTERS),
      switchMap((action: ApiClusterActions.GetAllApiClusters) => {
        return this.apiClusterService.getAllApiClusters(action.payload).pipe(
          map(apiClusters => new ApiClusterActions.GetAllApiClustersSuccess(apiClusters)),
          catchError(error => {
            return this.handleError(error);
          })
        );
      })
    )
  );

  getApiClusterCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiClusterActions.GET_API_CLUSTER_COUNT),
      switchMap((action: ApiClusterActions.GetApiClusterCount) => {
        return this.apiClusterService.getApiClusterCount(action.payload).pipe(
          map(apiClusterCount => new ApiClusterActions.GetApiClusterCountSuccess(apiClusterCount)),
          catchError(error => {
            return this.handleError(error);
          })
        );
      })
    )
  );

  getApiClusterById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiClusterActions.GET_API_CLUSTER_BY_ID),
      switchMap((action: ApiClusterActions.GetApiClusterById) => {
        return this.apiClusterService.getApiClusterById(action.payload.id).pipe(
          map(apiCluster => new ApiClusterActions.GetApiClusterByIdSuccess(apiCluster)),
          catchError(error => {
            return this.handleError(error, 'Cluster Setup', 'cluster-setup/' + action.payload.id);
          })
        );
      })
    )
  );

  createApiCuster$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiClusterActions.CREATE_API_CLUSTER),
      switchMap((action: ApiClusterActions.CreateApiCluster) => {
        return this.apiClusterService.createApiCluster(action.payload).pipe(
          map(apiCluster => {
            const commandResponse: ApiClusterCommandResponse = {
              ...apiCluster,
              commandtType: ApiClusterCommandType.Create,
              status: CommandResultStatus.Success,
            };
            return new ApiClusterActions.CreateApiClusterSuccess(commandResponse);
          }),
          catchError(error => {
            return this.handleError(error, 'Cluster Setup', 'cluster-setup');
          })
        );
      })
    )
  );

  updateApiCluster$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiClusterActions.UPDATE_API_CLUSTER),
      switchMap((action: ApiClusterActions.UpdateApiCluster) => {
        return this.apiClusterService
          .updateApiCluster(action.payload.id, action.payload.apiCluster)
          .pipe(
            delay(3000),
            map(apiCluster => {
              const commandResponse: ApiClusterCommandResponse = {
                ...apiCluster,
                commandtType: ApiClusterCommandType.Update,
                status: CommandResultStatus.Success,
              };
              return new ApiClusterActions.UpdateApiClusterSuccess(commandResponse);
            }),
            catchError(error => {
              return this.handleError(error, 'Cluster Setup', `cluster-setup/${action.payload.id}`);
            })
          );
      })
    )
  );

  deleteApiCluster$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiClusterActions.DELETE_API_CLUSTER),
      switchMap((action: ApiClusterActions.DeleteApiCluster) => {
        return this.apiClusterService.deleteApiCluster(action.payload.id).pipe(
          map(() => {
            const commandResponse: ApiClusterCommandResponse = {
              id: action.payload.id,
              commandtType: ApiClusterCommandType.Delete,
              status: CommandResultStatus.Success,
            };
            return new ApiClusterActions.DeleteApiClusterSuccess(commandResponse);
          }),
          catchError(error => this.handleError(error, 'ApiCluster', 'api-cluster'))
        );
      })
    )
  );

  private handleError(error: any, source?: string, route?: string): Observable<Action> {
    const errorState = {
      error: error,
      source: source ? source : 'ApiCluster',
      componentRoute: !route ? '/api-cluster' : `/api-cluster/${route}`,
    };
    return merge(
      of(new ErrorActions.SetError(errorState)),
      of(new ApiClusterActions.CreateApiClusterFailed()),
      of(new ApiClusterActions.UpdateApiClusterFailed()),
      of(new ApiClusterActions.DeleteApiClusterFailed())
    );
  }
}
