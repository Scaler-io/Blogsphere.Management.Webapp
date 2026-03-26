import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import * as DashboardActions from 'src/app/state/dashboard/dashboard.action';
import {
  selectDashboardLoading,
  selectDashboardSummary,
} from 'src/app/state/dashboard/dashboard.selector';
import { selectAuthUserPermissions } from 'src/app/state/auth/auth.selector';
import { DashboardKind } from 'src/app/core/model/dashboard.model';
import {
  DashboardScopeOption,
  filterDashboardScopeOptionsByPermissions,
} from 'src/app/features/dashboard/dashboard-scope.options';

@Component({
  selector: 'blogsphere-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeSlideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public dashboardSummary$ = this.store.select(selectDashboardSummary);
  public dashboardLoading$ = this.store.select(selectDashboardLoading);

  public dashboardScopeOptions: DashboardScopeOption[] = [];
  public selectedScope: DashboardKind | null = null;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectAuthUserPermissions)
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (previous, current) => JSON.stringify(previous) === JSON.stringify(current)
        )
      )
      .subscribe((permissions) => {
        const options = filterDashboardScopeOptionsByPermissions(permissions);
        this.dashboardScopeOptions = options;

        if (options.length === 0) {
          this.selectedScope = null;
          this.store.dispatch(new DashboardActions.StopDashboardPolling());
          this.cdr.markForCheck();
          return;
        }

        const previousScope = this.selectedScope;
        const stillValid =
          !!previousScope && options.some((option) => option.id === previousScope);
        const nextScope: DashboardKind = stillValid ? previousScope : options[0].id;

        if (nextScope !== previousScope) {
          this.selectedScope = nextScope;
          this.store.dispatch(new DashboardActions.StopDashboardPolling());
          this.store.dispatch(new DashboardActions.StartDashboardPolling(nextScope));
        }

        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new DashboardActions.StopDashboardPolling());
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDashboardScopeChange(scope: DashboardKind): void {
    if (scope === this.selectedScope) {
      return;
    }
    this.selectedScope = scope;
    this.store.dispatch(new DashboardActions.StopDashboardPolling());
    this.store.dispatch(new DashboardActions.StartDashboardPolling(scope));
  }
}
