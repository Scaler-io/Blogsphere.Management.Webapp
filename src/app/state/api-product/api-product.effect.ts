import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiSubscriptionService } from 'src/app/core/services/api-subscription.service';
import * as ApiProductActions from './api-product.action';
import * as ErrorActions from '../error/error.action';
import { catchError, delay, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class ApiProductEffects {
  constructor(
    private readonly apiSubscriptionService: ApiSubscriptionService,
    private actions$: Actions // private apiSubscriptionService: ApiSubscriptionService
  ) {}

  getAllApiProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiProductActions.GET_ALL_API_PRODUCTS),
      switchMap((action: ApiProductActions.GetAllApiProducts) => {
        return this.apiSubscriptionService
          .getAllApiProducts(action.payload?.pageNumber, action.payload?.pageSize)
          .pipe(
            map(apiProducts => new ApiProductActions.GetAllApiProductsSuccess(apiProducts)),
            catchError(error => {
              return this.handleError(error);
            })
          );
      })
    )
  );

  getApiProductById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ApiProductActions.GET_API_PRODUCT_BY_ID),
      switchMap((action: ApiProductActions.GetApiProductById) =>
        this.apiSubscriptionService.getApiProductById(action.payload?.id).pipe(
          map(apiProduct => new ApiProductActions.GetApiProductByIdSuccess(apiProduct)),
          catchError(error => {
            return this.handleError(error);
          })
        )
      )
    );
  });

  createApiProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiProductActions.CREATE_API_PRODUCT),
      switchMap((action: ApiProductActions.CreateApiProduct) =>
        this.apiSubscriptionService.createApiProduct(action.payload).pipe(
          map(apiProduct => new ApiProductActions.CreateApiProductSuccess(apiProduct)),
          catchError(error => {
            return this.handleError(error);
          })
        )
      )
    )
  );

  private handleError(error: any): Observable<Action> {
    const errorState = {
      error: error,
      source: 'ApiProduct',
      componentRoute: '/subscription',
    };
    return of(new ErrorActions.SetError(errorState));
  }
}
