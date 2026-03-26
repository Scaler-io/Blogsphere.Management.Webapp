import { createFeatureSelector, createSelector } from '@ngrx/store';
import { API_PRODUCT_STATE_NAME, ApiProductState } from './api-product.reducer';

export const selectApiProductState = createFeatureSelector<ApiProductState>(
  API_PRODUCT_STATE_NAME
);

export const selectApiProducts = createSelector(
  selectApiProductState,
  (state) => state.apiProducts
);

export const selectApiProductsPageMetadata = createSelector(
  selectApiProductState,
  (state) => ({
    totalCount: state.totalCount,
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    totalPages: state.totalPages,
  })
);

/** Shape expected by `blogsphere-table` (PaginationMetaData: top, currentPage, count) */
export const selectApiProductsPaginationMetaData = createSelector(
  selectApiProductState,
  (state) => ({
    top: state.pageSize,
    currentPage: state.pageNumber,
    count: state.totalCount,
  })
);

export const selectApiProductsTotalCount = createSelector(
  selectApiProductState,
  (state) => state.totalCount
);

// fetch selected product
export const selectedApiProduct = createSelector(
  selectApiProductState,
  (state) => state.selectedApiProduct
);

// Loading and success states
export const selectApiProductsLoading = createSelector(
  selectApiProductState,
  (state) => state.isLoading
);

export const selectApiProductsCreating = createSelector(
  selectApiProductState,
  (state) => state.isCreating
);

export const selectApiProductsCreateSuccess = createSelector(
  selectApiProductState,
  (state) => state.createSuccess
);
