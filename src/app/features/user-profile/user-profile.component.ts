import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { AuthUser } from 'src/app/core/model/auth';
import { getAuthState, getAuthStatus } from 'src/app/state/auth/auth.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'blogsphere-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  public profileViewModel$ = combineLatest({
    user: this.store.select(getAuthState),
    isAuthenticated: this.store.select(getAuthStatus),
  }).pipe(
    map(({ user, isAuthenticated }) => {
      const resolvedUser = isAuthenticated ? user : null;
      return {
        user: resolvedUser,
        permissions: this.normalizePermissions(resolvedUser),
        isLoading: !isAuthenticated || !resolvedUser,
        initials: this.getInitials(resolvedUser?.name),
      };
    })
  );

  constructor(private store: Store<AppState>, private authService: AuthService) {}

  public resetPassword(): void {
    this.authService.redirectToPasswordReset();
  }

  public redirectToIdentityServer(): void {
    window.location.assign(this.authService.getIdentityAccountUrl());
  }

  public getInitials(name: string | undefined): string {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0]?.toUpperCase() ?? '?';
  }

  private normalizePermissions(user: AuthUser | null): string[] {
    const permissions = (user?.permissions ?? []) as string[] | string;

    if (permissions === '*') {
      return ['All permissions'];
    }

    return Array.isArray(permissions) ? permissions : [];
  }
}
