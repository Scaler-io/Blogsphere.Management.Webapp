import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteDetailsComponent } from './route-details.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { InfoCardModule } from 'src/app/shared/components/info-card';
import { BadgeModule } from 'src/app/shared/components/badge/badge.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { HeroHeaderModule } from 'src/app/shared/components/hero-header/hero-header.module';
import { DetailsCardModule } from 'src/app/shared/components/details-card/details-card.module';
import { ApiClusterModule } from "../../api-cluster/api-cluster.module";

@NgModule({
  declarations: [RouteDetailsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    ButtonModule,
    LoaderModule,
    InfoCardModule,
    BadgeModule,
    PipesModule,
    HeroHeaderModule,
    DetailsCardModule,
    ApiClusterModule
],
  exports: [RouteDetailsComponent],
})
export class RouteDetailsModule {}
