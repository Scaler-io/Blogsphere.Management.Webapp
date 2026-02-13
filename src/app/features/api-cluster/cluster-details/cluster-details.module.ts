import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterDetailsComponent } from './cluster-details.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { BadgeModule } from 'src/app/shared/components/badge/badge.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TooltipModule } from 'src/app/shared/components/tooltip/tooltip.module';
import { HeroHeaderModule } from 'src/app/shared/components/hero-header/hero-header.module';
import { DetailsCardModule } from 'src/app/shared/components/details-card/details-card.module';

@NgModule({
  declarations: [ClusterDetailsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    ButtonModule,
    LoaderModule,
    BadgeModule,
    PipesModule,
    TooltipModule,
    HeroHeaderModule,
    DetailsCardModule
  ],
  exports: [ClusterDetailsComponent],
})
export class ClusterDetailsModule {}
