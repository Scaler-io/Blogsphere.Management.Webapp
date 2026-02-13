import { CommandResponse, MetaData, SearchRequestBase } from "./core";
import { PaginatedResult } from "./pagination";
import { TableDataSource } from "./table-source";

export interface ApiRouteSearchRequest extends SearchRequestBase {}

export class PaginatedApiRouteList extends PaginatedResult
{
    constructor(
        public pageIndex: number,
        public pageSize: number,
        public count: number,
        public data: ApiRouteSummary[]
    ){
        super(pageIndex, pageSize, count, data);
    }
}

export interface ApiRouteSummary extends TableDataSource {
  id: string;
  routeId: string;
  path: string;
  rateLimitterPolicy: string;
  transformCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RouteHeaderRequest {
  name: string;
  values: string[];
  mode: string;
  isActive: boolean;
}

export interface RouteTransformRequest {
  pathPattern: string;
  isActive: boolean;
}

export interface ApiRouteUpsertRequest {
  routeId: string;
  path: string;
  methods: string[];
  isActive: boolean;
  rateLimiterPolicy: string;
  clusterId: string;
  headers: RouteHeaderRequest[];
  transforms: RouteTransformRequest[];
}

export interface ApiRouteCommandResponse extends CommandResponse {
  id: string;
  routeId?: string;
}

export enum ApiRouteCommandType {
  Create = 'Api route created',
  Update = 'Api route updated',
  Delete = 'Api route deleted',
}

export interface ApiRoute {
  id: string;
  routeId: string;
  path: string;
  methods: HttpMethodEnum[];
  isActive: boolean;
  rateLimiterPolicy: string;
  clusterDetails: BasicClusterDetails;
  headers: RouteHeaderDetails[];
  transforms: RouteTransformDetails[];
  metaData: MetaData;
}

export interface RouteHeaderDetails {
  id: string;
  name: string;
  values: string[];
  mode: HeaderModeEnum;
  isActive: boolean;
}

export interface RouteTransformDetails {
  id: string;
  pathPattern: string;
  isActive: boolean;
}

export interface BasicClusterDetails {
  id: string;
  clusterId: string;
}

export enum HttpMethodEnum {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Patch = 'PATCH',
  Head = 'HEAD',
  Options = 'OPTIONS',
}

export enum HeaderModeEnum {
  ExactHeader = 'exactheader',
  Exists = 'exists',
  Prefix = 'prefix',
  Suffix = 'suffix',
}

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'] as const;
export type HttpMethod = (typeof HTTP_METHODS)[number];

export const HEADER_MODE_OPTIONS = ['exactheader', 'exists', 'prefix', 'suffix'] as const;
export type HeaderMode = (typeof HEADER_MODE_OPTIONS)[number];