import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { hasAllPermissions, hasAnyPermission, hasPermission } from 'src/app/core/auth/permissions';
import { AuthState, AUTH_STATE_NAME } from './auth.reducer';
import { AppState } from 'src/app/store/app.state';

const authState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getAuthState = createSelector(authState, (state) => state.user);
export const getAuthStatus = createSelector(
  authState,
  (state) => state.isAuthenticated
);

/** Raw JWT permission list (or `'*'`) for the signed-in user. */
export const selectAuthUserPermissions = createSelector(
  getAuthState,
  (user) => user?.permissions
);

/** Memoized selectors so `store.select(selectHasPermission('x'))` stays stable across CD cycles. */
const hasPermissionSelectors = new Map<string, MemoizedSelector<AppState, boolean>>();
const hasAllPermissionsSelectors = new Map<string, MemoizedSelector<AppState, boolean>>();
const hasAnyPermissionsSelectors = new Map<string, MemoizedSelector<AppState, boolean>>();

/**
 * Selector factory: emits `true` when the current user has the given permission (or wildcard `'*'`).
 */
export function selectHasPermission(permission: string): MemoizedSelector<AppState, boolean> {
  let selector = hasPermissionSelectors.get(permission);
  if (!selector) {
    selector = createSelector(selectAuthUserPermissions, (permissions) =>
      hasPermission(permissions, permission)
    );
    hasPermissionSelectors.set(permission, selector);
  }
  return selector;
}

/**
 * Selector factory: emits `true` when the current user has every listed permission (or wildcard).
 */
export function selectHasAllPermissions(
  permissions: readonly string[]
): MemoizedSelector<AppState, boolean> {
  const key = [...permissions].sort().join('|');
  let selector = hasAllPermissionsSelectors.get(key);
  if (!selector) {
    selector = createSelector(selectAuthUserPermissions, (stored) =>
      hasAllPermissions(stored, permissions)
    );
    hasAllPermissionsSelectors.set(key, selector);
  }
  return selector;
}

/**
 * Selector factory: emits `true` when the current user has at least one listed permission (or wildcard).
 */
export function selectHasAnyPermission(
  permissions: readonly string[]
): MemoizedSelector<AppState, boolean> {
  const key = [...permissions].sort().join('|');
  let selector = hasAnyPermissionsSelectors.get(key);
  if (!selector) {
    selector = createSelector(selectAuthUserPermissions, (stored) =>
      hasAnyPermission(stored, permissions)
    );
    hasAnyPermissionsSelectors.set(key, selector);
  }
  return selector;
}
