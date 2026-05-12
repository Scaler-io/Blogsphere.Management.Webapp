import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarNavLinkComponent } from './sidebar-nav-link.component';

@NgModule({
  declarations: [SidebarNavLinkComponent],
  imports: [CommonModule, RouterModule, MatRippleModule, MatTooltipModule],
  exports: [SidebarNavLinkComponent],
})
export class SidebarNavLinkModule {}
