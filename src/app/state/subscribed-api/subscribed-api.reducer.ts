import { SubscribedApi } from 'src/app/core/model/subscription.model';
import * as SubscribedApiActions from './subscribed-api.action';

export const SUBSCRIBED_API_STATE_NAME = 'subscribedApi';

export interface SubscribedApiState {
  subscribedApis: SubscribedApi[] | null;
  isLoading: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  createSuccess: boolean;
  deleteSuccess: boolean;
}

export const initialSubscribedApiState: SubscribedApiState = {
  subscribedApis: null,
  isLoading: false,
  isCreating: false,
  isDeleting: false,
  createSuccess: false,
  deleteSuccess: false,
};

export function subscribedApiReducer(
  state = initialSubscribedApiState,
  action: SubscribedApiActions.SubscribedApiActions
): SubscribedApiState {
  switch (action.type) {
    // Get All Subscribed Apis
    case SubscribedApiActions.GET_ALL_SUBSCRIBED_APIS_BY_PRODUCT_ID:
      return {
        ...state,
        isLoading: true,
      };

    case SubscribedApiActions.GET_ALL_SUBSCRIBED_APIS_BY_PRODUCT_ID_SUCCESS:
      return {
        ...state,
        subscribedApis: action.payload,
        isLoading: false,
      };

    // Create Subscribed Api
    case SubscribedApiActions.CREATE_SUBSCRIBED_API:
      return {
        ...state,
        isCreating: true,
      };

    case SubscribedApiActions.CREATE_SUBSCRIBED_API_SUCCESS:
      const newSubscribedApi = action.payload;
      let updatedSubscribedApis = state.subscribedApis;

      if (updatedSubscribedApis) {
        updatedSubscribedApis = [...updatedSubscribedApis, newSubscribedApi];
      }

      return {
        ...state,
        subscribedApis: updatedSubscribedApis,
        isCreating: false,
        createSuccess: true,
      };

    // Delete Subscribed Api
    case SubscribedApiActions.DELETE_SUBSCRIBED_API:
      return {
        ...state,
        isDeleting: true,
      };

    case SubscribedApiActions.DELETE_SUBSCRIBED_API_SUCCESS:
      const deletedId = action.payload.id;
      let filteredSubscribedApis = state.subscribedApis;

      if (filteredSubscribedApis) {
        filteredSubscribedApis = filteredSubscribedApis.filter(item => item.id !== deletedId);
      }

      return {
        ...state,
        subscribedApis: filteredSubscribedApis,
        isDeleting: false,
        deleteSuccess: true,
      };

    case SubscribedApiActions.RESET_CREATE_SUCCESS:
      return {
        ...state,
        createSuccess: false,
        isCreating: false,
      };
      
    case SubscribedApiActions.RESET_DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: false,
        isDeleting: false,
      };

    default:
      return state;
  }
}
