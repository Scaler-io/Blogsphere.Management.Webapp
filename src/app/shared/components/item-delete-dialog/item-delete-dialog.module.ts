import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDeleteDialogComponent } from './item-delete-dialog.component';
import { ButtonModule } from '../button/button.module';
import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  declarations: [ItemDeleteDialogComponent],
  imports: [CommonModule, ButtonModule, AppMaterialModule],
  exports: [ItemDeleteDialogComponent],
})
export class ItemDeleteDialogModule {}
