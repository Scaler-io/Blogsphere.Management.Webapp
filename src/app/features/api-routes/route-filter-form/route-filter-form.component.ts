import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RateLimiterPolicies } from 'src/app/core/model/api-route.model';
import { selectApiClusters, selectTotalApiClusters } from 'src/app/state/api-cluster/api-cluster.selector';
import { AppState } from 'src/app/store/app.state';
import * as ApiClusterActions from 'src/app/state/api-cluster/api-custer.action';
import { filter, map, Subject, switchMap, take, takeUntil } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'blogsphere-route-filter-form',
  standalone: false,
  templateUrl: './route-filter-form.component.html',
  styleUrl: './route-filter-form.component.scss',
})
export class RouteFilterFormComponent implements OnInit, OnDestroy {
  @Input() filterForm: UntypedFormGroup;
  public clusterOptions: { id: string; name: string }[] = [];
  public rateLimiterPolicyOptions: RateLimiterPolicies[] = Object.values(RateLimiterPolicies);
  public apiClusterCount = this.store.select(selectTotalApiClusters);
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  fromMinDate: Date = new Date(2000, 0, 1);
  toMinDate: Date = new Date(2000, 0, 1);
  fromMaxDate: Date = new Date();
  toMaxDate: Date = new Date();

  ngOnInit(): void {
    this.setupClusterLists();
    this.filterForm.valueChanges.subscribe(value => {
      const { fromDate, toDate } = value;
      const fromDateMoment = moment(fromDate);
      const toDateMoment = moment(toDate);

      if(fromDate && !toDate){
        this.toMinDate=fromDateMoment.add(1, 'day').toDate();
      }
      if(toDate && fromDate && toDateMoment.isBefore(fromDateMoment)){
        this.filterForm.get('toDate').reset();
      }
      if(toDate && fromDate && toDateMoment.isAfter(fromDateMoment))
      {
        this.toMinDate = fromDateMoment.add(1, 'day').toDate();
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupClusterLists(): void {
    this.store.dispatch(new ApiClusterActions.GetApiClusterCount({ isFilteredQuery: false }));
    this.apiClusterCount
    .pipe(
      filter(count => count > 0),
      take(1),
      switchMap(count => {
        this.store.dispatch(new ApiClusterActions.GetAllApiClusters({
          isFilteredQuery: false,
          pageIndex: 1,
          pageSize: count,
          matchPhraseField: '',
          matchPhrase: '',
          sortField: 'createdAt',
          sortOrder: 'desc',
        }));
        return this.store.select(selectApiClusters)
        .pipe(
          filter((clusters): clusters is NonNullable<typeof clusters> => !!clusters && clusters.length === count),
          take(1),
          map(clusters => clusters.map(cluster => ({id: cluster.id, name: cluster.clusterId})))
        );
      }),
      takeUntil(this.destroy$)
    )
    .subscribe(clusters => {
      this.clusterOptions = clusters;
    })
  }
}
 