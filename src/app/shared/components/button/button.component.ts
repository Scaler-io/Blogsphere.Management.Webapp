import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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

@Component({
  selector: 'blogsphere-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() isAutoWidth: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() type: ButtonType = ButtonType.text;
  @Input() size: ButtonSize = ButtonSize.medium;
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() rounded: boolean = false;
  @Input() elevated: boolean = true;

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  public onButtonClick(event: Event): void {
    event.preventDefault();
    if (!this.isDisabled && !this.isLoading) {
      this.next.emit();
    }
  }

  public get buttonClasses(): { [key: string]: boolean } {
    return {
      'button__layout--disabled': this.isDisabled,
      'button__layout--autowidth': this.isAutoWidth,
      'button__layout--primary': this.type === ButtonType.primary,
      'button__layout--secondary': this.type === ButtonType.secondary,
      'button__layout--danger': this.type === ButtonType.danger,
      'button__layout--warning': this.type === ButtonType.warning,
      'button__layout--success': this.type === ButtonType.success,
      'button__layout--info': this.type === ButtonType.info,
      'button__layout--gradient': this.type === ButtonType.gradient,
      'button__layout--text': this.type === ButtonType.text,
      'button__layout--link': this.type === ButtonType.link,
      'button__layout--small': this.size === ButtonSize.small,
      'button__layout--medium': this.size === ButtonSize.medium,
      'button__layout--large': this.size === ButtonSize.large,
      'button__layout--rounded': this.rounded,
      'button__layout--elevated': this.elevated,
      'button__layout--loading': this.isLoading,
      'button__layout--has-icon': !!this.icon,
    };
  }
}
