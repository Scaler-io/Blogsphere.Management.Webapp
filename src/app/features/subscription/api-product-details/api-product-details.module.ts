import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiProductDetailsComponent } from './api-product-details.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { InfoCardModule } from 'src/app/shared/components/info-card';
import { BadgeModule } from 'src/app/shared/components/badge/badge.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ItemDeleteDialogModule } from 'src/app/shared/components/item-delete-dialog/item-delete-dialog.module';

@NgModule({
  declarations: [ApiProductDetailsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    LoaderModule,
    InfoCardModule,
    BadgeModule,
    PipesModule,
    ButtonModule,
    CdkAccordionModule,
    ItemDeleteDialogModule,
  ],
  exports: [ApiProductDetailsComponent],
})
export class ApiProductDetailsModule {}
