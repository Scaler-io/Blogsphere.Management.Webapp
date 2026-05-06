import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementUserDetailsComponent } from './management-user-details.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { DetailsCardModule } from 'src/app/shared/components/details-card/details-card.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BadgeModule } from 'src/app/shared/components/badge/badge.module';
import { TooltipModule } from 'src/app/shared/components/tooltip/tooltip.module';
import { PageHeroModule } from 'src/app/shared/components/page-hero/page-hero.module';
import { StatTileModule } from 'src/app/shared/components/stat-tile/stat-tile.module';
import { SectionPanelModule } from 'src/app/shared/components/section-panel/section-panel.module';
import { StatusPillModule } from 'src/app/shared/components/status-pill/status-pill.module';
import { EmptyStateModule } from 'src/app/shared/components/empty-state/empty-state.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [ManagementUserDetailsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    LoaderModule,
    DetailsCardModule,
    ButtonModule,
    BadgeModule,
    TooltipModule,
    PageHeroModule,
    StatTileModule,
    SectionPanelModule,
    StatusPillModule,
    EmptyStateModule,
    PipesModule,
  ],
  exports: [ManagementUserDetailsComponent],
})
export class ManagementUserDetailsModule {}
