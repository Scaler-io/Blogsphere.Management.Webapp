import type { LoginResponse } from 'angular-auth-oidc-client';

/**
 * Shape of userData from OIDC/IdentityServer (matches API response).
 * Use TypedLoginResponse when you need typed userData instead of `any`.
 */
export interface OidcUserData {
  name: string;
  email: string;
  role: string;
  permissions: string | string[];
  employee_id?: string;
  employeeId?: string;
  employee_Id?: string;
  department: string;
}

export type TypedLoginResponse = Omit<LoginResponse, 'userData'> & {
  userData: OidcUserData | null;
};
