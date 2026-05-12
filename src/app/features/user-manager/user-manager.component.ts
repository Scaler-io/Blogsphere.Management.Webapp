import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { AppPermission } from 'src/app/core/auth/permissions.constants';
import { selectHasAllPermissions } from 'src/app/state/auth/auth.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'blogsphere-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.scss',
  standalone: false,
})
export class UserManagerComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  public isUserDetailsRoute = false;

  public canWriteUsers$: Observable<boolean> = this.store.select(selectHasAllPermissions([AppPermission.USER_CREATE, AppPermission.USER_UPDATE]));

  ngOnInit(): void {
    this.isUserDetailsRoute = this.router.url.includes('/details/');
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isUserDetailsRoute = this.router.url.includes('/details/');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
