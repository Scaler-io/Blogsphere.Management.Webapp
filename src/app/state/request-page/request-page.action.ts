import { Action } from '@ngrx/store';
import { RequestPageState } from './request-page.reducer';

export const REQUEST_PAGE_SET = 'REQUEST_PAGE_SET';
export const REQUEST_PAGE_CLEAR = 'REQUEST_PAGE_CLEAR';

export class RequestPageSet implements Action {
  readonly type: string = REQUEST_PAGE_SET;
  constructor(public payload: RequestPageState) {}
}

export class RequestPageClear implements Action {
  readonly type: string = REQUEST_PAGE_CLEAR;
  constructor(public payload = undefined) {}
}

export type RequestPageActions = RequestPageSet | RequestPageClear;
