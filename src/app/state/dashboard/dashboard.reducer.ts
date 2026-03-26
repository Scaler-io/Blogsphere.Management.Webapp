import { DashboardResponse } from 'src/app/core/model/dashboard.model';
import * as DashboardActions from './dashboard.action';

export const DASHBOARD_STATE_NAME = 'dashboard';

export interface DashboardState {
  summary: DashboardResponse | null;
  isLoading: boolean;
  activeScope: string | null;
}

const initialState: DashboardState = {
  summary: null,
  isLoading: false,
  activeScope: null,
};

export function dashboardReducer(
  state: DashboardState = initialState,
  action: DashboardActions.DashboardActions
): DashboardState {
  switch (action.type) {
    case DashboardActions.GET_DASHBOARD_SUMMARY:
    case DashboardActions.START_DASHBOARD_POLLING:
      return {
        ...state,
        isLoading: true,
        activeScope: action.payload ?? null,
        summary: null,
      };

    case DashboardActions.GET_DASHBOARD_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        isLoading: false,
        activeScope: action.payload.kind,
      };

    case DashboardActions.GET_DASHBOARD_SUMMARY_FAILED:
    case DashboardActions.STOP_DASHBOARD_POLLING:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
