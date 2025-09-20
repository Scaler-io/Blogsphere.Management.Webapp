import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ERROR_STATE_NAME, ErrorState } from './error.reducer';

export const selectErrorState =
  createFeatureSelector<ErrorState>(ERROR_STATE_NAME);

export const selectError = createSelector(
  selectErrorState,
  (state: ErrorState) => state.error
);
export const selectErrorSource = createSelector(
  selectErrorState,
  (state: ErrorState) => state.source
);
export const selectErrorComponentRoute = createSelector(
  selectErrorState,
  (state: ErrorState) => state.componentRoute
);
