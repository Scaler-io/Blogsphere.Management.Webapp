import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'blogsphere-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() pageMetadata: any | null = null;
  @Output() pageChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  public getVisiblePages(pageMetadata: any): number[] {
    const { currentPage, totalPages } = pageMetadata;
    const visiblePages: number[] = [];

    // If total pages is small, show all pages
    if (totalPages <= 7) {
      for (let i = 2; i < totalPages; i++) {
        visiblePages.push(i);
      }
      return visiblePages;
    }

    // Logic for showing pages around current page
    if (currentPage <= 4) {
      // Show pages 2, 3, 4 if we're near the beginning
      for (let i = 2; i <= Math.min(4, totalPages - 1); i++) {
        visiblePages.push(i);
      }
    } else if (currentPage >= totalPages - 3) {
      // Show last few pages if we're near the end
      for (let i = Math.max(totalPages - 3, 2); i < totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Show pages around current page
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
          visiblePages.push(i);
        }
      }
    }

    return visiblePages;
  }

  public shouldShowStartEllipsis(pageMetadata: any): boolean {
    const { currentPage, totalPages } = pageMetadata;
    return totalPages > 7 && currentPage > 4;
  }

  public shouldShowEndEllipsis(pageMetadata: any): boolean {
    const { currentPage, totalPages } = pageMetadata;
    return totalPages > 7 && currentPage < totalPages - 3;
  }

  public Math = Math;
}
