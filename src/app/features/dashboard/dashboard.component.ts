import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';
import { ButtonType, ButtonSize } from 'src/app/core/model/core';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import * as DashboardActions from 'src/app/state/dashboard/dashboard.action';
import {
  selectDashboardLoading,
  selectDashboardSummary,
} from 'src/app/state/dashboard/dashboard.selector';
import { DashboardSummaryResponse } from 'src/app/core/model/dashboard.model';

@Component({
  selector: 'blogsphere-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeSlideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  public dashboardSummary$ = this.store.select(selectDashboardSummary);
  public dashboardLoading$ = this.store.select(selectDashboardLoading);

  public totalClusters = 0;
  public totalRoutes = 0;
  public totalProducts = 0;

  // Chart data loaded flag
  public chartsDataLoaded = false;

  // Chart configurations
  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';
  public doughnutChartType: ChartType = 'doughnut';

  // Growth trend chart (Line chart) - initialized empty
  public growthChartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  public growthChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Status distribution chart (Doughnut chart) - initialized empty
  public statusChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };

  public statusChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: false,
      },
    },
  };

  // Monthly activity chart (Bar chart) - initialized empty
  public activityChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  public activityChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new DashboardActions.StartDashboardPolling());

    this.dashboardSummary$
      .pipe(takeUntil(this.destroy$))
      .subscribe((summary: DashboardSummaryResponse) => {
        if (!summary) {
          return;
        }
        this.applyDashboardResponse(summary);
        this.chartsDataLoaded = true;
        this.cdr.markForCheck();
      });

    this.dashboardLoading$.pipe(takeUntil(this.destroy$)).subscribe(isLoading => {
      if (isLoading) {
        this.chartsDataLoaded = false;
      }
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new DashboardActions.StopDashboardPolling());
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToClusters(): void {
    this.router.navigate(['/api-cluster']);
  }

  navigateToRoutes(): void {
    this.router.navigate(['/api-route']);
  }

  navigateToSubscription(): void {
    this.router.navigate(['/subscription']);
  }

  private applyDashboardResponse(response: DashboardSummaryResponse): void {
    this.totalClusters = response.summary?.clusters ?? 0;
    this.totalRoutes = response.summary?.routes ?? 0;
    this.totalProducts = response.summary?.products ?? 0;

    this.updateGrowthTrendChart(response.charts?.growthTrend);
    this.updateStatusDistributionChart(response.charts?.clusterStatusDistribution);
    this.updateActivityChart(response.charts?.monthlyRouteActivity);
  }

  private updateGrowthTrendChart(trend?: DashboardSummaryResponse['charts']['growthTrend']): void {
    const labels = trend?.labels ?? [];
    const datasets = (trend?.datasets ?? []).map((dataset, index) => ({
      data: dataset.data ?? [],
      label: dataset.label,
      borderColor: index === 0 ? '#0033cc' : '#0076ff',
      backgroundColor: index === 0 ? 'rgba(0, 51, 204, 0.1)' : 'rgba(0, 118, 255, 0.1)',
      tension: 0.4,
      fill: true,
    }));

    this.growthChartData = {
      labels,
      datasets,
    };
  }

  private updateStatusDistributionChart(
    distribution?: DashboardSummaryResponse['charts']['clusterStatusDistribution']
  ): void {
    const labels = distribution?.labels ?? [];
    const data = distribution?.counts ?? [];
    const colors = this.getStatusColors(labels);

    this.statusChartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors.bg,
          hoverBackgroundColor: colors.hover,
        },
      ],
    };
  }

  private updateActivityChart(
    activity?: DashboardSummaryResponse['charts']['monthlyRouteActivity']
  ): void {
    const labels = activity?.labels ?? [];
    const data = activity?.counts ?? [];

    this.activityChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Routes',
          backgroundColor: '#0076ff',
          hoverBackgroundColor: '#0057b8',
        },
      ],
    };
  }

  private getStatusColors(statuses: string[]): { bg: string[]; hover: string[] } {
    const colorMap: Record<string, { bg: string; hover: string }> = {
      Active: { bg: '#10b981', hover: '#059669' },
      Inactive: { bg: '#ef4444', hover: '#dc2626' },
      // Pending: { bg: '#f59e0b', hover: '#d97706' },
      // Online: { bg: '#10b981', hover: '#059669' },
      // Offline: { bg: '#ef4444', hover: '#dc2626' },
      // Unknown: { bg: '#6b7280', hover: '#4b5563' },
    };

    const bg = statuses.map(s => colorMap[s]?.bg || '#6b7280');
    const hover = statuses.map(s => colorMap[s]?.hover || '#4b5563');

    return { bg, hover };
  }
}
