import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardSummaryResponse } from '../../model/dashboard.model';

export interface IDashboardService {
  getDashboardSummary(): Observable<DashboardSummaryResponse>;
}

export const DASHBOARD_SERVICE_TOKEN = new InjectionToken<IDashboardService>('DashboardService');
