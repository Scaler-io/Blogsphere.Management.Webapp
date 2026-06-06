import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';
import { ApiRouteCommandType, ApiRouteSearchRequest, ApiRouteSummary } from 'src/app/core/model/api-route.model';
import { SearchLayoutService } from 'src/app/shared/components/search-layout/search-layout.service';
import {
  selectApiRouteCountLoading,
  selectApiRouteDeleting,
  selectApiRouteCommandResponse,
  selectApiRoutes,
  selectApiRoutesLoading,
  selectApiRoutesPageMetadata,
  selectTotalApiRoutes,
} from 'src/app/state/api-route/api-route.selector';
import { AppState } from 'src/app/store/app.state';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnMap } from 'src/app/core/model/table-source';
import { selectMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';
import { debounceTime, filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { IconType, ItemDeleteDialogData } from 'src/app/core/model/core';
import * as ApiRouteActions from 'src/app/state/api-route/api-route.action';
import * as RequestPageActions from 'src/app/state/request-page/request-page.action';
import { PageEvent } from '@angular/material/paginator';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';
import { AppPermission } from 'src/app/core/auth/permissions.constants';
import { selectHasAllPermissions } from 'src/app/state/auth/auth.selector';
import { ItemDeleteDialogComponent } from 'src/app/shared/components/item-delete-dialog/item-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ApiRouteFormGroupHelper } from 'src/app/core/form-groups/api-route-form-group';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'blogsphere-api-routes',
  templateUrl: './api-routes.component.html',
  styleUrls: ['./api-routes.component.scss'],
  animations: [fadeSlideInOut],
  standalone: false,
})
export class ApiRoutesComponent implements OnInit, OnDestroy {
  public apiRoutes$ = this.store.select(selectApiRoutes);
  public apiRoutesPageMetadata$ = this.store.select(selectApiRoutesPageMetadata);
  public totalApiRoutes$ = this.store.select(selectTotalApiRoutes);
  public isApiRoutesLoading$ = this.store.select(selectApiRoutesLoading);
  public isApiRouteCountLoading$ = this.store.select(selectApiRouteCountLoading);
  public isRouteDeleting$ = this.store.select(selectApiRouteDeleting);
  public isRouteDeleted$ = this.store.select(selectApiRouteCommandResponse);
  public apiRouteDataSource = new MatTableDataSource<ApiRouteSummary>([]);
  public showEmptyStateButton: boolean;
  public displayedColumns: string[] = ['routeName', 'path', 'rateLimitterPolicy', 'status'];

  public columnNameMap: TableColumnMap = {
    routeName: { value: 'routeId', isDateField: false, isStatusField: false, isLinkField: true },
    path: { value: 'path', isDateField: false, isStatusField: false },
    rateLimitterPolicy: { value: 'rateLimitterPolicy', isDateField: false, isStatusField: false },
    status: { value: 'status', isDateField: false, isStatusField: true },
  };

  public isMobileView$ = this.store.select(selectMobileViewState);
  public isFilterApplied: boolean;
  public isSearchApplied: boolean;
  public searchTerm: string;
  public canEditOrDeleteApiRoute$: Observable<boolean> = this.store.select(
    selectHasAllPermissions([AppPermission.SYSTEM_VIEW_SETTINGS, AppPermission.SYSTEM_UPDATE_SETTINGS])
  );
  public routeFilterForm: UntypedFormGroup = ApiRouteFormGroupHelper.createApiRouteFilterFormGroup(this.fb);
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
    private dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private snackbar: SnackbarService
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

    this.isRouteDeleted$
      .pipe(
        takeUntil(this.destroy$),
        filter(res => res && res.commandtType === ApiRouteCommandType.Delete)
      )
      .subscribe(res => this.handleRouteResponse(res.id));

    this.addApiRoute();
    this.performSearch();
    this.changeSortMenu();
    this.applyFilter();
    this.resetFilter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onPageChange(event: PageEvent): void {}

  public onEdit(event: ApiRouteSummary): void {
    this.router.navigate(['api-route', 'route-setup', event.id]);
  }

  public onView(event: ApiRouteSummary): void {
    this.router.navigate(['api-route', 'details', event.id]);
  }

  public openDeleteDialog(event: ApiRouteSummary): void {
    const dialogData: ItemDeleteDialogData = {
      title: 'Delete ' + event.routeId,
      message: 'Are you sure you want to delete this API route?',
    };
    const dialogRef = this.dialog.open(ItemDeleteDialogComponent, {
      width: '440px',
      data: { dialogData },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new ApiRouteActions.DeleteApiRoute({ id: event.id }));
      }
    });
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
            this.isSearchApplied = text.length > 3 || (text.length > 0 && text.length <= 3) ? true : false;
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
    this.searchLayoutService.sortChange$.pipe(takeUntil(this.destroy$)).subscribe((sortField: string) => {
      this.currentSortField = sortField;
      this.noChangeDetection(() => {
        if (!this.isFilterApplied) {
          this.fetchApiRoutes(!!this.searchTerm, 10, 1, 'routeId', this.searchTerm, sortField);
        } else {
          this.fetchApiRoutes(true, 10, 1, 'routeId', this.searchTerm, sortField, 'desc', this.filters, 'createdAt', this.formDate, this.toDate);
        }
      });
    });
  }

  public onLinkClick(event: ApiRouteSummary): void {
    this.router.navigate(['api-route', 'details', event.id]);
  }

  private applyFilter(): void {
    this.searchLayoutService.filter$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isFilterApplied = true;
      this.formDate = this.routeFilterForm.value.fromDate?.toISOString();
      this.toDate = this.routeFilterForm.value.toDate?.toISOString();
      this.filters = this.routeFilterForm.getRawValue();
      delete this.filters.formDate;
      delete this.filters.toDate;

      this.noChangeDetection(() => {
        this.fetchApiRoutes(
          true,
          10,
          1,
          'routeId,path',
          this.searchTerm,
          this.currentSortField,
          'desc',
          this.filters,
          'createdAt',
          this.formDate,
          this.toDate
        );
      });
      this.fetchApiRouteCount(this.filters, this.searchTerm, 'routeId,path', this.formDate, this.toDate, 'createdAt');
    });
  }

  private resetFilter(): void {
    this.searchLayoutService.filterClear$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.routeFilterForm.reset();
      this.isFilterApplied = false;
      this.formDate = null;
      this.toDate = null;
      this.filters = null;
      this.noChangeDetection(() => {
        this.fetchApiRoutes(!!this.searchTerm, 10, 1, 'routeId,path', this.searchTerm, this.currentSortField);
        this.fetchApiRouteCount(null, this.searchTerm, 'routeId,path');
      });
    });
  }

  private handleRouteResponse(routeId: string): void {
    this.snackbar.showSuccess(`Route deleted successfully`);
    this.store.dispatch(new ApiRouteActions.ResetDeleteSuccess());
    this.useChangeDetection(() => (this.apiRouteDataSource.data = this.apiRouteDataSource.data.filter(route => route.id !== routeId)));
  }

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
