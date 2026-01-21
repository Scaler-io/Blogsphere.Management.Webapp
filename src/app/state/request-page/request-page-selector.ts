import { createFeatureSelector, createSelector } from '@ngrx/store';
import { REQUEST_PAGE_STATE_NAME, RequestPageState } from './request-page.reducer';

const requestPageState = createFeatureSelector<RequestPageState>(REQUEST_PAGE_STATE_NAME);

export const selectRequestPageState = createSelector(requestPageState, state => state);
