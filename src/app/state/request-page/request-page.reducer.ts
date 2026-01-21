import * as RequestPageActions from './request-page.action';

export const REQUEST_PAGE_STATE_NAME = 'requestPage';

export interface RequestPageState {
  requestPage: string;
  heading: string;
  subHeading: string;
  previousUrl?: string;
  nextUrl: string;
  nextButtonLabel: string;
}

const initialState: RequestPageState = {
  requestPage: '',
  heading: '',
  subHeading: '',
  nextUrl: '',
  nextButtonLabel: '',
};

export function requestPageReducer(
  state: RequestPageState = initialState,
  action: RequestPageActions.RequestPageActions
): RequestPageState {
  switch (action.type) {
    case RequestPageActions.REQUEST_PAGE_SET:
      return {
        ...state,
        ...action.payload,
      };
    case RequestPageActions.REQUEST_PAGE_CLEAR:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
