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

const parseJson = (item: string) => {
  return JSON.parse(item);
};

export function authReducer(state: AuthState = initialState, action: AuthActions) {
  const userData = action.payload?.userData;
  switch (action.type) {
    case SET_AUTH_STATE:
      if (!userData) {
        return {
          ...state,
          isAuthenticated: action.payload.isAuthenticated,
          user: null,
        };
      }
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: <AuthUser>{
          fullName: userData.given_name + ' ' + userData.family_name,
          email: userData.email,
          role: userData.role,
          permissions:
            userData.permissions === '*'
              ? '*'
              : typeof userData.permissions === 'string'
                ? parseJson(userData.permissions)
                : userData.permissions,
          employeeId:
            userData.employee_id ?? userData.employeeId ?? userData.employee_Id ?? '',
          department: userData.department,
        },
      };
    default:
      return state;
  }
}
