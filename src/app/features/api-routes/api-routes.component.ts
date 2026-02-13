import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ApiRouteSearchRequest, ApiRouteSummary } from 'src/app/core/model/api-route.model';
import { SearchLayoutService } from 'src/app/shared/components/search-layout/search-layout.service';
import {
  selectApiRouteCountLoading,
  selectApiRoutes,
  selectApiRoutesLoading,
  selectApiRoutesPageMetadata,
  selectTotalApiRoutes,
} from 'src/app/state/api-route/api-route.selector';
import { AppState } from 'src/app/store/app.state';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnMap } from 'src/app/core/model/table-source';
import { selectMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';
import { debounceTime, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { IconType } from 'src/app/core/model/core';
import * as ApiRouteActions from 'src/app/state/api-route/api-route.action';
import { PageEvent } from '@angular/material/paginator';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';

@Component({
  selector: 'blogsphere-api-routes',
  templateUrl: './api-routes.component.html',
  styleUrls: ['./api-routes.component.scss'],
  animations: [fadeSlideInOut],
})
export class ApiRoutesComponent implements OnInit, OnDestroy {
  public apiRoutes$ = this.store.select(selectApiRoutes);
  public apiRoutesPageMetadata$ = this.store.select(selectApiRoutesPageMetadata);
  public totalApiRoutes$ = this.store.select(selectTotalApiRoutes);
  public isApiRoutesLoading$ = this.store.select(selectApiRoutesLoading);
  public isApiRouteCountLoading$ = this.store.select(selectApiRouteCountLoading);
  public apiRouteDataSource = new MatTableDataSource<ApiRouteSummary>([]);
  public showEmptyStateButton: boolean;
  public displayedColumns: string[] = ['routeName', 'path', 'rateLimitterPolicy', 'status'];

  public columnNameMap: TableColumnMap = {
    routeName: { value: 'routeId', isDateField: false, isStatusField: false },
    path: { value: 'path', isDateField: false, isStatusField: false },
    rateLimitterPolicy: { value: 'rateLimitterPolicy', isDateField: false, isStatusField: false },
    status: { value: 'status', isDateField: false, isStatusField: true },
  };

  public isMobileView$ = this.store.select(selectMobileViewState);
  public isFilterApplied: boolean;
  public isSearchApplied: boolean;
  public searchTerm: string;
  // public routeFilterForm: FormGroup = ApiRouteFormGroupHelper.createApiRouteFilterFormGroup(
  //   this.fb
  // );
  private currentSortField: string;
  private filters: { [key: string]: string } = null;
  private formDate: string = null;
  private toDate: string = null;

  private destroy$ = new Subject<void>();

  IconType = IconType;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private store: Store<AppState>,
    private searchLayoutService: SearchLayoutService,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchApiRouteCount();
    this.fetchApiRoutes(false, 10, 1);

    this.apiRoutes$
      .pipe(
        takeUntil(this.destroy$),
        map(apiRoutes =>
          apiRoutes.map(route => ({
            ...route,
            routeId: new CapitalizePipe().transform(route.routeId),
          }))
        )
      )
      .subscribe(summary => {
        if (summary) {
          this.useChangeDetection(() => (this.apiRouteDataSource.data = summary));
        }
      });

    this.addApiRoute();
    this.performSearch();
    this.changeSortMenu();
    // this.applyFilter();
    // this.resetFilter();
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

  public onEdit(event: ApiRouteSummary): void {
    this.router.navigate(['api-route', 'route-setup', event.id]);
  }

  public onView(event: ApiRouteSummary): void {
    this.router.navigate(['api-route', 'details', event.id]);
  }

  private fetchApiRoutes(
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
    const searchRequest: ApiRouteSearchRequest = {
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
      this.store.dispatch(new ApiRouteActions.GetAllApiRoutes(searchRequest));
    });
  }

  private fetchApiRouteCount(
    filters: { [key: string]: string } = null,
    matchPhrase: string = '',
    matchPhraseField: string = '',
    startTime: string = null,
    endTime: string = null,
    timeField: string = 'createdAt'
  ): void {
    if (filters === null && matchPhrase === '' && matchPhraseField === '') {
      this.noChangeDetection(() => this.store.dispatch(new ApiRouteActions.GetApiRouteCount()));
    } else {
      this.noChangeDetection(() =>
        this.store.dispatch(
          new ApiRouteActions.GetApiRouteCount({
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
                this.fetchApiRouteCount();
                this.fetchApiRoutes(false, 10, 1, 'routeId', text, this.currentSortField);
              } else {
                this.fetchApiRouteCount(this.filters, text, 'routeId', this.formDate, this.toDate);
                this.fetchApiRoutes(
                  true,
                  10,
                  1,
                  'routeId',
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
                this.fetchApiRouteCount(null, text, 'routeId');
                this.fetchApiRoutes(true, 10, 1, 'routeId', text, this.currentSortField);
              } else {
                this.fetchApiRouteCount(this.filters, text, 'routeId', this.formDate, this.toDate);
                this.fetchApiRoutes(
                  true,
                  10,
                  1,
                  'routeId',
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

  private addApiRoute(): void {
    this.searchLayoutService.addNewAction$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigate(['api-route', 'route-setup']);
    });
  }

  private changeSortMenu(): void {
    this.searchLayoutService.sortChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe((sortField: string) => {
        this.currentSortField = sortField;
        this.noChangeDetection(() => {
          if (!this.isFilterApplied) {
            this.fetchApiRoutes(!!this.searchTerm, 10, 1, 'routeId', this.searchTerm, sortField);
          } else {
            this.fetchApiRoutes(
              true,
              10,
              1,
              'routeId',
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

  // private applyFilter(): void {
  //   this.searchLayoutService.filter$.pipe(takeUntil(this.destroy$)).subscribe(() => {
  //     this.isFilterApplied = true;
  //     this.formDate = this.routeFilterForm.value.fromDate?.toISOString();
  //     this.toDate = this.routeFilterForm.value.toDate?.toISOString();
  //     this.filters = this.routeFilterForm.getRawValue();
  //     delete this.filters.fromDate;
  //     delete this.filters.toDate;
  //     this.noChangeDetection(() => {
  //       this.fetchApiRoutes(true, 10, 1, 'routeId', this.searchTerm, this.currentSortField, 'desc', this.filters, 'createdAt', this.formDate, this.toDate);
  //       this.fetchApiRouteCount(this.filters, this.searchTerm, 'routeId', this.formDate, this.toDate, 'createdAt');
  //     });
  //   });
  // }

  // private resetFilter(): void {
  //   this.searchLayoutService.filterClear$.pipe(takeUntil(this.destroy$)).subscribe(() => {
  //     this.routeFilterForm.reset();
  //     this.isFilterApplied = false;
  //     this.formDate = null;
  //     this.toDate = null;
  //     this.filters = null;
  //     this.noChangeDetection(() => {
  //       this.fetchApiRoutes(!!this.searchTerm, 10, 1, 'routeId', this.searchTerm, this.currentSortField);
  //       this.fetchApiRouteCount(null, this.searchTerm, 'routeId');
  //     });
  //   });
  // }

  private noChangeDetection(fn: Function): void {
    this.zone.runOutsideAngular(() => fn());
  }

  private useChangeDetection(fn: Function): void {
    this.zone.run(() => {
      fn();
      this.cdr.markForCheck();
    });
  }
}
