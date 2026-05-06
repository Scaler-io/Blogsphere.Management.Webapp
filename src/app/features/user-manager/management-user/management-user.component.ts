import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';
import {
  selectManagementUsers,
  selectManagementUsersLoading,
  selectManagementUserCountLoading,
  selectManagementUserPageMetadata,
  selectTotalManagementUsers,
} from 'src/app/state/user-manager/user-manager.selector';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ManagementUserSearchRequest, ManagementUserSummary } from 'src/app/core/model/user-manager.model';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnMap } from 'src/app/core/model/table-source';
import { selectMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';
import * as ManagementUserActions from 'src/app/state/user-manager/user-manager.action';
import { AppPermission } from 'src/app/core/auth/permissions.constants';
import { selectHasAllPermissions } from 'src/app/state/auth/auth.selector';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'blogsphere-management-user',
  animations: [fadeSlideInOut],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './management-user.component.html',
  styleUrl: './management-user.component.scss',
})
export class ManagementUserComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public managementUsers$: Observable<ManagementUserSummary[]> = this.store.select(selectManagementUsers);
  public managementUsersPageMetadata$: Observable<any> = this.store.select(selectManagementUserPageMetadata);
  public totalManagementUsers$: Observable<number> = this.store.select(selectTotalManagementUsers);
  public isManagementUsersLoading$: Observable<boolean> = this.store.select(selectManagementUsersLoading);
  public isManagementUsersCountLoading$: Observable<boolean> = this.store.select(selectManagementUserCountLoading);
  public isMobileView$ = this.store.select(selectMobileViewState);
  public canWriteManagementUsers$: Observable<boolean> = this.store.select(
    selectHasAllPermissions([AppPermission.USER_CREATE, AppPermission.USER_UPDATE])
  );
  
  
  public managementUsersDataSource = new MatTableDataSource<ManagementUserSummary>([]);
  public showEmptyStateButton: boolean;
  public displayedColumns: string[] = ['employeeId', 'email', 'fullName', 'roles', 'department', 'status'];
  public columnNameMap: TableColumnMap = {
    employeeId: { value: 'employeeId', isLinkField: true },
    email: { value: 'email' },
    fullName: { value: 'fullName' },
    roles: { value: 'roles' },
    department: { value: 'department' },
    status: { value: 'status', isStatusField: true },
  };
  public isFilterApplied: boolean;
  public isSearchApplied: boolean;
  public searchTerm: string;
  // public clusterFilterForm: UntypedFormGroup = ApiClusterFormGroupHelper.createApiClusterFilterFormGroup(this.fb);

  private currentSortField: string;
  private filters: { [key: string]: string } = null;
  private formDate: string = null;
  private toDate: string = null;
  private destroy$ = new Subject<void>();
  

  ngOnInit(): void {
    this.fetchManagementUserCount();
    this.fetchManagementUsers(false, 10, 1);
    this.totalManagementUsers$.pipe(takeUntil(this.destroy$)).subscribe();
    this.managementUsers$.pipe(takeUntil(this.destroy$)).subscribe(summary => {
      if (summary) {
        this.useChangeDetection(() => (this.managementUsersDataSource.data = summary));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onLinkClick(event: any): void {
    this.router.navigate(['details', event.id], { relativeTo: this.route });
  }

  private fetchManagementUserCount(
    filters: { [key: string]: string } = null,
    matchPhrase: string = '',
    matchPhraseField: string = '',
    startTime: string = null,
    endTime: string = null,
    timeField: string = 'createdAt'
  ): void {
    if (filters === null && matchPhrase === '' && matchPhraseField === '') {
      this.noChangeDetection(() => this.store.dispatch(new ManagementUserActions.GetManagementUserCount()));
    } else {
      this.noChangeDetection(() =>
        this.store.dispatch(
          new ManagementUserActions.GetManagementUserCount({
            isFilteredQuery: true,
            matchPhrase: matchPhrase,
            matchPhraseField: matchPhraseField,
            filters: filters,
            sortField: 'createdAt',
            sortOrder: 'desc',
            startTime: startTime,
            endTime: endTime,
            timeField: timeField,
          })
        )
      );
    }
  }

  private fetchManagementUsers(
    isFilteredQuery: boolean,
    pageSize: number,
    pageIndex: number,
    matchPhraseField: string = undefined,
    matchPhrase: string = undefined,
    sortField: string = 'createdAt',
    sortOrder: string = 'desc',
    filters: { [key: string]: string } = null,
    timeField: string = 'createdAt',
    startTime: string = null,
    endTime: string = null
  ) {
    const searchRequest: ManagementUserSearchRequest = {
      isFilteredQuery,
      pageSize,
      pageIndex,
      matchPhraseField,
      matchPhrase,
      sortField,
      sortOrder,
      filters,
      timeField,
      startTime,
      endTime,
    };
    this.noChangeDetection(() => {
      this.store.dispatch(new ManagementUserActions.GetManagementUsers(searchRequest));
    });
  }

  private noChangeDetection(fn: Function): void {
    this.zone.runOutsideAngular(() => {
      fn();
    });
  }

  private useChangeDetection(fn: Function): void {
    this.zone.run(() => {
      fn();
      this.cdr.markForCheck();
    });
  }
}
