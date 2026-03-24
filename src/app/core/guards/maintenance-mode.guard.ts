import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceModeGuard  {
  constructor(private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!environment.maintenanceMode) {
      return true;
    }
    // When maintenance mode is on, only allow access to /maintenance
    if (state.url.includes('/maintenance')) {
      return true;
    }
    return this.router.createUrlTree(['/maintenance']);
  }
}
