import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, switchMap, take, timer, map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectAuthUserPermissions } from 'src/app/state/auth/auth.selector';
import { AuthManagerService } from '../auth/auth-manager.service';
import { hasAllPermissions, hasAnyPermission, hasPermission, StoredPermissions } from '../auth/permissions';
import { PermissionRouteData } from './permission-route-data';
import { environment } from '../../../environments/environment';

function evaluateRoutePermission(
  permissions: StoredPermissions | undefined,
  data: PermissionRouteData
): boolean {
  if (data.requiredPermission) {
    return hasPermission(permissions, data.requiredPermission);
  }
  if (data.requiredPermissions?.length) {
    return data.permissionsMode === 'any'
      ? hasAnyPermission(permissions, data.requiredPermissions)
      : hasAllPermissions(permissions, data.requiredPermissions);
  }
  return false;
}

export const permissionsGuard: CanActivateFn = (route): Observable<boolean | UrlTree> => {
  const store = inject(Store<AppState>);
  const router = inject(Router);
  const authManager = inject(AuthManagerService);

  if (environment.maintenanceMode) {
    return of(true);
  }

  return authManager.initializeAuthentication().pipe(
    switchMap(initialized => {
      if (!initialized) {
        return of(false);
      }
      return timer(0).pipe(
        switchMap(() => store.select(selectAuthUserPermissions).pipe(take(1))),
        map(permissions => {
          const data = route.data as PermissionRouteData;
          const ok = evaluateRoutePermission(permissions, data);
          return ok ? true : router.createUrlTree(['/dashboard']);
        })
      );
    })
  );
};
