import { Subscription as SubscriptionModel } from 'src/app/core/model/subscription.model';
import * as SubscriptionActions from './subscription.action';

export const SUBSCRIPTION_STATE_NAME = 'subscription';

export interface SubscriptionState {
  subscriptions: SubscriptionModel[] | null;
  loading: boolean;
  creating: boolean;
  deleting: boolean;
  createSuccess: boolean;
  deleteSuccess: boolean;
}

export const initialSubscriptionState: SubscriptionState = {
  subscriptions: null,
  loading: false,
  creating: false,
  deleting: false,
  createSuccess: false,
  deleteSuccess: false,
};

export function subscriptionReducer(
  state = initialSubscriptionState,
  action: SubscriptionActions.SubscriptionActions
): SubscriptionState {
  switch (action.type) {
    // Get All Subscriptions
    case SubscriptionActions.GET_ALL_SUBSCRIPTIONS_BY_PRODUCT_ID:
      return {
        ...state,
        loading: true,
      };

    case SubscriptionActions.GET_ALL_SUBSCRIPTIONS_BY_PRODUCT_ID_SUCCESS:
      return {
        ...state,
        subscriptions: action.payload,
        loading: false,
      };

    // Create Subscription
    case SubscriptionActions.CREATE_SUBSCRIPTION:
      return {
        ...state,
        creating: true,
      };

    case SubscriptionActions.CREATE_SUBSCRIPTION_SUCCESS:
      const newSubscription = action.payload;
      let updatedSubscriptions = state.subscriptions;

      if (updatedSubscriptions) {
        updatedSubscriptions = [...updatedSubscriptions, newSubscription];
      }

      return {
        ...state,
        subscriptions: updatedSubscriptions,
        creating: false,
        createSuccess: true,
      };

    // Delete Subscription
    case SubscriptionActions.DELETE_SUBSCRIPTION:
      return {
        ...state,
        deleting: true,
      };

    case SubscriptionActions.DELETE_SUBSCRIPTION_SUCCESS:
      const deletedId = action.payload.id;
      let filteredSubscriptions = state.subscriptions;

      if (filteredSubscriptions) {
        filteredSubscriptions = filteredSubscriptions.filter(item => item.id !== deletedId);
      }

      return {
        ...state,
        subscriptions: filteredSubscriptions,
        deleting: false,
        deleteSuccess: true,
      };

    case SubscriptionActions.RESET_CREATE_SUCCESS:
      return {
        ...state,
        createSuccess: false,
      };

    case SubscriptionActions.RESET_DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: false,
      };

    default:
      return state;
  }
}
