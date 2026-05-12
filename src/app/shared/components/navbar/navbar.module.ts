import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterModule } from '@angular/router';
import { IconButtonModule } from '../icon-button/icon-button.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, AppMaterialModule, RouterModule, IconButtonModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
