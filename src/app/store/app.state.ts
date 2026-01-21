import { API_CLUSTER_STATE_NAME, ApiClusterState } from '../state/api-cluster/api-cluster.reducer';
import { API_PRODUCT_STATE_NAME, ApiProductState } from '../state/api-product/api-product.reducer';
import { AUTH_STATE_NAME, authReducer, AuthState } from '../state/auth/auth.reducer';
import { ERROR_STATE_NAME, errorReducer, ErrorState } from '../state/error/error.reducer';
import {
  MOBILE_VIEW_STATE_NAME,
  mobileViewReducer,
  MobileViewState,
} from '../state/mobile-view/mobile-view.reducer';
import {
  REQUEST_PAGE_STATE_NAME,
  requestPageReducer,
  RequestPageState,
} from '../state/request-page/request-page.reducer';
import {
  SIDENAV_TOGGLE_STATE_NAME,
  sidenavToggleReducer,
  SidenavToggleState,
} from '../state/sidenav/sidenav.reducer';
import {
  SUBSCRIBED_API_STATE_NAME,
  SubscribedApiState,
} from '../state/subscribed-api/subscribed-api.reducer';
import {
  SUBSCRIPTION_STATE_NAME,
  SubscriptionState,
} from '../state/subscription/subscription.reducer';

export interface AppState {
  [MOBILE_VIEW_STATE_NAME]: MobileViewState;
  [SIDENAV_TOGGLE_STATE_NAME]: SidenavToggleState;
  [AUTH_STATE_NAME]: AuthState;
  [SUBSCRIBED_API_STATE_NAME]: SubscribedApiState;
  [SUBSCRIPTION_STATE_NAME]: SubscriptionState;
  [API_PRODUCT_STATE_NAME]: ApiProductState;
  [ERROR_STATE_NAME]: ErrorState;
  [API_CLUSTER_STATE_NAME]: ApiClusterState;
  [REQUEST_PAGE_STATE_NAME]: RequestPageState;
}

export const appReducer = {
  [MOBILE_VIEW_STATE_NAME]: mobileViewReducer,
  [SIDENAV_TOGGLE_STATE_NAME]: sidenavToggleReducer,
  [AUTH_STATE_NAME]: authReducer,
  [ERROR_STATE_NAME]: errorReducer,
  [REQUEST_PAGE_STATE_NAME]: requestPageReducer,
};
