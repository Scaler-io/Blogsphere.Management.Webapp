import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ManagementUser,
  ManagementUserSearchRequest,
  PaginatedManagementUserList,
} from '../model/user-manager.model';
import { BaseService } from './base.service';
import { IUserManagerService } from './interface/user-manager-service.interface';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService extends BaseService implements IUserManagerService {
  constructor(private http: HttpClient) {
    super();
  }

  public getManagementUsers(searchRequest: ManagementUserSearchRequest): Observable<PaginatedManagementUserList> {
    return this.http.post<PaginatedManagementUserList>(`${environment.blogsphereSearchApiBaseUrl}/managementuser-search-index`, searchRequest, {
      headers: this.getHttpHeaders(environment.blogsphereSearchApiSubscriptionKey, 'v1'),
    });
  }

  public getManagementUserCount(searchRequest: ManagementUserSearchRequest): Observable<number> {
    return this.http.post<number>(`${environment.blogsphereSearchApiBaseUrl}/count/managementuser-search-index`, searchRequest, {
      headers: this.getHttpHeaders(environment.blogsphereSearchApiSubscriptionKey, 'v1'),
    });
  }

  public getManagementUser(id: string): Observable<ManagementUser> {
    return this.http.get<ManagementUser>(`${environment.blogsphereUserApiBaseUrl}/managementuser/${id}`, {
      headers: this.getHttpHeaders(environment.blogsphereUserApiSubscriptionKey, 'v2'),
    });
  }
}
