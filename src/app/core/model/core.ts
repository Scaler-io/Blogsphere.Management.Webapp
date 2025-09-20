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

export interface SearchRequestBase {
  
}

export interface ItemDeleteDialogData {
  title: string;
  message: string;
}