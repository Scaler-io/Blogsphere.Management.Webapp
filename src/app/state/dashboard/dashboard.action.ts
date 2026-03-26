import { Action } from '@ngrx/store';
import { DashboardResponse } from 'src/app/core/model/dashboard.model';

export const GET_DASHBOARD_SUMMARY = 'GET_DASHBOARD_SUMMARY';
export const GET_DASHBOARD_SUMMARY_SUCCESS = 'GET_DASHBOARD_SUMMARY_SUCCESS';
export const GET_DASHBOARD_SUMMARY_FAILED = 'GET_DASHBOARD_SUMMARY_FAILED';
export const START_DASHBOARD_POLLING = 'START_DASHBOARD_POLLING';
export const STOP_DASHBOARD_POLLING = 'STOP_DASHBOARD_POLLING';

export class GetDashboardSummary implements Action {
  readonly type = GET_DASHBOARD_SUMMARY;
  constructor(public payload: string) {}
}

export class GetDashboardSummarySuccess implements Action {
  readonly type = GET_DASHBOARD_SUMMARY_SUCCESS;
  constructor(public payload: DashboardResponse) {}
}

export class GetDashboardSummaryFailed implements Action {
  readonly type = GET_DASHBOARD_SUMMARY_FAILED;
  constructor() {}
}

export class StartDashboardPolling implements Action {
  readonly type = START_DASHBOARD_POLLING;
  constructor(public payload: string) {}
}

export class StopDashboardPolling implements Action {
  readonly type = STOP_DASHBOARD_POLLING;
  constructor() {}
}

export type DashboardActions =
  | GetDashboardSummary
  | GetDashboardSummarySuccess
  | GetDashboardSummaryFailed
  | StartDashboardPolling
  | StopDashboardPolling;
