import { Injectable } from '@angular/core';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';
import { Observable, map, catchError, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  /**
   * Initialize authentication check
   */
  public checkAuth(): Observable<LoginResponse> {
    return this.oidcSecurityService.checkAuth().pipe(
      catchError(error => {
        return of({
          isAuthenticated: false,
          errorMessage: 'Authentication check failed',
          accessToken: '',
          idToken: '',
          userData: null,
        } as LoginResponse);
      })
    );
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
   * Check if user is authenticated (observable)
   */
  public isAuthenticated(): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map(result => result.isAuthenticated),
      catchError(() => of(false))
    );
  }

  /**
   * Get the current access token
   */
  public getAccessToken(): string {
    return this.oidcSecurityService.getAccessToken();
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
  public refreshToken(): Observable<LoginResponse> {
    return this.oidcSecurityService.forceRefreshSession().pipe(
      catchError(error => {
        return of({
          isAuthenticated: false,
          errorMessage: 'Token refresh failed',
          accessToken: '',
          idToken: '',
          userData: null,
        } as LoginResponse);
      })
    );
  }

  /**
   * Check if we have a valid refresh token stored
   */
  public hasValidRefreshToken(): boolean {
    try {
      const refreshToken =
        localStorage.getItem('angular-auth-oidc-client_refresh_token') ||
        sessionStorage.getItem('angular-auth-oidc-client_refresh_token');
      return !!refreshToken;
    } catch (error) {
      return false;
    }
  }

  public isSuperAdmin(): Observable<boolean> {
    if (!this.isAuthenticated()) {
      return of(false);
    } else {
      return this.getUserData().pipe(
        map(res => {
          return res.userData.role === 'SuperAdmin';
        })
      );
    }
  }

  public isAdmin(): Observable<boolean> {
    if (!this.isAuthenticated()) {
      return of(false);
    } else {
      return this.getUserData().pipe(map(res => res.role === 'Admin'));
    }
  }
}
