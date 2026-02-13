import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DASHBOARD_STATE_NAME, DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>(DASHBOARD_STATE_NAME);

export const selectDashboardSummary = createSelector(selectDashboardState, state => state.summary);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  state => state.isLoading
);
