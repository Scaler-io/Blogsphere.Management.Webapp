export interface PermissionRouteData {
  requiredPermission?: string;
  requiredPermissions?: string[];
  permissionsMode?: 'all' | 'any';
}
