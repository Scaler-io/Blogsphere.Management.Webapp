import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribedApiCreateDialogComponent } from './subscribed-api-create-dialog.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconButtonModule } from 'src/app/shared/components/icon-button/icon-button.module';

@NgModule({
  declarations: [SubscribedApiCreateDialogComponent],
  imports: [CommonModule, AppMaterialModule, ButtonModule, ReactiveFormsModule, IconButtonModule],
  exports: [SubscribedApiCreateDialogComponent],
})
export class SubscribedApiCreateDialogModule {}
