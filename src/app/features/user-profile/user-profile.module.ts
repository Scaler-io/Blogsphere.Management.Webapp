import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    LoaderModule,
    UserProfileRoutingModule,
  ],
})
export class UserProfileModule {}
