import {
  AppUser,
  AppUserCommandResponse,
  AppUserSummary,
  ManagementUser,
  ManagementUserCommandResponse,
  ManagementUserSummary,
} from 'src/app/core/model/user-manager.model';
import * as UserManagerActions from './user-manager.action';

export const USER_MANAGER_STATE_NAME = 'userManager';

export interface AppUserBranchState {
  appUser: AppUser | null;
  appUsers: AppUserSummary[];
  count: number;
  top: number;
  currentPage: number;
  totalAppUsers: number;
  isAppUsersLoading: boolean;
  isCountLoading: boolean;
  isAppUserLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  appUserCommandResponse: AppUserCommandResponse | null;
}

export interface ManagementUserBranchState {
  managementUser: ManagementUser | null;
  managementUsers: ManagementUserSummary[];
  count: number;
  top: number;
  currentPage: number;
  totalManagementUsers: number;
  isManagementUsersLoading: boolean;
  isCountLoading: boolean;
  isManagementUserLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  managementUserCommandResponse: ManagementUserCommandResponse | null;
}

export interface UserManagerState {
  appUser: AppUserBranchState;
  managementUser: ManagementUserBranchState;
}

const initialAppUserBranch: AppUserBranchState = {
  appUser: null,
  appUsers: [],
  count: 0,
  top: 0,
  currentPage: 1,
  totalAppUsers: 0,
  isAppUsersLoading: false,
  isCountLoading: false,
  isAppUserLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  appUserCommandResponse: null,
};

const initialManagementUserBranch: ManagementUserBranchState = {
  managementUser: null,
  managementUsers: [],
  count: 0,
  top: 0,
  currentPage: 1,
  totalManagementUsers: 0,
  isManagementUsersLoading: false,
  isCountLoading: false,
  isManagementUserLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  managementUserCommandResponse: null,
};

export const initialUserManagerState: UserManagerState = {
  appUser: { ...initialAppUserBranch },
  managementUser: { ...initialManagementUserBranch },
};

export function userManagerReducer(
  state = initialUserManagerState,
  action: UserManagerActions.UserManagerActions
): UserManagerState {
  switch (action.type) {
    case UserManagerActions.GET_MANAGEMENT_USERS:
      return {
        ...state,
        managementUser: {
          ...state.managementUser,
          isManagementUsersLoading: true,
        },
      };

    case UserManagerActions.GET_MANAGEMENT_USERS_SUCCESS: {
      const { count, data, pageIndex, pageSize } = action.payload;
      return {
        ...state,
        managementUser: {
          ...state.managementUser,
          managementUsers: data,
          count,
          top: pageSize,
          currentPage: pageIndex,
          isManagementUsersLoading: false,
        },
      };
    }

    case UserManagerActions.GET_MANAGEMENT_USERS_FAILED:
      return {
        ...state,
        managementUser: {
          ...state.managementUser,
          isManagementUsersLoading: false,
        },
      };

    case UserManagerActions.GET_MANAGEMENT_USER_COUNT:
      return {
        ...state,
        managementUser: {
          ...state.managementUser,
          isCountLoading: true,
        },
      };

    case UserManagerActions.GET_MANAGEMENT_USER_COUNT_SUCCESS:
      return {
        ...state,
        managementUser: {
          ...state.managementUser,
          totalManagementUsers: action.payload,
          isCountLoading: false,
        },
      };
    case UserManagerActions.GET_MANAGEMENT_USER:
      return {
        ...state,
        managementUser: {
          ...state.managementUser,
          isManagementUserLoading: true,
        },
      };
    case UserManagerActions.GET_MANAGEMENT_USER_SUCCESS:
      return {
        ...state,
        managementUser: {
          ...state.managementUser,
          managementUser: action.payload,
          isManagementUserLoading: false,
        },
      };
    case UserManagerActions.GET_MANAGEMENT_USER_FAILED:
      return {
        ...state,
        managementUser: {
          ...state.managementUser,
          isManagementUserLoading: false,
        },
      };

    default:
      return state;
  }
}
