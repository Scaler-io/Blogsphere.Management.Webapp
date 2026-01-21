// Button
export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
  info = 'info',
  danger = 'danger',
  warning = 'warning',
  success = 'success',
  link = 'link',
  text = 'text',
  gradient = 'gradient',
}

export enum ButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

// Badge
export enum BadgeType {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
}

export enum IconType {
  data = 'data',
  search = 'search',
  empty = 'empty',
}

export interface SearchRequestBase {}

export interface ItemDeleteDialogData {
  title: string;
  message: string;
}

export interface CommandResponse {
  status?: CommandResultStatus;
  commandtType: string;
}

export enum CommandResultStatus {
  Success = 'Success',
  Failure = 'Failure',
}

export enum ToolTipText {
  ClusterDetails = 'An API cluster is basically a logical group of destination endpoints (servers/APIs) that YARP can load-balance requests across.',
  Destinations = 'Destinations are the endpoints that YARP will load-balance requests across.',
}