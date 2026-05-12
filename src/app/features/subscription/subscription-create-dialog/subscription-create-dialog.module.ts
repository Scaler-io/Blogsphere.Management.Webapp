import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionCreateDialogComponent } from './subscription-create-dialog.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconButtonModule } from 'src/app/shared/components/icon-button/icon-button.module';

@NgModule({
  declarations: [SubscriptionCreateDialogComponent],
  imports: [CommonModule, AppMaterialModule, ButtonModule, ReactiveFormsModule, IconButtonModule],
  exports: [SubscriptionCreateDialogComponent],
})
export class SubscriptionCreateDialogModule {}
