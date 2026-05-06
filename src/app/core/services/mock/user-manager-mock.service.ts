import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ManagementUser, ManagementUserSearchRequest, PaginatedManagementUserList } from '../../model/user-manager.model';
import { BaseService } from '../base.service';
import { IUserManagerService } from '../interface/user-manager-service.interface';

@Injectable({
  providedIn: 'root',
})
export class UserManagerMockService extends BaseService implements IUserManagerService {
  constructor() {
    super();
  }

  getManagementUsers(_searchRequest: ManagementUserSearchRequest): Observable<PaginatedManagementUserList> {
    return of({
      pageIndex: 1,
      pageSize: 10,
      count: 1,
      data: [
        {
          id: '1',
          employeeId: 'E-001',
          fullName: 'Sample User',
          email: 'sample@example.com',
          department: 'Engineering',
          jobTitle: 'Developer',
          roles: ['Admin'],
          status: 'Active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    } as PaginatedManagementUserList);
  }

  getManagementUserCount(_searchRequest: ManagementUserSearchRequest): Observable<number> {
    return of(1);
  }

  getManagementUser(id: string): Observable<ManagementUser> {
    return of({
      id: '1',
      firstName: 'Sample',
      lastName: 'User',
      userName: 'sampleuser',
      employeeId: 'E-001',
      fullName: 'Sample User',
      email: 'sample@example.com',
      department: 'Engineering',
      jobTitle: 'Developer',
      roles: [{ name: 'Admin', description: 'Administrator with limited access', isSystemRole: true }],
      permissions: ['user:view', 'user:create', 'user:update', 'user:delete'],
      status: 'Active',
      isActive: true,
      isEmailConfirmed: true,
      isPhoneNumberConfirmed: true,
      isTwoFactorEnabled: true,
      displayName: 'Sample User',
      metaData: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: {
          fullName: 'Sample User',
          email: 'sample@example.com',
          employeeId: 'E-001',
          jobTitle: 'Developer',
        },
        updatedBy: {
          fullName: 'Sample User',
          email: 'sample@example.com',
          employeeId: 'E-001',
          jobTitle: 'Developer',
        },
      },
    });
  }
}
