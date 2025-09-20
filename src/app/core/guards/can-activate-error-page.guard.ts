import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectError } from 'src/app/state/error/error.selector';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class CanActivateErrorPageGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectError).pipe(
      map((error) => {
        if (error) {
          return true; // Allow access to error page when there's an error
        }
        // Redirect to dashboard if no error (shouldn't access error page directly)
        return this.router.createUrlTree(['/dashboard']);
      })
    );
  }
}
