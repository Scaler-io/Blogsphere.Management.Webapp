import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import * as SubscriptionActions from './subscription.action';
import { ApiSubscriptionService } from 'src/app/core/services/api-subscription.service';
import { Subscription as SubscriptionModel } from 'src/app/core/model/subscription.model';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as ErrorActions from '../error/error.action';

@Injectable()
export class SubscriptionEffects {
  constructor(private actions$: Actions, private apiSubscriptionService: ApiSubscriptionService) {}

  getAllSubscriptionsByProductId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActions.GET_ALL_SUBSCRIPTIONS_BY_PRODUCT_ID),
      switchMap((action: SubscriptionActions.GetAllSubscriptionsByProductId) =>
        this.apiSubscriptionService.getAllSubscriptionsByProductId(action.payload.productId).pipe(
          map(
            (subscriptions: SubscriptionModel[]) =>
              new SubscriptionActions.GetAllSubscriptionsByProductIdSuccess(subscriptions)
          ),
          catchError((error: any) => this.handleError(error, action.payload.productId))
        )
      )
    )
  );

  createSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActions.CREATE_SUBSCRIPTION),
      switchMap((action: SubscriptionActions.CreateSubscription) => {
        return this.apiSubscriptionService.createSubscription(action.payload).pipe(
          map(
            (subscription: SubscriptionModel) =>
              new SubscriptionActions.CreateSubscriptionSuccess(subscription)
          ),
          catchError((error: any) => this.handleError(error, action.payload.productId))
        );
      })
    )
  );

  deleteSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActions.DELETE_SUBSCRIPTION),
      delay(2000),
      switchMap((action: SubscriptionActions.DeleteSubscription) => {
        return this.apiSubscriptionService.deleteSubscription(action.payload.id).pipe(
          map(() => new SubscriptionActions.DeleteSubscriptionSuccess({ id: action.payload.id })),
          catchError((error: any) => this.handleError(error, action.payload.productId))
        );
      })
    )
  );

  private handleError(error: any, route: string): Observable<Action> {
    const errorState = {
      error: error,
      source: 'SubscribedApi',
      componentRoute: `/subscription/${route}`,
    };
    return of(new ErrorActions.SetError(errorState));
  }
}
