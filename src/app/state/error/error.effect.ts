import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { ResetError, SET_ERROR } from './error.action';
import { AppState } from 'src/app/store/app.state';

@Injectable({ providedIn: 'root' })
export class ErrorEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>
  ) {}

  navigateToErrorPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SET_ERROR),
        tap(() => {
          console.log('navigateToErrorPage$');
          this.router.navigate(['/generic-error']);
        })
      ),
    { dispatch: false }
  );
}
