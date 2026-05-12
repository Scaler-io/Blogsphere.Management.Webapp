import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_MANAGER_STATE_NAME, UserManagerState } from './user-manager.reducer';

export const selectUserManagerState = createFeatureSelector<UserManagerState>(
  USER_MANAGER_STATE_NAME
);

// --- App user branch (mirrors api-cluster selectors) ---

export const selectAppUserState = createSelector(
  selectUserManagerState,
  state => state.appUser
);

export const selectAppUsers = createSelector(
  selectUserManagerState,
  state => state.appUser.appUsers
);

export const selectAppUserPageMetadata = createSelector(selectUserManagerState, state => ({
  top: state.appUser.top,
  currentPage: state.appUser.currentPage,
  count: state.appUser.count,
}));

export const selectTotalAppUsers = createSelector(
  selectUserManagerState,
  state => state.appUser.totalAppUsers
);

export const selectAppUserEntity = createSelector(
  selectUserManagerState,
  state => state.appUser.appUser
);

export const selectAppUsersLoading = createSelector(
  selectUserManagerState,
  state => state.appUser.isAppUsersLoading
);

export const selectAppUserCountLoading = createSelector(
  selectUserManagerState,
  state => state.appUser.isCountLoading
);

export const selectAppUserLoading = createSelector(
  selectUserManagerState,
  state => state.appUser.isAppUserLoading
);

export const selectAppUserCreating = createSelector(
  selectUserManagerState,
  state => state.appUser.isCreating
);

export const selectAppUserUpdating = createSelector(
  selectUserManagerState,
  state => state.appUser.isUpdating
);

export const selectAppUserDeleting = createSelector(
  selectUserManagerState,
  state => state.appUser.isDeleting
);

export const selectAppUserCommandResponse = createSelector(
  selectUserManagerState,
  state => state.appUser.appUserCommandResponse
);

// --- Management user branch (mirrors api-cluster selectors) ---

export const selectManagementUserState = createSelector(
  selectUserManagerState,
  state => state.managementUser
);

export const selectManagementUsers = createSelector(
  selectUserManagerState,
  state => state.managementUser.managementUsers
);

export const selectManagementUserPageMetadata = createSelector(selectUserManagerState, state => ({
  top: state.managementUser.top,
  currentPage: state.managementUser.currentPage,
  count: state.managementUser.count,
}));

export const selectTotalManagementUsers = createSelector(
  selectUserManagerState,
  state => state.managementUser.totalManagementUsers
);

/** Single management user (detail) — same role as apiCluster.apiCluster */
export const selectManagementUserEntity = createSelector(
  selectUserManagerState,
  state => state.managementUser.managementUser
);

export const selectManagementUsersLoading = createSelector(
  selectUserManagerState,
  state => state.managementUser.isManagementUsersLoading
);

export const selectManagementUserCountLoading = createSelector(
  selectUserManagerState,
  state => state.managementUser.isCountLoading
);

export const selectManagementUserLoading = createSelector(
  selectUserManagerState,
  state => state.managementUser.isManagementUserLoading
);

export const selectManagementUserCreating = createSelector(
  selectUserManagerState,
  state => state.managementUser.isCreating
);

export const selectManagementUserUpdating = createSelector(
  selectUserManagerState,
  state => state.managementUser.isUpdating
);

export const selectManagementUserDeleting = createSelector(
  selectUserManagerState,
  state => state.managementUser.isDeleting
);

export const selectManagementUserCommandResponse = createSelector(
  selectUserManagerState,
  state => state.managementUser.managementUserCommandResponse
);
