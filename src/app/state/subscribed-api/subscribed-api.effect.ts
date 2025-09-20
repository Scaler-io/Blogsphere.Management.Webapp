import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SubscribedApi } from 'src/app/core/model/subscription.model';
import * as SubscribedApiActions from './subscribed-api.action';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiSubscriptionService } from 'src/app/core/services/api-subscription.service';
import * as ErrorActions from '../error/error.action';
import { Action } from '@ngrx/store';

@Injectable()
export class SubscribedApiEffects {
  constructor(
    private actions$: Actions, // private apiSubscriptionService: ApiSubscriptionService
    private subscribedApiService: ApiSubscriptionService
  ) {}

  // TODO: Implement effects
  getAllSubscribedApisByProductId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscribedApiActions.GET_ALL_SUBSCRIBED_APIS_BY_PRODUCT_ID),
      switchMap((action: SubscribedApiActions.GetAllSubscribedApisByProductId) => {
        return this.subscribedApiService
          .getAllSubscribedApisByProductId(action.payload.productId)
          .pipe(
            map(
              (subscribedApis: SubscribedApi[]) =>
                new SubscribedApiActions.GetAllSubscribedApisByProductIdSuccess(subscribedApis)
            ),
            catchError((error: any) => this.handleError(error))
          );
      })
    )
  );

  createSubscribedApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscribedApiActions.CREATE_SUBSCRIBED_API),
      switchMap((action: SubscribedApiActions.CreateSubscribedApi) => {
        return this.subscribedApiService.createSubscribedApi(action.payload).pipe(
          map(
            (subscribedApi: SubscribedApi) =>
              new SubscribedApiActions.CreateSubscribedApiSuccess(subscribedApi)
          ),
          catchError((error: any) => this.handleError(error))
        );
      })
    )
  );

  deleteSubscribedApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscribedApiActions.DELETE_SUBSCRIBED_API),
      switchMap((action: SubscribedApiActions.DeleteSubscribedApi) => {
        return this.subscribedApiService.deleteSubscribedApi(action.payload.id).pipe(
          delay(3000),
          map(() => new SubscribedApiActions.DeleteSubscribedApiSuccess({ id: action.payload.id })),
          catchError((error: any) => this.handleError(error))
        );
      })
    )
  );

  private handleError(error: any): Observable<Action> {
    const errorState = {
      error: error,
      source: 'SubscribedApi',
      componentRoute: '/subscription',
    };
    return of(new ErrorActions.SetError(errorState));
  }
}
