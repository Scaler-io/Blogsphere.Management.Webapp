import { Component, Input } from '@angular/core';
import { DetailsCardMode, DetailsCardTableCell, DetailsCardTableRow } from './details-card.model';

@Component({
    selector: 'blogsphere-details-card',
    templateUrl: './details-card.component.html',
    styleUrls: ['./details-card.component.scss'],
    standalone: false
})
export class DetailsCardComponent {
  @Input() mode: DetailsCardMode = 'keyValue';
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() count: number | null = null;

  @Input() flushBody: boolean = false;

  @Input() tableHeaders: string[] = [];
  @Input() tableRows: DetailsCardTableRow[] = [];
  @Input() compactTable: boolean = false;

  public isCellObject(cell: string | DetailsCardTableCell): cell is DetailsCardTableCell {
    return typeof cell === 'object' && cell !== null;
  }

  public cellText(cell: string | DetailsCardTableCell): string {
    return this.isCellObject(cell) ? (cell.text ?? '') : cell;
  }

  public cellClasses(cell: string | DetailsCardTableCell): string[] {
    const align = this.cellAlignClass(cell);
    const variant = this.cellVariantClass(cell);
    return [align, variant].filter((c): c is string => typeof c === 'string' && c.length > 0);
  }

  public cellAlignClass(cell: string | DetailsCardTableCell): string | null {
    if (!this.isCellObject(cell)) return null;
    return cell.align === 'center' ? 'details-table__center' : null;
  }

  public cellVariantClass(cell: string | DetailsCardTableCell): string | null {
    if (!this.isCellObject(cell)) return null;
    switch (cell.variant) {
      case 'mono':
        return 'details-table__mono';
      case 'emphasis':
        return 'details-table__emphasis';
      default:
        return null;
    }
  }

  public isChipCell(cell: string | DetailsCardTableCell): boolean {
    return this.isCellObject(cell) && cell.variant === 'chip';
  }
}
