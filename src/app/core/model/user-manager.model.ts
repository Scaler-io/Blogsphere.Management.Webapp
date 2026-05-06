import { PaginatedResult } from './pagination';
import { TableDataSource } from './table-source';
import { CommandResponse, MetaData } from './core';
import { SearchRequestBase } from './search-request.model';

export class PaginatedManagementUserList extends PaginatedResult {
  constructor(
    public pageIndex: number,
    public pageSize: number,
    public count: number,
    public data: ManagementUserSummary[]
  ) {
    super(pageIndex, pageSize, count, data);
  }
}

export interface ManagementUserSearchRequest extends SearchRequestBase {}

export interface ManagementUserSummary extends TableDataSource {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  jobTitle: string;
  roles: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

/** App (end-user) directory — same list shape as management for shared UI; extend when API fields differ. */
export class PaginatedAppUserList extends PaginatedResult {
  constructor(
    public pageIndex: number,
    public pageSize: number,
    public count: number,
    public data: AppUserSummary[]
  ) {
    super(pageIndex, pageSize, count, data);
  }
}

export interface AppUserSearchRequest extends SearchRequestBase {}

export interface AppUserSummary extends TableDataSource {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  jobTitle: string;
  roles: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppUser {}

export interface ManagementUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  fullName: string;
  isActive: boolean;
  isEmailConfirmed: boolean;
  isPhoneNumberConfirmed: boolean;
  isTwoFactorEnabled: boolean;
  displayName: string;
  email: string;
  department: string;
  jobTitle: string;
  employeeId: string;
  roles: RoleDetails[];
  permissions: string[];
  metaData: MetaData;
}

export interface AppUserCommandResponse extends CommandResponse {
  id: string;
  employeeId?: string;
}

export interface ManagementUserCommandResponse extends CommandResponse {
  id: string;
  employeeId?: string;
}

export enum ManagementUserCommandType {
  Create = 'Management user created',
  Update = 'Management user updated',
  Delete = 'Management user deleted',
}

export enum ManagementUserRole {
  SuperAdmin = 'SuperAdmin',
  Support = 'Support',
  Admin = 'Admin',
  Manager = 'Manager',
  Moderator = 'Moderator',
  Analyst = 'Analyst',
}

export interface RoleDetails {
  name: string;
  description: string;
  isSystemRole: boolean;
}

export const ManagementUserRoleSelectLabel: Record<ManagementUserRole, string> = {
  [ManagementUserRole.SuperAdmin]: 'Super Admin',
  [ManagementUserRole.Support]: 'Support Engineer',
  [ManagementUserRole.Admin]: 'Admin',
  [ManagementUserRole.Manager]: 'Manager',
  [ManagementUserRole.Moderator]: 'Moderator',
  [ManagementUserRole.Analyst]: 'Analyst',
};
