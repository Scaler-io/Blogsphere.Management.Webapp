import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly identityBaseUrl = environment.oidc.authority;
  private readonly oidcClientId = environment.oidc.clientId;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private http: HttpClient
  ) {}

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
   * Redirect to authenticated IdentityServer password reset page.
   * Goes through OIDC authorize flow first to ensure Identity Server session exists,
   * then redirects to the password reset page to avoid an extra login prompt.
   */
  public redirectToPasswordReset(): void {
    sessionStorage.setItem('pendingPasswordResetRedirect', 'true');
    this.oidcSecurityService.authorize();
  }

  /**
   * Build the Identity Server password reset page URL (used after authorize flow establishes session).
   */
  public getPasswordResetUrl(): string {
    const resetUrl = new URL('/Account/SelfResetPassword/Index', this.identityBaseUrl);
    resetUrl.searchParams.set('returnUrl', `${window.location.origin}/user-profile`);
    resetUrl.searchParams.set('clientId', this.oidcClientId);
    return resetUrl.toString();
  }

  /**
   * Build the Identity Server account management page URL.
   */
  public getIdentityAccountUrl(): string {
    const accountUrl = new URL('/Account/Manage/Index', this.identityBaseUrl);
    accountUrl.searchParams.set('returnUrl', `${window.location.origin}/user-profile`);
    accountUrl.searchParams.set('clientId', this.oidcClientId);
    return accountUrl.toString();
  }

  /**
   * Check if IdServer cookie session is present.
   */
  public checkIdServerSession(): Observable<boolean> {
    const checkUrl = new URL('/account/session/check', this.identityBaseUrl);
    return this.http
      .get(checkUrl.toString(), { withCredentials: true, observe: 'response' })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
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
  public getAccessToken(): Observable<string> {
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
