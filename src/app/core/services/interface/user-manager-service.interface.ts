import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ManagementUser, ManagementUserSearchRequest, PaginatedManagementUserList } from '../../model/user-manager.model';

export interface IUserManagerService {
  getManagementUsers(searchRequest: ManagementUserSearchRequest): Observable<PaginatedManagementUserList>;
  getManagementUserCount(searchRequest: ManagementUserSearchRequest): Observable<number>;
  getManagementUser(id: string): Observable<ManagementUser>;
}
export const USER_MANAGER_SERVICE_TOKEN = new InjectionToken<IUserManagerService>(
  'UserManagerService'
);
