import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ButtonSize, ButtonType, ItemDeleteDialogData } from 'src/app/core/model/core';

@Component({
  selector: 'blogsphere-item-delete-dialog',
  templateUrl: './item-delete-dialog.component.html',
  styleUrls: ['./item-delete-dialog.component.scss'],
})
export class ItemDeleteDialogComponent implements OnInit {
  public dialogData: ItemDeleteDialogData;
  
  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  constructor(private dialogRef: MatDialogRef<ItemDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogData = this.data.dialogData;
  }

  public cancelDelete(): void {
    this.dialogRef.close(false);
  }

  public deleteItem(): void {
    this.dialogRef.close(true);
  }
}
