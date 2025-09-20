import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnMap, TableDataSource } from 'src/app/core/model/table-source';
import { PaginationMetaData } from 'src/app/core/model/pagination';
import { BadgeType } from 'src/app/core/model/core';

@Component({
  selector: 'blogsphere-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input('dataSource') tableDataSource: MatTableDataSource<TableDataSource>;
  @Input() columns: string[];
  @Input() columnMap: TableColumnMap = null;
  @Input() actionEnabled: boolean;
  @Input() paginationMetadata: PaginationMetaData;
  @Input() dataLength: number;
  @Input() allowVisit: boolean = true;
  @Input() allowEdit: boolean = true;

  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() visit: EventEmitter<TableDataSource> = new EventEmitter<TableDataSource>();
  @Output() edit: EventEmitter<TableDataSource> = new EventEmitter<TableDataSource>();
  @Output() delete: EventEmitter<TableDataSource> = new EventEmitter<TableDataSource>();

  BadgeType = BadgeType;

  constructor() {}

  ngOnChanges(): void {
    if(this.actionEnabled && !this.columns.includes('actions')) {
      this.columns.push('actions');
      this.columnMap = this.addActionsColumn(this.columnMap, 'actions');
    }else if(!this.actionEnabled && this.columns.includes('actions')) {
      this.columns = this.columns.filter(c => c !== 'actions');
    }else{
      this.columnMap = this.addActionsColumn(this.columnMap, 'actions');
    }
  }

  ngOnInit(): void {}

  public onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  public onVisit(item: TableDataSource): void {
    this.actionEnabled && this.visit.emit(item);
  }

  public onEdit(item: TableDataSource): void {
    this.actionEnabled && this.edit.emit(item);
  }

  public onDelete(item: TableDataSource): void {
    this.actionEnabled && this.delete.emit(item);
  }

  public getColumnKey(column: string): string {
    return Object.keys(this.columnMap).find(k => k === column);
  }

  public getColumnValue(column: string): string {
    return this.columnMap[Object.keys(this.columnMap).find(k => k === column)].value;
  }

  public isDateField(column: string): boolean {
    return this.columnMap[Object.keys(this.columnMap).find(k => k === column)].isDateField;
  }

  public isStatusField(column: string): boolean {
    return this.columnMap[Object.keys(this.columnMap).find(k => k === column)].isStatusField;
  }

  public slideToggle(event) {
    console.log(event);
  }

  private addActionsColumn(columnMap: TableColumnMap, value: string): TableColumnMap {
    return {
      ...columnMap,
      actions: {
        value: value,
        isDateField: false,
        isStatusField: false
      }
    }
  }
}
