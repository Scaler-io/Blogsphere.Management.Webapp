import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import {
  GrowthTrendChart,
  LabeledCountsChart,
  MonthlyActivityChart,
  StatusDistributionChart,
  UserManagementDashboardResponse,
} from 'src/app/core/model/dashboard.model';
import {
  getBaseChartOptions,
  getChartPalette,
  getStatusColor,
  withAlpha,
} from '../chart-theme';
import { StatTileDelta } from 'src/app/shared/components/stat-tile/stat-tile.component';

@Component({
  selector: 'blogsphere-user-management-dashboard',
  templateUrl: './user-management-dashboard.component.html',
  styleUrls: ['./user-management-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UserManagementDashboardComponent implements OnChanges {
  @Input({ required: true }) summary!: UserManagementDashboardResponse;

  public chartsDataLoaded = false;

  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';
  public doughnutChartType: ChartType = 'doughnut';

  public growthChartData: ChartData<'line'> = { labels: [], datasets: [] };
  public monthlyChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public statusChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  public topDepartmentsChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public topRolesChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  public growthChartOptions: ChartConfiguration<'line'>['options'] = this.buildLineOptions();
  public monthlyChartOptions: ChartConfiguration<'bar'>['options'] = this.buildBarOptions();
  public statusChartOptions: ChartConfiguration<'doughnut'>['options'] = this.buildDoughnutOptions();
  public topDepartmentsChartOptions: ChartConfiguration<'bar'>['options'] = this.buildHorizontalBarOptions();
  public topRolesChartOptions: ChartConfiguration<'bar'>['options'] = this.buildHorizontalBarOptions();

  public totalUsers = 0;
  public activeUsers = 0;
  public inactiveUsers = 0;
  public newUsersLast30Days = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['summary']?.currentValue) {
      this.applyDashboard(changes['summary'].currentValue as UserManagementDashboardResponse);
    }
  }

  get activeRatioCaption(): string {
    if (!this.totalUsers) return 'No users yet';
    const percent = Math.round((this.activeUsers / this.totalUsers) * 100);
    return `${percent}% of directory active`;
  }

  get newUsersDelta(): StatTileDelta | undefined {
    if (!this.newUsersLast30Days) {
      return undefined;
    }
    return {
      value: `${this.newUsersLast30Days}`,
      direction: 'up',
      tone: 'positive',
    };
  }

  private applyDashboard(response: UserManagementDashboardResponse): void {
    const mgmt = response.analytics?.managementUsers;
    const s = mgmt?.summary;

    this.totalUsers = s?.totalUsers ?? 0;
    this.activeUsers = s?.activeUsers ?? 0;
    this.inactiveUsers = s?.inactiveUsers ?? 0;
    this.newUsersLast30Days = s?.newUsersLast30Days ?? 0;

    const charts = mgmt?.charts;
    this.updateGrowthTrendChart(charts?.growthTrend);
    this.updateMonthlyChart(charts?.monthlyRegistrations);
    this.updateStatusChart(charts?.statusDistribution);
    this.updateTopDepartmentsChart(charts?.topDepartments);
    this.updateTopRolesChart(charts?.topRoles);

    this.chartsDataLoaded = true;
  }

  private updateGrowthTrendChart(trend?: GrowthTrendChart): void {
    const labels = trend?.labels ?? [];
    const palette = getChartPalette();
    const datasets = (trend?.datasets ?? []).map((dataset, index) => {
      const stroke = index === 0 ? palette.primary : palette.secondary;
      return {
        data: dataset.data ?? [],
        label: dataset.label,
        borderColor: stroke,
        backgroundColor: withAlpha(stroke, 0.1),
        pointBackgroundColor: stroke,
        tension: 0.4,
        fill: true,
      };
    });

    this.growthChartData = { labels, datasets };
  }

  private updateMonthlyChart(monthly?: MonthlyActivityChart): void {
    const labels = monthly?.labels ?? [];
    const data = monthly?.counts ?? [];
    const palette = getChartPalette();

    this.monthlyChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'New users',
          backgroundColor: palette.secondary,
          hoverBackgroundColor: palette.primary,
          borderRadius: 6,
        },
      ],
    };
  }

  private updateStatusChart(distribution?: StatusDistributionChart): void {
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

  private updateTopDepartmentsChart(top?: LabeledCountsChart): void {
    const labels = top?.labels ?? [];
    const data = top?.counts ?? [];
    const palette = getChartPalette();

    this.topDepartmentsChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Users',
          backgroundColor: palette.secondary,
          hoverBackgroundColor: palette.primary,
          borderRadius: 6,
        },
      ],
    };
  }

  private updateTopRolesChart(top?: LabeledCountsChart): void {
    const labels = top?.labels ?? [];
    const data = top?.counts ?? [];
    const palette = getChartPalette();

    this.topRolesChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Assignments',
          backgroundColor: palette.primary,
          hoverBackgroundColor: palette.primaryContainer,
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

  private buildHorizontalBarOptions(): ChartConfiguration<'bar'>['options'] {
    const base = getBaseChartOptions();
    return {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: this.tooltipStyle(base),
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: base.gridColor },
          ticks: { color: base.mutedColor, font: { family: base.family } },
        },
        y: {
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
}
