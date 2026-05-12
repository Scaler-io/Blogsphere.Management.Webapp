import { Component, Input } from '@angular/core';

export type MethodPillSize = 'sm' | 'md';

@Component({
  selector: 'blogsphere-method-pill',
  templateUrl: './method-pill.component.html',
  styleUrls: ['./method-pill.component.scss'],
  standalone: false,
})
export class MethodPillComponent {
  @Input() method = '';
  @Input() size: MethodPillSize = 'md';

  public get methodUpper(): string {
    return (this.method || '').toUpperCase();
  }

  public get toneClass(): string {
    const known = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
    const m = this.methodUpper;
    return known.includes(m) ? `method-pill--${m.toLowerCase()}` : 'method-pill--unknown';
  }
}
