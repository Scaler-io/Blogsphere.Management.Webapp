import { Action } from '@ngrx/store';

export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

export class SetError implements Action {
  readonly type = SET_ERROR;
  constructor(public payload: any) {}
}

export class ResetError implements Action {
  readonly type = RESET_ERROR;
}

export type ErrorActions = SetError | ResetError;
