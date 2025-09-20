import { RESET_ERROR, SET_ERROR } from './error.action';

export const ERROR_STATE_NAME = 'error';

export interface ErrorState {
  error: any | undefined;
  source: string | undefined;
  componentRoute: string | undefined;
}

const initialState: ErrorState = {
  error: undefined,
  source: undefined,
  componentRoute: undefined,
};

export function errorReducer(state: ErrorState = initialState, action: any) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_ERROR:
      return initialState;
    default:
      return state;
  }
}
