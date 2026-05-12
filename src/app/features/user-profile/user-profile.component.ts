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
    standalone: false
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
        role: this.normalizeRoleAndPermissions(resolvedUser).role,
        permissions: this.normalizeRoleAndPermissions(resolvedUser).permissions,
        isLoading: !isAuthenticated || !resolvedUser,
        initials: this.getInitials(resolvedUser?.fullName),
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

  private getInitials(name: string | undefined): string {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0]?.toUpperCase() ?? '?';
  }

  private normalizeRoleAndPermissions(user: AuthUser | null): { role: string; permissions: string[] } {
    const permissions = (user?.permissions ?? []) as string[] | string;
    const jsonRole = (user?.role !== 'Admin' && user?.role !== 'SuperAdmin') ? JSON.parse(user?.role) : user?.role;

    if (permissions === '*') {
      return { role: Array.isArray(jsonRole) ? jsonRole[0] : jsonRole ?? '', permissions: ['All permissions'] };
    }

    return { role: Array.isArray(jsonRole) ? jsonRole[0] : jsonRole ?? '', permissions: Array.isArray(permissions) ? permissions : [] };
  }
}
