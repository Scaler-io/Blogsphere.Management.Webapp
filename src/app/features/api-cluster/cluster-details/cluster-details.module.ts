import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClusterDetailsComponent } from './cluster-details.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TooltipModule } from 'src/app/shared/components/tooltip/tooltip.module';
import { DetailsCardModule } from 'src/app/shared/components/details-card/details-card.module';
import { PageHeroModule } from 'src/app/shared/components/page-hero/page-hero.module';
import { StatTileModule } from 'src/app/shared/components/stat-tile/stat-tile.module';

@NgModule({
  declarations: [ClusterDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    ButtonModule,
    LoaderModule,
    PipesModule,
    TooltipModule,
    DetailsCardModule,
    PageHeroModule,
    StatTileModule,
  ],
  exports: [ClusterDetailsComponent],
})
export class ClusterDetailsModule {}
