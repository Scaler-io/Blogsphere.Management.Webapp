import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceModeComponent } from './maintenance-mode.component';
import { InfoCardModule } from 'src/app/shared/components/info-card/info-card.module';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceModeComponent,
  },
];

@NgModule({
  declarations: [MaintenanceModeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InfoCardModule,
  ],
  exports: [MaintenanceModeComponent],
})
export class MaintenanceModeModule {}
