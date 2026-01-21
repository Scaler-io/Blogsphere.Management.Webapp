import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClusterComponent } from './api-cluster.component';
import { ApiClusterRoutingModule } from './api-cluster-routing.module';
import { StoreModule } from '@ngrx/store';
import {
  API_CLUSTER_STATE_NAME,
  apiClusterReducers,
} from 'src/app/state/api-cluster/api-cluster.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ApiClusterEffects } from 'src/app/state/api-cluster/api-cluster.effect';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { SearchLayoutModule } from 'src/app/shared/components/search-layout/search-layout.module';
import { NoContentLayoutModule } from 'src/app/shared/components/no-content-layout/no-content-layout.module';
import { ClusterSetupModule } from './cluster-setup/cluster-setup.module';
import { API_CLUSTER_SERVICE_TOKEN } from 'src/app/core/services/interface/api-custer-service.interface';
import { ApiClusterService } from 'src/app/core/services/api-cluster.service';
import { ApiClusterMockService } from 'src/app/core/services/mock/api-cluster-mock.service';
import { environment } from 'src/environments/environment';
import { ClusterFilterFormModule } from './cluster-filter-form/cluster-filter-form.module';
import { ClusterDetailsModule } from './cluster-details/cluster-details.module';

@NgModule({
  declarations: [ApiClusterComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    StoreModule.forFeature(API_CLUSTER_STATE_NAME, apiClusterReducers),
    EffectsModule.forFeature([ApiClusterEffects]),
    AppMaterialModule,
    LoaderModule,
    SearchLayoutModule,
    NoContentLayoutModule,
    ClusterSetupModule,
    ClusterFilterFormModule,
    ClusterDetailsModule,
  ],
  providers: [
    {
      provide: API_CLUSTER_SERVICE_TOKEN,
      useClass: environment.useMockService ? ApiClusterMockService : ApiClusterService,
    },
  ],
  exports: [ApiClusterRoutingModule],
})
export class ApiClusterModule {}
