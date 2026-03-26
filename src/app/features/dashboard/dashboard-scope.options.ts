import { AppPermission } from 'src/app/core/auth/permissions.constants';
import { StoredPermissions, hasPermission } from 'src/app/core/auth/permissions';
import { DashboardKind } from 'src/app/core/model/dashboard.model';

export interface DashboardScopeOption {
  readonly id: DashboardKind;
  readonly label: string;
  readonly permission: AppPermission;
}

export const DASHBOARD_SCOPE_OPTIONS: readonly DashboardScopeOption[] = [
  {
    id: 'api-management',
    label: 'API management',
    permission: AppPermission.SYSTEM_VIEW_SETTINGS,
  },
  {
    id: 'user-management',
    label: 'User management',
    permission: AppPermission.USER_VIEW,
  },
];

export function filterDashboardScopeOptionsByPermissions(
  permissions: StoredPermissions
): DashboardScopeOption[] {
  return DASHBOARD_SCOPE_OPTIONS.filter((option) => hasPermission(permissions, option.permission));
}
