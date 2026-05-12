import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { SidebarSubmenuLinkComponent } from './sidebar-submenu-link.component';

@NgModule({
  declarations: [SidebarSubmenuLinkComponent],
  imports: [CommonModule, RouterModule, MatRippleModule],
  exports: [SidebarSubmenuLinkComponent],
})
export class SidebarSubmenuLinkModule {}
