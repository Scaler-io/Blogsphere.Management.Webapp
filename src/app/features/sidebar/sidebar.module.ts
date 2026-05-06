import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { SidebarComponent } from './sidebar.component';
import { SidebarNavLinkModule } from './sidebar-nav-link/sidebar-nav-link.module';
import { SidebarExpandableNavItemModule } from './sidebar-expandable-nav-item/sidebar-expandable-nav-item.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatRippleModule,
    SidebarNavLinkModule,
    SidebarExpandableNavItemModule,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
