import { Component, Input, OnInit } from '@angular/core';

export enum InfoCardVariant {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
  tips = 'tips',
  primary = 'primary',
  accent = 'accent',
}

export enum InfoCardSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

@Component({
  selector: 'blogsphere-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  @Input() variant: InfoCardVariant = InfoCardVariant.info;
  @Input() size: InfoCardSize = InfoCardSize.medium;
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() showIcon: boolean = true;
  @Input() elevated: boolean = true;
  @Input() borderPosition: 'left' | 'top' | 'right' | 'bottom' | 'none' =
    'left';

  InfoCardVariant = InfoCardVariant;
  InfoCardSize = InfoCardSize;

  constructor() {}

  ngOnInit(): void {
    // Set default icon if not provided
    if (!this.icon && this.showIcon) {
      this.setDefaultIcon();
    }
  }

  public get cardClasses(): { [key: string]: boolean } {
    return {
      'info-card': true,
      [`info-card--${this.variant}`]: true,
      [`info-card--${this.size}`]: true,
      'info-card--elevated': this.elevated,
      [`info-card--border-${this.borderPosition}`]:
        this.borderPosition !== 'none',
    };
  }

  private setDefaultIcon(): void {
    const iconMap: { [key in InfoCardVariant]: string } = {
      [InfoCardVariant.info]: 'info',
      [InfoCardVariant.success]: 'check_circle',
      [InfoCardVariant.warning]: 'warning',
      [InfoCardVariant.error]: 'error',
      [InfoCardVariant.tips]: 'lightbulb',
      [InfoCardVariant.primary]: 'info',
      [InfoCardVariant.accent]: 'star',
    };

    this.icon = iconMap[this.variant];
  }
}
