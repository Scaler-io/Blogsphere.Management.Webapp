import { AuthUser } from 'src/app/core/model/auth';
import { AuthActions, SET_AUTH_STATE } from './auth.action';

export const AUTH_STATE_NAME = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const parseJson = (item) => {
  return JSON.parse(item);
};

export function authReducer(state: AuthState = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTH_STATE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: <AuthUser>{
          name: action.payload.userData.name,
          email: action.payload.userData.email,
          role: action.payload.userData.role,
          permissions: parseJson(action.payload.userData.permissions),
          employeeId: action.payload.userData.employee_Id,
          department: action.payload.userData.department,
        },
      };
    default:
      return state;
  }
}
