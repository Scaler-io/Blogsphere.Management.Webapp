import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterDetailsComponent } from './cluster-details.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { InfoCardModule } from 'src/app/shared/components/info-card';
import { BadgeModule } from 'src/app/shared/components/badge/badge.module';

@NgModule({
  declarations: [ClusterDetailsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    ButtonModule,
    LoaderModule,
    InfoCardModule,
    BadgeModule,
  ],
  exports: [ClusterDetailsComponent],
})
export class ClusterDetailsModule {}
