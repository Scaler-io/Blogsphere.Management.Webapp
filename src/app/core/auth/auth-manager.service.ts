import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { AppState } from '../../store/app.state';
import { SetAuthState } from '../../state/auth/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthManagerService {
  private authInitialized = false;

  constructor(private authService: AuthService, private store: Store<AppState>) {}

  /**
   * Initialize authentication for the application
   */
  public initializeAuthentication(): Observable<boolean> {
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
        error: error => {
          this.handleAuthError(observer);
        },
      });
    });
  }

  private handleSuccessfulAuth(authResult: any): void {
    this.store.dispatch(new SetAuthState(authResult));
    this.cleanUrlAfterAuth();
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
        error: error => {
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

  /**
   * Clean up authentication manager
   */
  public cleanup(): void {
    // Cleanup logic if needed in the future
  }
}
