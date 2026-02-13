import { CommandResponse, MetaData } from './core';
import { PaginatedResult } from './pagination';
import { SearchRequestBase } from './search-request.model';
import { TableDataSource } from './table-source';

export class PaginatedApiClusterList extends PaginatedResult {
  constructor(
    public pageIndex: number,
    public pageSize: number,
    public count: number,
    public data: ApiClusterSummary[]
  ) {
    super(pageIndex, pageSize, count, data);
  }
}

export interface ApiClusterSummary extends TableDataSource {
  id: string;
  clusterId: string;
  loadBalancerName: string;
  healthCheckEnabled: boolean;
  healthCheckPath: string;
  destinationCount: number;
  routeCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiCluster {
  id: string;
  clusterId: string;
  loadBalancingPolicy: string;
  healthCheckEnabled: boolean;
  healthCheckPath: string;
  healthCheckInterval: number;
  healthCheckTimeout: number;
  isActive: boolean;
  destinations: Destination[];
  routes: ClusterRouteDetails[];
  metaData: MetaData;
}

export interface Destination {
  id: string;
  destinationId: string;
  address: string;
  isActive: boolean;
}

export interface ClusterRouteDetails {
  id: string;
  routeId: string;
  methods: string[];
  isActive: boolean;
}

export interface ApiClusterSearchRequest extends SearchRequestBase {}

export interface ApiClusterUpsertRequest {
  clusterId: string;
  loadBalancingPolicy: string;
  healthCheckEnabled: boolean;
  healthCheckPath: string;
  healthCheckInterval: number;
  healthCheckTimeout: number;
  destinations: DestinationRequest[];
}

export interface DestinationRequest {
  destinationId: string;
  address: string;
  isActive: boolean;
}

export interface ApiClusterCommandResponse extends CommandResponse {
  id: string;
  clusterId?: string;
}

export enum ApiClusterCommandType {
  Create = 'Api cluster created',
  Update = 'Api cluster updated',
  Delete = 'Api cluster deleted',
}

export enum LoadBalancerPolicy {
  RoundRobin = 'RoundRobin',
  LeastConnections = 'LeastConnections',
  PowerOfTwoChoices = 'PowerOfTwoChoices',
  FirstAlphabetical = 'FirstAlphabetical',
  LeastRequests = 'LeastRequests',
  // TODO: Backend is not implemented yet for this policy
  // WeightedRoundRobin = 'WeightedRoundRobin',
}

export const LoadBalancerPolicySelectLabel: Record<LoadBalancerPolicy, string> = {
  ['RoundRobin']: 'Round Robin',
  ['LeastConnections']: 'Least Connections',
  ['PowerOfTwoChoices']: 'Power of Two Choices',
  ['FirstAlphabetical']: 'First Alphabetical',
  ['LeastRequests']: 'Least Requests',
  // TODO: Backend is not implemented yet for this policy
  // ['WeightedRoundRobin']: "Weighted Round Robin",
};
