import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ButtonType, ButtonSize } from 'src/app/core/model/core';
import { ApiManagementDashboardResponse } from 'src/app/core/model/dashboard.model';

@Component({
  selector: 'blogsphere-api-management-dashboard',
  templateUrl: './api-management-dashboard.component.html',
  styleUrls: ['./api-management-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ApiManagementDashboardComponent implements OnChanges {
  @Input({ required: true }) summary!: ApiManagementDashboardResponse;

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  public chartsDataLoaded = false;

  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';
  public doughnutChartType: ChartType = 'doughnut';

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

  public totalClusters = 0;
  public totalRoutes = 0;
  public totalProducts = 0;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['summary']?.currentValue) {
      this.applySummary(changes['summary'].currentValue as ApiManagementDashboardResponse);
    }
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

  private applySummary(response: ApiManagementDashboardResponse): void {
    this.totalClusters = response.summary?.clusters ?? 0;
    this.totalRoutes = response.summary?.routes ?? 0;
    this.totalProducts = response.summary?.products ?? 0;

    this.updateGrowthTrendChart(response.charts?.growthTrend);
    this.updateStatusDistributionChart(response.charts?.clusterStatusDistribution);
    this.updateActivityChart(response.charts?.monthlyRouteActivity);
    this.chartsDataLoaded = true;
  }

  private updateGrowthTrendChart(trend?: ApiManagementDashboardResponse['charts']['growthTrend']): void {
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
    distribution?: ApiManagementDashboardResponse['charts']['clusterStatusDistribution']
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
    activity?: ApiManagementDashboardResponse['charts']['monthlyRouteActivity']
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
    };

    const bg = statuses.map((status) => colorMap[status]?.bg || '#6b7280');
    const hover = statuses.map((status) => colorMap[status]?.hover || '#4b5563');

    return { bg, hover };
  }
}
