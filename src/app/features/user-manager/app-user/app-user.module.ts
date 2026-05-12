import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUserComponent } from './app-user.component';
import { EmptyStateModule } from 'src/app/shared/components/empty-state/empty-state.module';

@NgModule({
  declarations: [AppUserComponent],
  imports: [CommonModule, EmptyStateModule],
  exports: [AppUserComponent],
})
export class AppUserModule {}
