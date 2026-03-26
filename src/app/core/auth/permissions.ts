import type { AuthUser } from '../model/auth';

export type StoredPermissions = AuthUser['permissions'];

export function isWildcardPermissions(permissions: StoredPermissions | null | undefined): boolean {
  return permissions === '*';
}

export function hasPermission(
  permissions: StoredPermissions | null | undefined,
  required: string
): boolean {
  if (permissions === '*') {
    return true;
  }
  if (!permissions?.length) {
    return false;
  }
  return permissions.includes(required);
}

export function hasAllPermissions(
  permissions: StoredPermissions | null | undefined,
  required: readonly string[]
): boolean {
  if (permissions === '*') {
    return true;
  }
  if (required.length === 0) {
    return true;
  }
  if (!permissions?.length) {
    return false;
  }
  return required.every((p) => permissions.includes(p));
}

export function hasAnyPermission(
  permissions: StoredPermissions | null | undefined,
  required: readonly string[]
): boolean {
  if (permissions === '*') {
    return true;
  }
  if (!permissions?.length || required.length === 0) {
    return false;
  }
  return required.some((p) => permissions.includes(p));
}
