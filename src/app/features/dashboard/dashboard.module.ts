import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {
  DASHBOARD_STATE_NAME,
  dashboardReducer,
} from 'src/app/state/dashboard/dashboard.reducer';
import { DashboardEffects } from 'src/app/state/dashboard/dashboard.effect';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { InfoCardModule } from 'src/app/shared/components/info-card';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { DASHBOARD_SERVICE_TOKEN } from 'src/app/core/services/interface/dashboard-service.interface';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    StoreModule.forFeature(DASHBOARD_STATE_NAME, dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
    AppMaterialModule,
    ButtonModule,
    InfoCardModule,
    LoaderModule,
    BaseChartDirective,
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
    {
      provide: DASHBOARD_SERVICE_TOKEN,
      useClass: DashboardService,
    },
  ],
})
export class DashboardModule {}
