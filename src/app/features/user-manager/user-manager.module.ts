import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerRoutingModule } from './user-manager-routing.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterModule } from '@angular/router';
import { UserManagerComponent } from './user-manager.component';
import { SearchLayoutModule } from 'src/app/shared/components/search-layout/search-layout.module';
import { StoreModule } from '@ngrx/store';
import {
  USER_MANAGER_STATE_NAME,
  userManagerReducer,
} from 'src/app/state/user-manager/user-manager.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserManagerEffects } from 'src/app/state/user-manager/user-manager.effect';
import { USER_MANAGER_SERVICE_TOKEN } from 'src/app/core/services/interface/user-manager-service.interface';
import { UserManagerService } from 'src/app/core/services/user-manager.service';
import { UserManagerMockService } from 'src/app/core/services/mock/user-manager-mock.service';
import { environment } from 'src/environments/environment';
import { ManagementUserModule } from './management-user/management-user.module';
import { AppUserModule } from './app-user/app-user.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { ManagementUserDetailsModule } from './management-user/management-user-details/management-user-details.module';

@NgModule({
  declarations: [UserManagerComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule,
    SearchLayoutModule,
    ManagementUserModule,
    ManagementUserDetailsModule,
    AppUserModule,
    TableModule,
    UserManagerRoutingModule,
    StoreModule.forFeature(USER_MANAGER_STATE_NAME, userManagerReducer),
    EffectsModule.forFeature([UserManagerEffects]),
  ],
  providers: [
    {
      provide: USER_MANAGER_SERVICE_TOKEN,
      useClass: environment.useMockService ? UserManagerMockService : UserManagerService,
    },
  ],
  exports: [UserManagerRoutingModule],
})
export class UserManagerModule {}
