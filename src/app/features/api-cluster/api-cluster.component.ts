import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { GetAllApiClusters } from 'src/app/state/api-cluster/api-custer.action';
import { ApiClusterSearchRequest, ApiClusterSummary } from 'src/app/core/model/api-cluster.model';
import * as ApiClusterActions from 'src/app/state/api-cluster/api-custer.action';
import { debounceTime, Observable, Subject, takeUntil, tap } from 'rxjs';
import {
  selectApiClusters,
  selectApiClustersLoading,
  selectApiClustersPageMetadata,
  selectTotalApiClusters,
  selectApiClusterCountLoading,
} from 'src/app/state/api-cluster/api-cluster.selector';
import { MatTableDataSource } from '@angular/material/table';
import { selectMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';
import { TableColumnMap } from 'src/app/core/model/table-source';
import { PageEvent } from '@angular/material/paginator';
import { SearchLayoutService } from 'src/app/shared/components/search-layout/search-layout.service';
import { Router } from '@angular/router';
import { IconType } from 'src/app/core/model/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiClusterFormGroupHelper } from 'src/app/core/form-groups/api-cluster-form-group';

@Component({
  selector: 'blogsphere-api-cluster',
  templateUrl: './api-cluster.component.html',
  styleUrls: ['./api-cluster.component.scss'],
  animations: [fadeSlideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiClusterComponent implements OnInit, OnDestroy {
  public apiClusters$ = this.store.select(selectApiClusters);
  public apiClustersPageMetadata$ = this.store.select(selectApiClustersPageMetadata);
  public totalApiClusters$ = this.store.select(selectTotalApiClusters);
  public isApiClustersLoading$ = this.store.select(selectApiClustersLoading);
  public isApiClusterCountLoading$ = this.store.select(selectApiClusterCountLoading);
  public apiCusterDataSource = new MatTableDataSource<ApiClusterSummary>([]);
  public showEmptyStateButton: boolean;
  public displayedColumns: string[] = [
    'clusterName',
    'loadBalancerName',
    'status',
    'routes',
    'destinations',
  ];
  public columnNameMap: TableColumnMap = {
    clusterName: {
      value: 'clusterId',
      isDateField: false,
      isStatusField: false,
      isLinkField: true,
    },
    loadBalancerName: { value: 'loadBalancerName', isDateField: false, isStatusField: false },
    status: { value: 'status', isDateField: false, isStatusField: true },
    routes: { value: 'routeCount', isDateField: false, isStatusField: false },
    destinations: { value: 'destinationCount', isDateField: false, isStatusField: false },
  };
  public isMobileView$ = this.store.select(selectMobileViewState);
  public isFilterApplied: boolean;
  public isSearchApplied: boolean;
  public searchTerm: string;
  public clusterFilterForm: FormGroup = ApiClusterFormGroupHelper.createApiClusterFilterFormGroup(
    this.fb
  );
  private currentSortField: string;
  private filters: { [key: string]: string } = null;
  private formDate: string = null;
  private toDate: string = null;

  private destroy$ = new Subject<void>();

  IconType = IconType;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private searchLayoutService: SearchLayoutService,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchApiClusterCount();
    this.fetchApiCLusters(false, 10, 1);

    this.apiClusters$.pipe(takeUntil(this.destroy$)).subscribe(summary => {
      if (summary) {
        this.useChangeDetection(() => (this.apiCusterDataSource.data = summary));
      }
    });

    this.addApiCluster();
    this.performSearch();
    this.changeSortMenu();
    this.applyFilter();
    this.resetFilter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onPageChange(event: PageEvent): void {
    console.log(event);
  }

  public get allowEditOption$(): Observable<boolean> {
    return this.auth.isSuperAdmin() || this.auth.isAdmin();
  }

  public onEdit(event: ApiClusterSummary): void {
    this.router.navigate(['api-cluster', 'cluster-setup', event.id]);
  }

  public onView(event: ApiClusterSummary): void {
    this.router.navigate(['api-cluster', 'details', event.id]);
  }

  public onLinkClick(event: ApiClusterSummary): void {
    this.router.navigate(['api-cluster', 'details', event.id]);
  }

  private fetchApiCLusters(
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
    const searchRequest: ApiClusterSearchRequest = {
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
      this.store.dispatch(new GetAllApiClusters(searchRequest));
    });
  }

  private fetchApiClusterCount(
    filters: { [key: string]: string } = null,
    matchPhrase: string = '',
    matchPhraseField: string = '',
    startTime: string = null,
    endTime: string = null,
    timeField: string = 'createdAt'
  ): void {
    if (filters === null && matchPhrase === '' && matchPhraseField === '') {
      this.noChangeDetection(() => this.store.dispatch(new ApiClusterActions.GetApiClusterCount()));
    } else {
      this.noChangeDetection(() =>
        this.store.dispatch(
          new ApiClusterActions.GetApiClusterCount({
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

  private performSearch() {
    this.searchLayoutService.searchInput$.pipe(takeUntil(this.destroy$)).subscribe(term => {
      term.valueChanges
        .pipe(
          takeUntil(this.destroy$),
          debounceTime(500),
          tap(text => {
            this.searchTerm = text;
            this.isSearchApplied =
              text.length > 3 || (text.length > 0 && text.length <= 3) ? true : false;
          })
        )
        .subscribe((text: string) => {
          if (text.length === 0) {
            this.noChangeDetection(() => {
              if (!this.isFilterApplied) {
                this.fetchApiClusterCount();
                this.fetchApiCLusters(false, 10, 1, 'clusterId', text, this.currentSortField);
              } else {
                this.fetchApiClusterCount(
                  this.filters,
                  text,
                  'clusterId',
                  this.formDate,
                  this.toDate
                );
                this.fetchApiCLusters(
                  true,
                  10,
                  1,
                  'clusterId',
                  text,
                  this.currentSortField,
                  'desc',
                  this.filters,
                  'createdAt',
                  this.formDate,
                  this.toDate
                );
              }
            });
          }
          if (text.length > 3) {
            this.noChangeDetection(() => {
              if (!this.isFilterApplied) {
                this.fetchApiClusterCount(null, text, 'clusterId');
                this.fetchApiCLusters(true, 10, 1, 'clusterId', text, this.currentSortField);
              } else {
                this.fetchApiClusterCount(this.filters, text, 'clusterId');
                this.fetchApiCLusters(
                  true,
                  10,
                  1,
                  'clusterId',
                  text,
                  this.currentSortField,
                  'desc',
                  this.filters,
                  'createdAt',
                  this.formDate,
                  this.toDate
                );
              }
            });
          }
        });
    });
  }

  private addApiCluster(): void {
    this.searchLayoutService.addNewAction$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigate(['api-cluster', 'cluster-setup']);
    });
  }

  private changeSortMenu(): void {
    this.searchLayoutService.sortChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe((sortField: string) => {
        this.currentSortField = sortField;
        this.noChangeDetection(() => {
          if (!this.isFilterApplied) {
            console.log('no filter applied');
            this.fetchApiCLusters(
              !!this.searchTerm,
              10,
              1,
              'clusterId',
              this.searchTerm,
              sortField
            );
          } else {
            console.log('filter applied');
            this.fetchApiCLusters(
              true,
              10,
              1,
              'clusterId',
              this.searchTerm,
              sortField,
              'desc',
              this.filters,
              'createdAt',
              this.formDate,
              this.toDate
            );
          }
        });
      });
  }

  private applyFilter(): void {
    this.searchLayoutService.filter$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isFilterApplied = true;
      this.formDate = this.clusterFilterForm.value.fromDate?.toISOString();
      this.toDate = this.clusterFilterForm.value.toDate?.toISOString();
      this.filters = this.clusterFilterForm.getRawValue();
      delete this.filters.fromDate;
      delete this.filters.toDate;
      console.log(this.filters);
      this.noChangeDetection(() => {
        this.fetchApiCLusters(
          true,
          10,
          1,
          'clusterId',
          this.searchTerm,
          this.currentSortField,
          'desc',
          this.filters,
          'createdAt',
          this.formDate,
          this.toDate
        );
        this.fetchApiClusterCount(
          this.filters,
          this.searchTerm,
          'clusterId',
          this.formDate,
          this.toDate,
          'createdAt'
        );
      });
    });
  }

  private resetFilter(): void {
    this.searchLayoutService.filterClear$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.clusterFilterForm.reset();
      this.isFilterApplied = false;
      this.formDate = null;
      this.toDate = null;
      this.filters = null;

      this.noChangeDetection(() => {
        this.fetchApiCLusters(
          !!this.searchTerm,
          10,
          1,
          'clusterId',
          this.searchTerm,
          this.currentSortField
        );
        this.fetchApiClusterCount(null, this.searchTerm, 'clusterId');
      });
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
