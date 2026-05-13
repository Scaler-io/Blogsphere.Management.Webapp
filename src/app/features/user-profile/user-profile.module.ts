import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { PageHeroModule } from 'src/app/shared/components/page-hero/page-hero.module';
import { DetailsCardModule } from 'src/app/shared/components/details-card/details-card.module';
import { StatusPillModule } from 'src/app/shared/components/status-pill/status-pill.module';
import { InfoCardModule } from 'src/app/shared/components/info-card/info-card.module';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileActionRowModule } from './user-profile-action-row/user-profile-action-row.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    LoaderModule,
    PageHeroModule,
    DetailsCardModule,
    StatusPillModule,
    InfoCardModule,
    UserProfileActionRowModule,
    UserProfileRoutingModule,
  ],
})
export class UserProfileModule {}
