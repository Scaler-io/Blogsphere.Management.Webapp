import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, merge, Observable, of, switchMap } from 'rxjs';
import * as UserManagerActions from './user-manager.action';
import * as ErrorActions from '../error/error.action';
import { Action } from '@ngrx/store';
import {
  IUserManagerService,
  USER_MANAGER_SERVICE_TOKEN,
} from 'src/app/core/services/interface/user-manager-service.interface';

@Injectable()
export class UserManagerEffects {
  constructor(
    @Inject(USER_MANAGER_SERVICE_TOKEN) private readonly userManagerService: IUserManagerService,
    private actions$: Actions
  ) {}

  getManagementUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserManagerActions.GET_MANAGEMENT_USERS),
      switchMap((action: UserManagerActions.GetManagementUsers) =>
        this.userManagerService.getManagementUsers(action.payload).pipe(
          map(paginated => new UserManagerActions.GetManagementUsersSuccess(paginated)),
          catchError(error => this.handleError(error, 'ManagementUser', 'management-user'))
        )
      )
    )
  );

  getManagementUserCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserManagerActions.GET_MANAGEMENT_USER_COUNT),
      switchMap((action: UserManagerActions.GetManagementUserCount) =>
        this.userManagerService.getManagementUserCount(action.payload).pipe(
          map(count => new UserManagerActions.GetManagementUserCountSuccess(count)),
          catchError(error => this.handleError(error, 'ManagementUser', 'management-user'))
        )
      )
    )
  );

  getManagementUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserManagerActions.GET_MANAGEMENT_USER),
      switchMap((action: UserManagerActions.GetManagementUser) =>
        this.userManagerService.getManagementUser(action.payload.id).pipe(
          map(managementUser => new UserManagerActions.GetManagementUserSuccess(managementUser)),
          catchError(error => this.handleError(error, 'ManagementUser', 'management-user/details/' + action.payload.id))
        )
      )
    )
  );

  private handleError(error: any, source?: string, route?: string): Observable<Action> {
    const errorState = {
      error: error,
      source: source || 'App User',
      componentRoute: !route ? '/user-manager' : `/user-manager/${route}`,
    };
    return merge(
      of(new ErrorActions.SetError(errorState)),
      of(new UserManagerActions.GetManagementUsersFailed()),
      of(new UserManagerActions.GetManagementUserCountFailed()),
      of(new UserManagerActions.GetManagementUserFailed())
    );
  }
}
