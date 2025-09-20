import { Injectable } from '@angular/core';
import {
  OidcConfigService,
  OidcSecurityService,
  LoginResponse,
} from 'angular-auth-oidc-client';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private oidcConfigService: OidcConfigService,
    private oidcSecurityService: OidcSecurityService
  ) {
    // Configuration is now handled in app.module.ts
  }

  /**
   * Initialize authentication and trigger login if not authenticated
   */
  public initAuth(): Observable<LoginResponse> {
    return this.oidcSecurityService.checkAuth();
  }

  /**
   * Trigger authorization request (login)
   */
  public login(): void {
    this.oidcSecurityService.authorize();
  }

  /**
   * Logout the user
   */
  public logout(): void {
    this.oidcSecurityService.logoff();
  }

  /**
   * Check if user is authenticated (returns AuthenticatedResult observable)
   */
  public isAuthenticated(): Observable<any> {
    return this.oidcSecurityService.isAuthenticated$;
  }

  /**
   * Get the current access token (synchronous)
   */
  public getAccessToken(): string {
    return this.oidcSecurityService.getAccessToken();
  }

  /**
   * Get the current ID token (synchronous)
   */
  public getIdToken(): string {
    return this.oidcSecurityService.getIdToken();
  }

  /**
   * Get user data from the token
   */
  public getUserData(): Observable<any> {
    return this.oidcSecurityService.userData$;
  }

  /**
   * Refresh the access token
   */
  public refreshToken(): Observable<any> {
    return this.oidcSecurityService.forceRefreshSession();
  }

  /**
   * Check if the current token is expired
   */
  public isTokenExpired(): boolean {
    // Get token expiration from the service
    const token = this.oidcSecurityService.getAccessToken();
    if (!token) return true;

    // You can implement more sophisticated token expiry check here
    // For now, rely on the service's internal checks
    return false;
  }

  /**
   * Get authentication result including server check
   */
  public getAuthenticationResult(): Observable<LoginResponse> {
    return this.oidcSecurityService.checkAuthIncludingServer();
  }

  /**
   * Manually trigger authentication check
   */
  public checkAuth(): Observable<LoginResponse> {
    return this.oidcSecurityService.checkAuth();
  }

  /**
   * Get if authentication is authenticated (boolean helper)
   */
  public checkIsAuthenticated(): Observable<boolean> {
    return this.oidcSecurityService
      .checkAuth()
      .pipe(
        map((loginResponse: LoginResponse) => loginResponse.isAuthenticated)
      );
  }
}
