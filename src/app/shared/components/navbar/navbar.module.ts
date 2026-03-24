import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, AppMaterialModule, RouterModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
