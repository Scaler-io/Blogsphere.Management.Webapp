import { Action } from '@ngrx/store';
import {
  ApiProduct,
  PaginatedResult,
  CreateApiProductRequest,
} from 'src/app/core/model/subscription.model';

// Api Product Actions
export const GET_ALL_API_PRODUCTS = 'GET_ALL_API_PRODUCTS';
export const GET_ALL_API_PRODUCTS_SUCCESS = 'GET_ALL_API_PRODUCTS_SUCCESS';
export const GET_API_PRODUCT_BY_ID = 'GET_API_PRODUCT_BY_ID';
export const GET_API_PRODUCT_BY_ID_SUCCESS = 'GET_API_PRODUCT_BY_ID_SUCCESS';
export const CREATE_API_PRODUCT = 'CREATE_API_PRODUCT';
export const CREATE_API_PRODUCT_SUCCESS = 'CREATE_API_PRODUCT_SUCCESS';
export const DELETE_API_PRODUCT = 'DELETE_API_PRODUCT';
export const DELETE_API_PRODUCT_SUCCESS = 'DELETE_API_PRODUCT_SUCCESS';
export const RESET_CREATE_SUCCESS = 'RESET_CREATE_SUCCESS';
export const RESET_DELETE_SUCCESS = 'RESET_DELETE_SUCCESS';

// ============================================
// API PRODUCT ACTION CLASSES
// ============================================

export class GetAllApiProducts implements Action {
  readonly type = GET_ALL_API_PRODUCTS;
  constructor(public payload?: { pageNumber?: number; pageSize?: number }) {}
}

export class GetAllApiProductsSuccess implements Action {
  readonly type = GET_ALL_API_PRODUCTS_SUCCESS;
  constructor(public payload: PaginatedResult<ApiProduct>) {}
}

export class GetApiProductById implements Action {
  readonly type = GET_API_PRODUCT_BY_ID;
  constructor(public payload: { id: string }) {}
}

export class GetApiProductByIdSuccess implements Action {
  readonly type = GET_API_PRODUCT_BY_ID_SUCCESS;
  constructor(public payload: ApiProduct) {}
}

export class CreateApiProduct implements Action {
  readonly type = CREATE_API_PRODUCT;
  constructor(public payload: CreateApiProductRequest) {}
}

export class CreateApiProductSuccess implements Action {
  readonly type = CREATE_API_PRODUCT_SUCCESS;
  constructor(public payload: ApiProduct) {}
}

export class DeleteApiProduct implements Action {
  readonly type = DELETE_API_PRODUCT;
  constructor(public payload: { id: string }) {}
}

export class DeleteApiProductSuccess implements Action {
  readonly type = DELETE_API_PRODUCT_SUCCESS;
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

export type ApiProductActions =
  | GetAllApiProducts
  | GetAllApiProductsSuccess
  | GetApiProductById
  | GetApiProductByIdSuccess
  | CreateApiProduct
  | CreateApiProductSuccess
  | DeleteApiProduct
  | DeleteApiProductSuccess
  | ResetCreateSuccess
  | ResetDeleteSuccess;
