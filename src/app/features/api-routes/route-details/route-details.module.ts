import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteDetailsComponent } from './route-details.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { InfoCardModule } from 'src/app/shared/components/info-card';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DetailsCardModule } from 'src/app/shared/components/details-card/details-card.module';
import { ApiClusterModule } from '../../api-cluster/api-cluster.module';
import { TooltipModule } from 'src/app/shared/components/tooltip/tooltip.module';
import { PageHeroModule } from 'src/app/shared/components/page-hero/page-hero.module';
import { StatTileModule } from 'src/app/shared/components/stat-tile/stat-tile.module';
import { SectionPanelModule } from 'src/app/shared/components/section-panel/section-panel.module';
import { StatusPillModule } from 'src/app/shared/components/status-pill/status-pill.module';
import { EmptyStateModule } from 'src/app/shared/components/empty-state/empty-state.module';

@NgModule({
  declarations: [RouteDetailsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    ButtonModule,
    LoaderModule,
    InfoCardModule,
    PipesModule,
    DetailsCardModule,
    ApiClusterModule,
    TooltipModule,
    PageHeroModule,
    StatTileModule,
    SectionPanelModule,
    StatusPillModule,
    EmptyStateModule,
  ],
  exports: [RouteDetailsComponent],
})
export class RouteDetailsModule {}
