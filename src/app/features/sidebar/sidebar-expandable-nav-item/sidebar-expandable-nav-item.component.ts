import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

export interface SidebarSubmenuItem {
  routerLink: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'blogsphere-sidebar-expandable-nav-item',
  templateUrl: './sidebar-expandable-nav-item.component.html',
  styleUrls: ['./sidebar-expandable-nav-item.component.scss'],
  standalone: false,
})
export class SidebarExpandableNavItemComponent {
  @Input() expanded = false;
  @Input() label = '';
  @Input() headerIcon = 'api';
  @Input() submenuItems: SidebarSubmenuItem[] = [];
  @Output() headerClick = new EventEmitter<void>();
  @Output() submenuNavigate = new EventEmitter<void>();

  constructor(private router: Router) {}

  isGroupActive(): boolean {
    return this.submenuItems.some(i => this.router.isActive(i.routerLink, false));
  }
}
