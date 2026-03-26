import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, exhaustMap, map, merge, Observable, of, switchMap, takeUntil, timer } from 'rxjs';
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
      switchMap((action: DashboardActions.GetDashboardSummary) => {
        const scope = action.payload;
        return this.dashboardService.getDashboardSummary(scope).pipe(
          map((summary) => new DashboardActions.GetDashboardSummarySuccess(summary)),
          catchError((error) => this.handleError(error))
        );
      })
    )
  );

  /**
   * Polls on a fixed interval until STOP_DASHBOARD_POLLING. Uses the scope from
   * StartDashboardPolling for every request (fixes accidental use of summary payload as scope).
   */
  pollDashboardSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.START_DASHBOARD_POLLING),
      switchMap((action: DashboardActions.StartDashboardPolling) => {
        const scope = action.payload;
        const intervalSeconds = Math.max(1, environment.dashboardRefreshIntervalSeconds ?? 30);
        const intervalMs = intervalSeconds * 1000;

        return timer(0, intervalMs).pipe(
          exhaustMap(() =>
            this.dashboardService.getDashboardSummary(scope).pipe(
              map((summary) => new DashboardActions.GetDashboardSummarySuccess(summary)),
              catchError((error) => this.handleError(error))
            )
          ),
          takeUntil(this.actions$.pipe(ofType(DashboardActions.STOP_DASHBOARD_POLLING)))
        );
      })
    )
  );

  private handleError(error: unknown, source?: string, route?: string): Observable<Action> {
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
