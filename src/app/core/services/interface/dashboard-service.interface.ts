import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../../model/dashboard.model';

export interface IDashboardService {
  getDashboardSummary(scope: string): Observable<DashboardResponse>;
}

export const DASHBOARD_SERVICE_TOKEN = new InjectionToken<IDashboardService>('DashboardService');
