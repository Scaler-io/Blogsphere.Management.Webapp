import { Component, Input, OnInit } from '@angular/core';
import { BadgeType } from 'src/app/core/model/core';

@Component({
  selector: 'blogsphere-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() type: BadgeType = BadgeType.primary;
  @Input() isRounded: boolean = false;

  BadgeType = BadgeType;

  constructor() {}

  ngOnInit(): void {}

  public get badgeClasses(): { [key: string]: boolean } {
    return {
      'badge--primary': this.type === BadgeType.primary,
      'badge--secondary': this.type === BadgeType.secondary,
      'badge--success': this.type === BadgeType.success,
      'badge--danger': this.type === BadgeType.danger,
      'badge--warning': this.type === BadgeType.warning,
      'rounded-pill': this.isRounded,
    };
  }
}
