import { Component, Input } from '@angular/core';

export type PageHeroAvatarShape = 'circle' | 'square';
export type PageHeroAvatarSize = 'default' | 'small';

@Component({
  selector: 'blogsphere-page-hero-avatar',
  templateUrl: './page-hero-avatar.component.html',
  styleUrls: ['./page-hero-avatar.component.scss'],
  standalone: false,
})
export class PageHeroAvatarComponent {
  @Input() shape: PageHeroAvatarShape = 'square';
  @Input() size: PageHeroAvatarSize = 'default';
  @Input() icon: string | null = null;
  @Input() initials: string | null = null;

  /**
   * Active state for the corner indicator dot.
   * - true  → green (active) dot with pulse
   * - false → gray (inactive) dot
   * - null  → no dot rendered
   */
  @Input() isActive: boolean | null = null;

  /** When true the avatar uses the desaturated gray gradient. */
  @Input() isInactive: boolean = false;
}
