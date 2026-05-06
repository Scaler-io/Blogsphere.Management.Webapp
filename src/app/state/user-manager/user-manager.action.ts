import { Action } from '@ngrx/store';
import { ManagementUser, ManagementUserSearchRequest, PaginatedManagementUserList } from 'src/app/core/model/user-manager.model';

export const GET_MANAGEMENT_USERS = 'GET_MANAGEMENT_USERS';
export const GET_MANAGEMENT_USERS_SUCCESS = 'GET_MANAGEMENT_USERS_SUCCESS';
export const GET_MANAGEMENT_USERS_FAILED = 'GET_MANAGEMENT_USERS_FAILED';

export const GET_MANAGEMENT_USER = 'GET_MANAGEMENT_USER';
export const GET_MANAGEMENT_USER_SUCCESS = 'GET_MANAGEMENT_USER_SUCCESS';
export const GET_MANAGEMENT_USER_FAILED = 'GET_MANAGEMENT_USER_FAILED';

export const GET_MANAGEMENT_USER_COUNT = 'GET_MANAGEMENT_USER_COUNT';
export const GET_MANAGEMENT_USER_COUNT_SUCCESS = 'GET_MANAGEMENT_USER_COUNT_SUCCESS';
export const GET_MANAGEMENT_USER_COUNT_FAILED = 'GET_MANAGEMENT_USER_COUNT_FAILED';

export class GetManagementUser implements Action {
  readonly type = GET_MANAGEMENT_USER;
  constructor(public payload: { id: string }) {}
}

export class GetManagementUserSuccess implements Action {
  readonly type = GET_MANAGEMENT_USER_SUCCESS;
  constructor(public payload: ManagementUser) {}
}

export class GetManagementUserFailed implements Action {
  readonly type = GET_MANAGEMENT_USER_FAILED;
}

export class GetManagementUsers implements Action {
  readonly type = GET_MANAGEMENT_USERS;
  constructor(public payload: ManagementUserSearchRequest) {}
}

export class GetManagementUsersSuccess implements Action {
  readonly type = GET_MANAGEMENT_USERS_SUCCESS;
  constructor(public payload: PaginatedManagementUserList) {}
}

export class GetManagementUsersFailed implements Action {
  readonly type = GET_MANAGEMENT_USERS_FAILED;
}

export class GetManagementUserCount implements Action {
  readonly type = GET_MANAGEMENT_USER_COUNT;
  constructor(public payload?: ManagementUserSearchRequest) {}
}

export class GetManagementUserCountSuccess implements Action {
  readonly type = GET_MANAGEMENT_USER_COUNT_SUCCESS;
  constructor(public payload: number) {}
}

export class GetManagementUserCountFailed implements Action {
  readonly type = GET_MANAGEMENT_USER_COUNT_FAILED;
}

export type UserManagerActions =
  | GetManagementUsers
  | GetManagementUsersSuccess
  | GetManagementUsersFailed
  | GetManagementUserCount
  | GetManagementUserCountSuccess
  | GetManagementUserCountFailed
  | GetManagementUser
  | GetManagementUserSuccess
  | GetManagementUserFailed;
