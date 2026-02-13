import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  catchError,
  EMPTY,
  expand,
  map,
  merge,
  Observable,
  of,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs';
import * as DashboardActions from './dashboard.action';
import * as ErrorActions from '../error/error.action';
import {
  DASHBOARD_SERVICE_TOKEN,
  IDashboardService,
} from 'src/app/core/services/interface/dashboard-service.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardEffects {
  constructor(
    @Inject(DASHBOARD_SERVICE_TOKEN) private readonly dashboardService: IDashboardService,
    private actions$: Actions
  ) {}

  getDashboardSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.GET_DASHBOARD_SUMMARY),
      switchMap(() => {
        return this.dashboardService.getDashboardSummary().pipe(
          map(summary => new DashboardActions.GetDashboardSummarySuccess(summary)),
          catchError(error => this.handleError(error))
        );
      })
    )
  );

  /**
   * Starts a polling loop that:
   * - fetches immediately
   * - then waits `environment.dashboardRefreshIntervalSeconds` (default 30s)
   * - repeats until STOP_DASHBOARD_POLLING is dispatched
   */
  pollDashboardSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.START_DASHBOARD_POLLING),
      switchMap(() =>
        this.dashboardService.getDashboardSummary().pipe(
          map(summary => new DashboardActions.GetDashboardSummarySuccess(summary)),
          catchError(error => this.handleError(error)),
          expand((action: any) => {
            // Only schedule next poll once per "cycle".
            // - On success: wait environment configured interval (default 30s).
            // - On failed: retry after environment configured interval (default 30s).
            // - Ignore SET_ERROR so we don't schedule twice (handleError merges two actions).
            const refreshAfterSeconds = Math.max(
              0,
              environment.dashboardRefreshIntervalSeconds ?? 30
            );

            if (action?.type === DashboardActions.GET_DASHBOARD_SUMMARY_SUCCESS) {
              return timer(refreshAfterSeconds * 1000).pipe(
                switchMap(() =>
                  this.dashboardService.getDashboardSummary().pipe(
                    map(
                      nextSummary => new DashboardActions.GetDashboardSummarySuccess(nextSummary)
                    ),
                    catchError(error => this.handleError(error))
                  )
                )
              );
            }

            if (action?.type === DashboardActions.GET_DASHBOARD_SUMMARY_FAILED) {
              return timer(refreshAfterSeconds * 1000).pipe(
                switchMap(() =>
                  this.dashboardService.getDashboardSummary().pipe(
                    map(
                      nextSummary => new DashboardActions.GetDashboardSummarySuccess(nextSummary)
                    ),
                    catchError(error => this.handleError(error))
                  )
                )
              );
            }

            return EMPTY;
          }),
          takeUntil(this.actions$.pipe(ofType(DashboardActions.STOP_DASHBOARD_POLLING)))
        )
      )
    )
  );

  private handleError(error: any, source?: string, route?: string): Observable<Action> {
    const errorState = {
      error: error,
      source: source ? source : 'Dashboard',
      componentRoute: !route ? '/dashboard' : `/dashboard/${route}`,
    };
    return merge(
      of(new ErrorActions.SetError(errorState)),
      of(new DashboardActions.GetDashboardSummaryFailed())
    );
  }
}
