export interface DashboardSummaryResponse {
  summary: DashboardSummaryCounts;
  charts: DashboardCharts;
  timestamp: string;
  refreshAfterSeconds: number;
}

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
