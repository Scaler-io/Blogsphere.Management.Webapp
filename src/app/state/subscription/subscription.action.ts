import { Action } from '@ngrx/store';
import {
  Subscription as SubscriptionModel,
  CreateSubscriptionRequest,
} from 'src/app/core/model/subscription.model';

// Subscription Actions
export const GET_ALL_SUBSCRIPTIONS_BY_PRODUCT_ID = 'GET_ALL_SUBSCRIPTIONS_BY_PRODUCT_ID';
export const GET_ALL_SUBSCRIPTIONS_BY_PRODUCT_ID_SUCCESS =
  'GET_ALL_SUBSCRIPTIONS_BY_PRODUCT_ID_SUCCESS';

export const CREATE_SUBSCRIPTION = 'CREATE_SUBSCRIPTION';
export const CREATE_SUBSCRIPTION_SUCCESS = 'CREATE_SUBSCRIPTION_SUCCESS';

export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION';
export const DELETE_SUBSCRIPTION_SUCCESS = 'DELETE_SUBSCRIPTION_SUCCESS';

export const RESET_CREATE_SUCCESS = 'RESET_CREATE_SUCCESS';
export const RESET_DELETE_SUCCESS = 'RESET_DELETE_SUCCESS';

// ============================================
// SUBSCRIPTION ACTION CLASSES
// ============================================

export class GetAllSubscriptionsByProductId implements Action {
  readonly type = GET_ALL_SUBSCRIPTIONS_BY_PRODUCT_ID;
  constructor(public payload: { productId: string }) {}
}

export class GetAllSubscriptionsByProductIdSuccess implements Action {
  readonly type = GET_ALL_SUBSCRIPTIONS_BY_PRODUCT_ID_SUCCESS;
  constructor(public payload: SubscriptionModel[]) {}
}

export class CreateSubscription implements Action {
  readonly type = CREATE_SUBSCRIPTION;
  constructor(public payload: CreateSubscriptionRequest) {}
}

export class CreateSubscriptionSuccess implements Action {
  readonly type = CREATE_SUBSCRIPTION_SUCCESS;
  constructor(public payload: SubscriptionModel) {}
}

export class DeleteSubscription implements Action {
  readonly type = DELETE_SUBSCRIPTION;
  constructor(public payload: { id: string; productId?: string }) {}
}

export class DeleteSubscriptionSuccess implements Action {
  readonly type = DELETE_SUBSCRIPTION_SUCCESS;
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

export type SubscriptionActions =
  | GetAllSubscriptionsByProductId
  | GetAllSubscriptionsByProductIdSuccess
  | CreateSubscription
  | CreateSubscriptionSuccess
  | DeleteSubscription
  | DeleteSubscriptionSuccess
  | ResetCreateSuccess
  | ResetDeleteSuccess;
