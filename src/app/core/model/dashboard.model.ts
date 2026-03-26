/** BFF dashboard discriminator (`kind` in JSON). */
export type DashboardKind = 'api-management' | 'user-management';

export interface DashboardSummaryCounts {
  clusters: number;
  routes: number;
  products: number;
}

export interface DashboardCharts {
  growthTrend: GrowthTrendChart;
  clusterStatusDistribution: StatusDistributionChart;
  monthlyRouteActivity: MonthlyActivityChart;
}

export interface GrowthTrendChart {
  labels: string[];
  datasets: Array<GrowthTrendDataset>;
}

export interface GrowthTrendDataset {
  label: string;
  data: number[];
}

export interface StatusDistributionChart {
  labels: string[];
  counts: number[];
}

export interface MonthlyActivityChart {
  labels: string[];
  counts: number[];
}

/** API management dashboard (clusters, routes, products, charts). */
export interface ApiManagementDashboardResponse {
  kind: 'api-management';
  summary: DashboardSummaryCounts;
  charts: DashboardCharts;
  timestamp: string;
  refreshAfterSeconds: number;
}

export interface UserManagementDashboardSummary {
  totalUsers: number;
  activeUsers: number;
}

/** User management dashboard (user-centric metrics). */
export interface UserManagementDashboardResponse {
  kind: 'user-management';
  summary: UserManagementDashboardSummary;
  timestamp: string;
  refreshAfterSeconds: number;
}

export type DashboardResponse = ApiManagementDashboardResponse | UserManagementDashboardResponse;

/** @deprecated Use `DashboardResponse` or `ApiManagementDashboardResponse`. */
export type DashboardSummaryResponse = ApiManagementDashboardResponse;

export function isApiManagementDashboard(
  response: DashboardResponse | null | undefined
): response is ApiManagementDashboardResponse {
  return response?.kind === 'api-management';
}

export function isUserManagementDashboard(
  response: DashboardResponse | null | undefined
): response is UserManagementDashboardResponse {
  return response?.kind === 'user-management';
}
