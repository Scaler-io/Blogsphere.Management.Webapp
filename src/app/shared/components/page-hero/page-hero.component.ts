import { Component, Input } from '@angular/core';

@Component({
  selector: 'blogsphere-page-hero',
  templateUrl: './page-hero.component.html',
  styleUrls: ['./page-hero.component.scss'],
  standalone: false,
})
export class PageHeroComponent {
  /** Primary heading rendered as the hero `<h1>`. */
  @Input() title: string = '';

  /**
   * Optional small subtitle rendered under the title. Useful for the
   * compact (e.g. JSON) variant where the body slot is collapsed.
   */
  @Input() subtitle: string | null = null;

  /**
   * When true the hero collapses to a thin row: no gradient cover,
   * smaller spacing, actions stay in the normal flow on the right.
   */
  @Input() compact: boolean = false;
}
