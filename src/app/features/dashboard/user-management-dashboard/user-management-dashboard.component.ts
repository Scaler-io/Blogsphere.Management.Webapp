import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import {
  GrowthTrendChart,
  LabeledCountsChart,
  MonthlyActivityChart,
  StatusDistributionChart,
  UserManagementDashboardResponse,
} from 'src/app/core/model/dashboard.model';

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
  public growthChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  public monthlyChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public monthlyChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  public statusChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  public statusChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom' },
      title: { display: false },
    },
  };

  public topDepartmentsChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public topDepartmentsChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  public topRolesChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public topRolesChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  public totalUsers = 0;
  public activeUsers = 0;
  public inactiveUsers = 0;
  public newUsersLast30Days = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['summary']?.currentValue) {
      this.applyDashboard(changes['summary'].currentValue as UserManagementDashboardResponse);
    }
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
    const datasets = (trend?.datasets ?? []).map((dataset, index) => ({
      data: dataset.data ?? [],
      label: dataset.label,
      borderColor: index === 0 ? '#0033cc' : '#0076ff',
      backgroundColor: index === 0 ? 'rgba(0, 51, 204, 0.1)' : 'rgba(0, 118, 255, 0.1)',
      tension: 0.4,
      fill: true,
    }));

    this.growthChartData = { labels, datasets };
  }

  private updateMonthlyChart(monthly?: MonthlyActivityChart): void {
    const labels = monthly?.labels ?? [];
    const data = monthly?.counts ?? [];

    this.monthlyChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'New users',
          backgroundColor: '#0076ff',
          hoverBackgroundColor: '#0057b8',
        },
      ],
    };
  }

  private updateStatusChart(distribution?: StatusDistributionChart): void {
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

  private updateTopDepartmentsChart(top?: LabeledCountsChart): void {
    const labels = top?.labels ?? [];
    const data = top?.counts ?? [];

    this.topDepartmentsChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Users',
          backgroundColor: '#0d9488',
          hoverBackgroundColor: '#0f766e',
        },
      ],
    };
  }

  private updateTopRolesChart(top?: LabeledCountsChart): void {
    const labels = top?.labels ?? [];
    const data = top?.counts ?? [];

    this.topRolesChartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Assignments',
          backgroundColor: '#7c3aed',
          hoverBackgroundColor: '#6d28d9',
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
