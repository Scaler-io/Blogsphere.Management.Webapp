import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { SidebarExpandableNavItemComponent } from './sidebar-expandable-nav-item.component';
import { SidebarSubmenuLinkModule } from '../sidebar-submenu-link/sidebar-submenu-link.module';

@NgModule({
  declarations: [SidebarExpandableNavItemComponent],
  imports: [CommonModule, RouterModule, MatRippleModule, SidebarSubmenuLinkModule],
  exports: [SidebarExpandableNavItemComponent],
})
export class SidebarExpandableNavItemModule {}
