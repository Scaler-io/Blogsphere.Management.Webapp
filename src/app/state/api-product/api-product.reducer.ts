import { ApiProduct, PaginatedResult } from 'src/app/core/model/subscription.model';
import * as ApiProductActions from './api-product.action';

export const API_PRODUCT_STATE_NAME = 'apiProductState';

export interface ApiProductState {
  apiProducts: ApiProduct[] | null;
  selectedApiProduct: ApiProduct | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  createSuccess: boolean;
  deleteSuccess: boolean;
}

export const initialApiProductState: ApiProductState = {
  apiProducts: null,
  selectedApiProduct: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  totalPages: 0,
  isLoading: false,
  isCreating: false,
  isDeleting: false,
  createSuccess: false,
  deleteSuccess: false,
};

export function apiProductReducer(
  state = initialApiProductState,
  action: ApiProductActions.ApiProductActions
): ApiProductState {
  switch (action.type) {
    // Get All Api Products
    case ApiProductActions.GET_ALL_API_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };

    case ApiProductActions.GET_ALL_API_PRODUCTS_SUCCESS:
      return {
        ...state,
        apiProducts: action.payload.items,
        totalCount: action.payload.totalCount,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        totalPages: action.payload.totalPages,
        isLoading: false,
      };

    // Get Api Product By Id
    case ApiProductActions.GET_API_PRODUCT_BY_ID:
      return {
        ...state,
        isLoading: true,
      };

    case ApiProductActions.GET_API_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        selectedApiProduct: action.payload,
        isLoading: false,
      };

    // Create Api Product
    case ApiProductActions.CREATE_API_PRODUCT:
      return {
        ...state,
        isCreating: true,
        createSuccess: false,
      };

    case ApiProductActions.CREATE_API_PRODUCT_SUCCESS:
      const newApiProduct = action.payload;
      let updatedApiProducts = [...state.apiProducts, newApiProduct];

      return {
        ...state,
        apiProducts: updatedApiProducts,
        totalCount: state.totalCount + 1,
        totalPages: Math.ceil((state.totalCount + 1) / state.pageSize),
        selectedApiProduct: newApiProduct,
        isCreating: false,
        createSuccess: true,
      };

    // Delete Api Product
    case ApiProductActions.DELETE_API_PRODUCT:
      return {
        ...state,
        isDeleting: true,
        deleteSuccess: false,
      };

    case ApiProductActions.DELETE_API_PRODUCT_SUCCESS:
      const deletedId = action.payload.id;
      let filteredApiProducts = state.apiProducts;

      if (filteredApiProducts) {
        filteredApiProducts = filteredApiProducts.filter(item => item.productId !== deletedId);
        state.totalCount = state.totalCount - 1;
        state.totalPages = Math.ceil(state.totalCount / state.pageSize);
      }

      return {
        ...state,
        apiProducts: filteredApiProducts,
        selectedApiProduct:
          state.selectedApiProduct?.productId === deletedId ? null : state.selectedApiProduct,
        isDeleting: false,
        deleteSuccess: true,
      };

    // Reset Create Success
    case ApiProductActions.RESET_CREATE_SUCCESS:
      return {
        ...state,
        createSuccess: false,
        isCreating: false,
      };

    // Reset Delete Success
    case ApiProductActions.RESET_DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: false,
        isDeleting: false,
      };

    default:
      return state;
  }
}
