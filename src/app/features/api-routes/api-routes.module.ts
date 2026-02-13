import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRoutesComponent } from './api-routes.component';
import { ApiRoutesRoutingModule } from './api-routes-routing.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { API_ROUTE_STATE_NAME, apiRouteReducers } from 'src/app/state/api-route/api-route.reducer';
import { ApiRouteEffects } from 'src/app/state/api-route/api-route.effect';
import { AppMaterialModule } from 'src/app/app-material.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { SearchLayoutModule } from 'src/app/shared/components/search-layout/search-layout.module';
import { NoContentLayoutModule } from 'src/app/shared/components/no-content-layout/no-content-layout.module';
import { API_ROUTE_SERVICE_TOKEN } from 'src/app/core/services/interface/api-route-service.interface';
import { ApiRouteService } from 'src/app/core/services/api-route.service';
import { RouteSetupModule } from './route-setup/route-setup.module';
import { API_CLUSTER_STATE_NAME, apiClusterReducers } from 'src/app/state/api-cluster/api-cluster.reducer';
import { ApiClusterEffects } from 'src/app/state/api-cluster/api-cluster.effect';
import { API_CLUSTER_SERVICE_TOKEN } from 'src/app/core/services/interface/api-custer-service.interface';
import { ApiClusterService } from 'src/app/core/services/api-cluster.service';
import { RouteDetailsModule } from './route-details/route-details.module';

@NgModule({
  declarations: [ApiRoutesComponent],
  imports: [
    CommonModule,
    ApiRoutesRoutingModule,
    TableModule,
    ButtonModule,
    StoreModule.forFeature(API_ROUTE_STATE_NAME, apiRouteReducers),
    StoreModule.forFeature(API_CLUSTER_STATE_NAME, apiClusterReducers),
    EffectsModule.forFeature([ApiRouteEffects, ApiClusterEffects]),
    AppMaterialModule,
    LoaderModule,
    SearchLayoutModule,
    NoContentLayoutModule,
    RouteSetupModule,
    RouteDetailsModule,
  ],
  providers: [
    {
      provide: API_ROUTE_SERVICE_TOKEN,
      useClass: ApiRouteService,
    },
    {
      provide: API_CLUSTER_SERVICE_TOKEN,
      useClass: ApiClusterService,
    },
  ],
  exports: [ApiRoutesRoutingModule],
})
export class ApiRoutesModule {}
