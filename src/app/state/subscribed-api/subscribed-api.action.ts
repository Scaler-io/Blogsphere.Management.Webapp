import { Action } from '@ngrx/store';
import { SubscribedApi, CreateSubscribedApiRequest } from 'src/app/core/model/subscription.model';

// Subscribed Api Actions
export const GET_ALL_SUBSCRIBED_APIS_BY_PRODUCT_ID = 'GET_ALL_SUBSCRIBED_APIS_BY_PRODUCT_ID';
export const GET_ALL_SUBSCRIBED_APIS_BY_PRODUCT_ID_SUCCESS =
  'GET_ALL_SUBSCRIBED_APIS_BY_PRODUCT_ID_SUCCESS';
export const CREATE_SUBSCRIBED_API = 'CREATE_SUBSCRIBED_API';
export const CREATE_SUBSCRIBED_API_SUCCESS = 'CREATE_SUBSCRIBED_API_SUCCESS';
export const DELETE_SUBSCRIBED_API = 'DELETE_SUBSCRIBED_API';
export const DELETE_SUBSCRIBED_API_SUCCESS = 'DELETE_SUBSCRIBED_API_SUCCESS';
export const RESET_CREATE_SUCCESS = 'RESET_CREATE_SUCCESS';
export const RESET_DELETE_SUCCESS = 'RESET_DELETE_SUCCESS';


// ============================================
// SUBSCRIBED API ACTION CLASSES
// ============================================

export class GetAllSubscribedApisByProductId implements Action {
  readonly type = GET_ALL_SUBSCRIBED_APIS_BY_PRODUCT_ID;
  constructor(public payload: { productId: string }) {}
}

export class GetAllSubscribedApisByProductIdSuccess implements Action {
  readonly type = GET_ALL_SUBSCRIBED_APIS_BY_PRODUCT_ID_SUCCESS;
  constructor(public payload: SubscribedApi[]) {}
}

export class CreateSubscribedApi implements Action {
  readonly type = CREATE_SUBSCRIBED_API;
  constructor(public payload: CreateSubscribedApiRequest) {}
}

export class CreateSubscribedApiSuccess implements Action {
  readonly type = CREATE_SUBSCRIBED_API_SUCCESS;
  constructor(public payload: SubscribedApi) {}
}

export class DeleteSubscribedApi implements Action {
  readonly type = DELETE_SUBSCRIBED_API;
  constructor(public payload: { id: string }) {}
}

export class DeleteSubscribedApiSuccess implements Action {
  readonly type = DELETE_SUBSCRIBED_API_SUCCESS;
  constructor(public payload: { id: string }) {}
}

export class ResetCreateSuccess implements Action {
  readonly type = RESET_CREATE_SUCCESS;
}

export class ResetDeleteSuccess implements Action {
  readonly type = RESET_DELETE_SUCCESS;
}

// ============================================
// ACTION TYPES UNION
// ============================================

export type SubscribedApiActions =
  | GetAllSubscribedApisByProductId
  | GetAllSubscribedApisByProductIdSuccess
  | CreateSubscribedApi
  | CreateSubscribedApiSuccess
  | DeleteSubscribedApi
  | DeleteSubscribedApiSuccess
  | ResetCreateSuccess
  | ResetDeleteSuccess;
