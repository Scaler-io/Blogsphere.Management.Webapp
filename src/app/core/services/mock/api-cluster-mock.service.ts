import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { IApiClusterService } from '../interface/api-custer-service.interface';
import { Observable, of } from 'rxjs';
import {
  ApiClusterSearchRequest,
  PaginatedApiClusterList,
  ApiCluster,
  ApiClusterUpsertRequest,
  ApiClusterCommandResponse,
} from '../../model/api-cluster.model';
import { CommandResultStatus } from '../../model/core';

@Injectable({
  providedIn: 'root',
})
export class ApiClusterMockService extends BaseService implements IApiClusterService {
  constructor() {
    super();
  }

  getAllApiClusters(searchRequest: ApiClusterSearchRequest): Observable<PaginatedApiClusterList> {
    return of({
      pageIndex: 1,
      pageSize: 10,
      count: 10,
      data: [
        {
          id: '1',
          clusterId: 'Service 1',
          loadBalancerName: 'LoadBalancer 1',
          healthCheckEnabled: true,
          healthCheckPath: '/health',
          destinationCount: 10,
          routeCount: 10,
          status: 'Active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          clusterId: 'Service 2',
          loadBalancerName: 'LoadBalancer 2',
          healthCheckEnabled: true,
          healthCheckPath: '/health',
          destinationCount: 10,
          routeCount: 10,
          status: 'Active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    });
  }
  getApiClusterCount(searchRequest: ApiClusterSearchRequest): Observable<number> {
    return of(10);
  }
  getApiClusterById(id: string): Observable<ApiCluster> {
    return of({
      id: '1',
      clusterId: '1',
      loadBalancingPolicy: 'RoundRobin',
      healthCheckEnabled: true,
      healthCheckPath: '/health',
      healthCheckInterval: 10,
      healthCheckTimeout: 10,
      isActive: true,
      destinations: [
        {
          id: '1',
          destinationId: '1',
          address: 'https://www.google.com',
          isActive: true,
        },
      ],
      routes: [
        {
          id: '1',
          routeId: '1',
          methods: ['GET', 'POST'],
          isActive: true,
        },
      ],
      metaData: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: {
          fullName: 'test',
          email: 'test@test.com',
          employeeId: '1234567890',
          jobTitle: 'test',
        },
        updatedBy: {
          fullName: 'test',
          email: 'test@test.com',
          employeeId: '1234567890',
          jobTitle: 'test',
        },
      },
    });
  }
  createApiCluster(request: ApiClusterUpsertRequest): Observable<ApiClusterCommandResponse> {
    return of({
      id: '1',
      clusterId: '1',
      commandtType: 'Create',
      status: CommandResultStatus.Success,
    });
  }

  updateApiCluster(
    id: string,
    request: ApiClusterUpsertRequest
  ): Observable<ApiClusterCommandResponse> {
    return of({
      id: '1',
      clusterId: '1',
      commandtType: 'Update',
      status: CommandResultStatus.Success,
    });
  }
  deleteApiCluster(id: string): Observable<ApiClusterCommandResponse> {
    throw new Error('Method not implemented.');
  }
}
