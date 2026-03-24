import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { LoginResponse } from 'angular-auth-oidc-client';
import { AuthService } from './auth.service';
import { AppState } from '../../store/app.state';
import { SetAuthState } from '../../state/auth/auth.action';
import { environment } from '../../../environments/environment';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthManagerService {
  private authInitialized = false;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private snackBar: SnackbarService
  ) {}

  /**
   * Initialize authentication for the application
   */
  public initializeAuthentication(): Observable<boolean> {
    // Skip authentication when maintenance mode is on
    if (environment.maintenanceMode) {
      return of(true);
    }

    // Prevent multiple initialization attempts
    if (this.authInitialized) {
      return of(true);
    }
    this.authInitialized = true;

    return new Observable(observer => {
      this.authService.checkAuth().subscribe({
        next: res => {
          if (res.isAuthenticated) {
            // User is already authenticated
            this.handleSuccessfulAuth(res);
            observer.next(true);
            observer.complete();
          } else {
            // Try refresh token if available
            this.handleUnauthenticatedUser(observer);
          }
        },
        error: _ => {
          this.handleAuthError(observer);
        },
      });
    });
  }

  private handleSuccessfulAuth(authResult: any): void {
    this.authService.checkIdServerSession().subscribe({
      next: hasSession => {
        if (!hasSession) {
          this.forceLogoutDueToMissingSession();
          return;
        }
        this.store.dispatch(new SetAuthState(authResult));
        if (this.redirectToPasswordResetIfPending()) {
          return;
        }
        this.showAccountManageSuccessIfApplicable();
        this.cleanUrlAfterAuth();
      },
      error: _ => {
        this.forceLogoutDueToMissingSession();
      },
    });
  }

  private redirectToPasswordResetIfPending(): boolean {
    if (sessionStorage.getItem('pendingPasswordResetRedirect') === 'true') {
      sessionStorage.removeItem('pendingPasswordResetRedirect');
      window.location.href = this.authService.getPasswordResetUrl();
      return true;
    }
    return false;
  }

  private showAccountManageSuccessIfApplicable(): void {
    const twoFactorStatus = sessionStorage.getItem('twoFactorStatus');
    if (twoFactorStatus === 'enabled') {
      sessionStorage.removeItem('twoFactorStatus');
      this.snackBar.showSuccess('Two-factor authentication enabled');
    } else if (twoFactorStatus === 'disabled') {
      sessionStorage.removeItem('twoFactorStatus');
      this.snackBar.showSuccess('Two-factor authentication disabled');
    }

    if (sessionStorage.getItem('phoneVerified') === 'true') {
      sessionStorage.removeItem('phoneVerified');
      this.snackBar.showSuccess('Phone number verified');
    }

    if (sessionStorage.getItem('passwordResetSuccess') === 'true') {
      sessionStorage.removeItem('passwordResetSuccess');
      this.snackBar.showSuccess('Password reset successful');
    }
  }

  private handleUnauthenticatedUser(observer: any): void {
    if (this.authService.hasValidRefreshToken()) {
      this.authService.refreshToken().subscribe({
        next: refreshResult => {
          if (refreshResult.isAuthenticated) {
            this.handleSuccessfulAuth(refreshResult);
            observer.next(true);
            observer.complete();
          } else {
            this.authService.login();
            observer.next(false);
            observer.complete();
          }
        },
        error: _ => {
          this.authService.login();
          observer.next(false);
          observer.complete();
        },
      });
    } else {
      this.authService.login();
      observer.next(false);
      observer.complete();
    }
  }

  private handleAuthError(observer: any): void {
    // Only login if we don't have any tokens
    if (!this.authService.hasValidRefreshToken()) {
      this.authService.login();
    }
    observer.next(false);
    observer.complete();
  }

  private cleanUrlAfterAuth(): void {
    // Clean up URL parameters after successful authentication
    if (window.location.search.includes('code=') || window.location.search.includes('state=')) {
      const url = new URL(window.location.href);
      url.search = ''; // Remove all query parameters
      window.history.replaceState({}, document.title, url.toString());
    }
  }

  private forceLogoutDueToMissingSession(): void {
    this.store.dispatch(
      new SetAuthState({
        isAuthenticated: false,
        accessToken: '',
        idToken: '',
        userData: null,
        errorMessage: 'IdServer session missing',
      } as LoginResponse)
    );
    this.authService.login();
  }

  /**
   * Clean up authentication manager
   */
  public cleanup(): void {
    // Cleanup logic if needed in the future
  }
}
