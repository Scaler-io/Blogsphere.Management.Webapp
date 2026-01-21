import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectRequestPageState } from 'src/app/state/request-page/request-page-selector';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class CanActivateSuccessPageGuard implements CanActivate {
  public requestPageState$ = this.store.select(selectRequestPageState);
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.requestPageState$.pipe(
      map(state => {
        if (state && state.requestPage) {
          return true;
        }
        return this.router.createUrlTree(['/dashboard']);
      })
    );
  }
}
