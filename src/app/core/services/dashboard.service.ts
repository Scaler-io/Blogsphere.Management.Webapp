import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { DashboardResponse } from '../model/dashboard.model';
import { IDashboardService } from './interface/dashboard-service.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService implements IDashboardService {
  constructor(private http: HttpClient) {
    super();
  }

  public getDashboardSummary(scope: string): Observable<DashboardResponse> {
    const encodedScope = encodeURIComponent(scope);
    return this.http.get<DashboardResponse>(
      `${environment.blogsphereBffBaseUrl}/dashboard?scope=${encodedScope}`,
      {
        headers: this.getHttpHeaders(environment.blogsphereBffSubscriptionKey, 'v2'),
      }
    );
  }
}
