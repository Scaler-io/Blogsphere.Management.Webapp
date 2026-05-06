import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ButtonSize, ButtonType } from 'src/app/core/model/core';
import { SearchLayoutService } from './search-layout.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { selectMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';

@Component({
    selector: 'blogsphere-search-layout',
    templateUrl: './search-layout.component.html',
    styleUrls: ['./search-layout.component.scss'],
    standalone: false
})
export class SearchLayoutComponent implements OnInit {
  public searchInput: UntypedFormControl = new UntypedFormControl('');
  public filterPanelOpened: boolean = false;
  public selectedSortField: string = 'Last created';
  public isFilterApplied: boolean = false;
  public isMobileView$ = this.store.select(selectMobileViewState);

  @Input() filterLabel: string = 'FILTER';
  @Input() addButtonLabel: string = 'ADD';
  @Input() isFileterFormValid: boolean;
  @Input() allowAdd: boolean = true;

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  constructor(private searchLayoutService: SearchLayoutService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.searchLayoutService.emitSearchInput(this.searchInput);
  }

  public toggleFilterPanel(): void {
    this.filterPanelOpened = !this.filterPanelOpened;
    this.searchLayoutService.emitPanelClosed(this.filterPanelOpened);
  }

  public sortMenuChanged(sortField: string): void {
    if (sortField === 'createdAt') this.selectedSortField = 'Last created';
    else this.selectedSortField = 'Last updated';
    this.searchLayoutService.emitSortChange(sortField);
  }

  public applyFilter(): void {
    this.isFilterApplied = true;
    this.filterPanelOpened = false;
    this.searchLayoutService.emitFilter();
  }

  public clearFilter(): void {
    if (this.isFilterApplied) {
      this.isFilterApplied = false;
      this.searchLayoutService.emitFilterClear();
    }
  }

  public onAddResource(): void {
    this.searchLayoutService.emitAddNewAction();
  }
}
