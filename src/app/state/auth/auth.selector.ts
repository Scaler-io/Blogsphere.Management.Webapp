import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_STATE_NAME } from './auth.reducer';

const authState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getAuthState = createSelector(authState, (state) => state.user);
export const getAuthStatus = createSelector(
  authState,
  (state) => state.isAuthenticated
);
