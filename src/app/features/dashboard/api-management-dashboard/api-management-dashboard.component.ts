import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ApiManagementDashboardResponse } from 'src/app/core/model/dashboard.model';
import {
  ChartPalette,
  getBaseChartOptions,
  getChartPalette,
  getStatusColor,
  withAlpha,
} from '../chart-theme';
import { SegmentedOption } from 'src/app/shared/components/segmented-control/segmented-control.component';

@Component({
  selector: 'blogsphere-api-management-dashboard',
  templateUrl: './api-management-dashboard.component.html',
  styleUrls: ['./api-management-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ApiManagementDashboardComponent implements OnChanges {
  @Input({ required: true }) summary!: ApiManagementDashboardResponse;

  public chartsDataLoaded = false;

  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';
  public doughnutChartType: ChartType = 'doughnut';

  public growthChartRangeOptions: SegmentedOption[] = [
    { id: 'all', label: 'All' },
    { id: '6m', label: '6m' },
    { id: '3m', label: '3m' },
  ];
  public growthChartRange = 'all';

  public growthChartData: ChartData<'line'> = { labels: [], datasets: [] };
  public statusChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  public activityChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  public growthChartOptions: ChartConfiguration<'line'>['options'] = this.buildLineOptions();
  public statusChartOptions: ChartConfiguration<'doughnut'>['options'] = this.buildDoughnutOptions();
  public activityChartOptions: ChartConfiguration<'bar'>['options'] = this.buildBarOptions();

  public totalClusters = 0;
  public totalRoutes = 0;
  public totalProducts = 0;

  private fullGrowthLabels: string[] = [];
  private fullGrowthDatasets: ApiManagementDashboardResponse['charts']['growthTrend']['datasets'] = [];

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

  onGrowthRangeChange(range: string): void {
    this.growthChartRange = range;
    this.updateGrowthChartFromCache();
  }

  private applySummary(response: ApiManagementDashboardResponse): void {
    this.totalClusters = response.summary?.clusters ?? 0;
    this.totalRoutes = response.summary?.routes ?? 0;
    this.totalProducts = response.summary?.products ?? 0;

    const trend = response.charts?.growthTrend;
    this.fullGrowthLabels = trend?.labels ?? [];
    this.fullGrowthDatasets = trend?.datasets ?? [];
    this.updateGrowthChartFromCache();

    this.updateStatusDistributionChart(response.charts?.clusterStatusDistribution);
    this.updateActivityChart(response.charts?.monthlyRouteActivity);
    this.chartsDataLoaded = true;
  }

  private updateGrowthChartFromCache(): void {
    const palette = getChartPalette();
    const sliceSize =
      this.growthChartRange === '3m' ? 3 : this.growthChartRange === '6m' ? 6 : this.fullGrowthLabels.length;
    const start = Math.max(0, this.fullGrowthLabels.length - sliceSize);

    const labels = this.fullGrowthLabels.slice(start);
    const datasets = this.fullGrowthDatasets.map((dataset, index) => {
      const stroke = index === 0 ? palette.primary : palette.secondary;
      return {
        data: (dataset.data ?? []).slice(start),
        label: dataset.label,
        borderColor: stroke,
        backgroundColor: withAlpha(stroke, 0.1),
        pointBackgroundColor: stroke,
        pointBorderColor: palette.primaryContainer,
        tension: 0.4,
        fill: true,
      };
    });

    this.growthChartData = { labels, datasets };
  }

  private updateStatusDistributionChart(
    distribution?: ApiManagementDashboardResponse['charts']['clusterStatusDistribution']
  ): void {
    const labels = distribution?.labels ?? [];
    const data = distribution?.counts ?? [];
    const palette = getChartPalette();
    const colors = labels.map((label) => getStatusColor(label, palette));

    this.statusChartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors.map((c) => c.bg),
          hoverBackgroundColor: colors.map((c) => c.hover),
          borderColor: palette.surfaceContainerHigh,
          borderWidth: 2,
        },
      ],
    };
  }

  private updateActivityChart(
    activity?: ApiManagementDashboardResponse['charts']['monthlyRouteActivity']
  ): void {
    const labels = activity?.labels ?? [];
    const data = activity?.counts ?? [];
    const palette = getChartPalette();

    this.activityChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Routes',
          backgroundColor: palette.secondary,
          hoverBackgroundColor: palette.primary,
          borderRadius: 6,
        },
      ],
    };
  }

  private buildLineOptions(): ChartConfiguration<'line'>['options'] {
    const base = getBaseChartOptions();
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { color: base.textColor, font: { family: base.family } },
        },
        title: { display: false },
        tooltip: this.tooltipStyle(base),
      },
      scales: {
        x: {
          grid: { color: base.gridColor },
          ticks: { color: base.mutedColor, font: { family: base.family } },
        },
        y: {
          beginAtZero: true,
          grid: { color: base.gridColor },
          ticks: { color: base.mutedColor, font: { family: base.family } },
        },
      },
    };
  }

  private buildBarOptions(): ChartConfiguration<'bar'>['options'] {
    const base = getBaseChartOptions();
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: this.tooltipStyle(base),
      },
      scales: {
        x: {
          grid: { color: base.gridColor },
          ticks: { color: base.mutedColor, font: { family: base.family } },
        },
        y: {
          beginAtZero: true,
          grid: { color: base.gridColor },
          ticks: { color: base.mutedColor, font: { family: base.family } },
        },
      },
    };
  }

  private buildDoughnutOptions(): ChartConfiguration<'doughnut'>['options'] {
    const base = getBaseChartOptions();
    return {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { color: base.textColor, font: { family: base.family } },
        },
        title: { display: false },
        tooltip: this.tooltipStyle(base),
      },
    };
  }

  private tooltipStyle(
    base: ReturnType<typeof getBaseChartOptions>
  ): {
    backgroundColor: string;
    titleColor: string;
    bodyColor: string;
    borderColor: string;
    borderWidth: number;
    cornerRadius: number;
    padding: number;
    titleFont: { family: string; weight: 'bold' };
    bodyFont: { family: string };
  } {
    return {
      backgroundColor: base.tooltipBg,
      titleColor: base.tooltipText,
      bodyColor: base.tooltipText,
      borderColor: base.gridColor,
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      titleFont: { family: base.family, weight: 'bold' },
      bodyFont: { family: base.family },
    };
  }

  // Exposed for the template — keeps the import surface small.
  get palette(): ChartPalette {
    return getChartPalette();
  }
}
