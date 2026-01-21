import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MOBILE_VIEW_STATE_NAME, MobileViewState } from './mobile-view.reducer';

const mobileViewState = createFeatureSelector<MobileViewState>(MOBILE_VIEW_STATE_NAME);

export const selectMobileViewState = createSelector(mobileViewState, state => state.isMobileView);
