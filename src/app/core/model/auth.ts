export interface AuthUser {
  name: string;
  email: string;
  role: string;
  /** JWT claim list, or `'*'` when the server grants full access. */
  permissions: string[] | '*';
  employeeId: string;
  department: string;
  fullName: string;
}
