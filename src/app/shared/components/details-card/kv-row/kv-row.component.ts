import { Component, Input } from '@angular/core';

export type KvRowValueVariant = 'default' | 'mono' | 'link';

@Component({
  selector: 'blogsphere-kv-row',
  templateUrl: './kv-row.component.html',
  styleUrls: ['./kv-row.component.scss'],
})
export class KvRowComponent {
  @Input() label: string = '';
  @Input() variant: KvRowValueVariant = 'default';

  public get valueClass(): string | null {
    switch (this.variant) {
      case 'mono':
        return 'details-kv__val--mono';
      case 'link':
        return 'details-kv__val--link';
      default:
        return null;
    }
  }
}

